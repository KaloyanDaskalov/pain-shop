import { useState } from "react";
import useHead from "../../hooks/useHead";
import classes from "./image-slider.module.css";

import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import Buttons from "../ui/button-group";

export default function ImageSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);

  useHead(slides[index].name);

  const nextHandler = () => {
    const newIndex = index + 1;
    setIndex(newIndex > slides.length - 1 ? 0 : newIndex);
  };

  const previousHandler = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? slides.length - 1 : newIndex);
  };

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
            <img
              className={classes.image}
              src={slides[index].imageURL}
              alt="Trulli"
            />
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
        <button className="btn border">Buy</button>
        <button className="btn border">Add to cart</button>
      </Buttons>
    </article>
  );
}
