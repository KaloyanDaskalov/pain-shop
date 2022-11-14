import classes from "./background.module.css";

export default function Background({ children }) {
  return <section className={classes.content}>{children}</section>;
}
