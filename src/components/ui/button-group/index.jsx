import classes from "./button-group.module.css";

export default function Buttons({ children }) {
  return <div className={classes.buttons}>{children}</div>;
}
