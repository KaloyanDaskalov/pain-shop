import { useState } from "react";
import { deleteDoc } from "@firebase/firestore";
import { gallery } from "../../firebase";
import useHead from "../../hooks/useHead";
import { useAuth } from "../../state/user";
import { useNotification } from "../../state/notifications";
import classes from "./image-slider.module.css";

import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import Buttons from "../ui/button-group";

export default function ImageSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const { user, cart, setCart } = useAuth();
  const { setMessage, setStatus } = useNotification();

  useHead(slides[index].name);

  const nextHandler = () => {
    const newIndex = index + 1;
    setIndex(newIndex > slides.length - 1 ? 0 : newIndex);
  };

  const previousHandler = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? slides.length - 1 : newIndex);
  };

  const addToCartHandler = () => {
    const newItem = slides[index];
    if (!cart.some((i) => i.id === newItem.id)) {
      setCart([...cart, newItem]);
      setMessage("Added to cart " + newItem.name);
      setStatus("success");
    } else {
      setMessage(newItem.name + " already exist in your cart");
      setStatus("error");
    }
  };

  // const deleteItemHandler = () => {
  //   if (!cart.some((i) => i.id === newItem.id)) {
  //     setCart([...cart, newItem]);
  //     setMessage("Added to cart " + newItem.name);
  //     setStatus("success");
  //   } else {
  //     setMessage(newItem.name + " already exist in your cart");
  //     setStatus("error");
  //   }
  // };

  return (
    <article>
      <figure className={classes.figure}>
        <section className={classes.navigation}>
          <BiCaretLeft
            className={classes.arrow}
            style={{ left: "-2.5rem" }}
            onClick={nextHandler}
          />
          <div className={classes.container}>
            <img className={classes.image} src={slides[index].imageURL} alt="Trulli" />
          </div>
          <BiCaretRight
            className={classes.arrow}
            style={{ right: "-2.5rem" }}
            onClick={previousHandler}
          />
        </section>
        <h3 className={classes.name}>{slides[index].name}</h3>
        <figcaption>{slides[index].description}</figcaption>
      </figure>
      <Buttons>
        {user?.email === "kala_ds@yahoo.com" ? (
          <>
            <button className="btn border">Edit</button>
            <button className="btn border">Delete</button>
          </>
        ) : (
          <>
            <button className="btn border">Buy</button>
            <button className="btn border" onClick={addToCartHandler}>
              Add to cart
            </button>
          </>
        )}
      </Buttons>
    </article>
  );
}
