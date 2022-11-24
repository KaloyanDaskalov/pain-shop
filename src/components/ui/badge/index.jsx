import classes from "./badge.module.css";

export default function Badge({ value = 0, top = 0, right = 0 }) {
  return (
    <span className={classes.badge} style={{ top, right }}>
      {value}
    </span>
  );
}
