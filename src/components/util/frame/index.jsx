import Background from "../background";

import classes from "./frame.module.css";

export default function Frame({ children, addClass }) {
  const classList = [classes.frame];

  if (addClass) {
    addClass.split(" ").forEach((c) => classList.push(classes[c]));
  }

  return (
    <Background>
      <div className={classList.join(" ")}>{children}</div>
    </Background>
  );
}
