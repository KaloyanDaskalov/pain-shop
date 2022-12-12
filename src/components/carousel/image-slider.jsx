import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "@firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { gallery, bucketUrl } from "../../firebase";
import useHead from "../../hooks/useHead";
import { useAuth } from "../../state/user";
import { useNotification } from "../../state/notifications";
import classes from "./image-slider.module.css";
import { firebaseError } from "../../utils/firebase-error";
import { Link } from "react-router-dom";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import Buttons from "../ui/button-group";
import PopUp from "../ui/pop-up";
import Message from "../ui/message";

export default function ImageSlider({ slides = [], forceUpdate }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { user, cart, setCart } = useAuth();
  const { setMessage, setStatus, loading, setLoading, setModal } = useNotification();

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
    setLoading(true);
    const newItem = slides[index];
    if (!cart.some((i) => i.id === newItem.id)) {
      setCart([...cart, newItem]);
      setMessage("Added to cart " + newItem.name);
      setStatus("success");
    } else {
      setMessage(newItem.name + " already exist in your cart");
      setStatus("error");
    }
    setLoading(false);
  };

  const buyHandler = () => {
    setCart([slides[index]]);
    navigate("/cart");
  };

  const deleteItemHandler = async () => {
    setModal(
      <PopUp message={"Do you wanna to delete " + slides[index].name}>
        <button className="btn border btn-small" onClick={() => deleteItem()}>
          Confirm
        </button>
        <button className="btn border btn-small" onClick={() => setModal(null)}>
          Cancel
        </button>
      </PopUp>
    );
    async function deleteItem() {
      setLoading(true);
      const deletedItem = slides[index];
      try {
        const storageRef = ref(bucketUrl, deletedItem.imageLoc);
        await deleteObject(storageRef);
        await deleteDoc(doc(gallery, deletedItem.id));
        setMessage(`Item "${deletedItem.name}" was deleted`);
        setStatus("success");
        forceUpdate();
      } catch (error) {
        setMessage(firebaseError(error.message));
        setStatus("error");
      }
      setLoading(false);
    }
  };

  const showPictureHandler = () => {
    setModal(<img className="img" src={slides[index].imageURL} alt="Painting" />);
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
              alt="Painting"
              onClick={showPictureHandler}
            />
          </div>
          <BiCaretRight
            className={classes.arrow}
            style={{ right: "-2.5rem" }}
            onClick={previousHandler}
          />
        </section>
        <h3 className={classes.name}>{slides[index].name}</h3>
        <Message>Price: ${slides[index].price} </Message>
        <figcaption>{slides[index].description}</figcaption>
      </figure>
      <Buttons>
        {user?.email === "kala_ds@yahoo.com" ? (
          <>
            <Link to={`/edit/${slides[index].id}`} className="btn border" disabled={loading}>
              Edit
            </Link>
            <button className="btn border" disabled={loading} onClick={deleteItemHandler}>
              Delete
            </button>
          </>
        ) : (
          <>
            <button className="btn border" disabled={loading} onClick={buyHandler}>
              Buy
            </button>
            <button className="btn border" disabled={loading} onClick={addToCartHandler}>
              Add to cart
            </button>
          </>
        )}
      </Buttons>
    </article>
  );
}
