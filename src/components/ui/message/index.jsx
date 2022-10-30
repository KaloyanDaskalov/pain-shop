import classes from "./message.module.css";

export default function Message({ children, addClass }) {
  const classList = [classes.message];

  if (addClass) {
    addClass.split(" ").forEach((c) => classList.push(classes[c]));
  }

  return <p className={classList.join(" ")}>{children}</p>;
}
