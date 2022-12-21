import classes from "./title.module.css";

export default function Title({ children, addClass }) {
  const classList = [classes.title];

  if (addClass) {
    addClass.split(" ").forEach((c) => classList.push(classes[c]));
  }

  return <h1 className={classList.join(" ")}>{children}</h1>;
}
