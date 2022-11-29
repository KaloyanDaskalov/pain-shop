import ReactDom from "react-dom";
import classes from "./modal.module.css";

export default function Modal({ open, close, children }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className={classes.overlay} onClick={close}>
      <div className={classes.modal}>{children}</div>
    </div>,
    document.getElementById("portal")
  );
}
