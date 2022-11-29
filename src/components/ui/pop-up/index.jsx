import classes from "./pop-up.module.css";
import Message from "../message";

export default function PopUp({ children, message }) {
  return (
    <section className={classes.pop}>
      <Message>{message}</Message>
      <div className={classes.buttons}>{children}</div>
    </section>
  );
}
