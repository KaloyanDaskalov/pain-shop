import classes from "./background.module.css";
import backgroundJPG from "../../../assets/images/background.jpg";
import backgroundWebp from "../../../assets/images/background.webp";
import { webpSupport } from "../../../utils/webp-support";

export default function Background({ children }) {
  var elem = document.createElement("canvas");

  return (
    <section
      className={classes.content}
      style={{
        background: `url(${
          webpSupport(elem) ? backgroundWebp : backgroundJPG
        }) center/cover no-repeat`
      }}>
      {children}
    </section>
  );
}
