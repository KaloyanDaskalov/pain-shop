import { useState } from "react";
import classes from "./image-slider.module.css";

import { BiCaretLeft, BiCaretRight } from "react-icons/bi";

export default function ImageSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);

  const nextHandler = () => {
    const newIndex = index + 1;
    return newIndex > slides.length - 1 ? 0 : newIndex;
  };

  const previousHandler = () => {
    const newIndex = index - 1;
    return newIndex < 0 ? slides.length - 1 : newIndex;
  };

  return (
    <article>
      <figure className={classes.figure}>
        <div style={{ position: "relative" }}>
          <BiCaretLeft
            className={classes.arrow}
            style={{ left: "-2.5rem" }}
            onClick={nextHandler}
          />
          <img
            className={classes.image}
            src={slides[index].imageURL}
            alt="Trulli"
          />
          <BiCaretRight
            className={classes.arrow}
            style={{ right: "-2.5rem" }}
            onClick={previousHandler}
          />
        </div>
        <figcaption>{slides[index].name}</figcaption>
      </figure>
    </article>
  );
}
