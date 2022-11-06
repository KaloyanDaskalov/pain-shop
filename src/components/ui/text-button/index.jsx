import classes from "./text-button.module.css";

export default function TextButton({ children, click }) {
  return (
    <span type="button" className={classes.button} onClick={click}>
      {children}
    </span>
  );
}
