import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

import classes from "./footer.module.css";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noreferrer"
        className={classes.icon}
      >
        <FaFacebook />
      </a>
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noreferrer"
        className={classes.icon}
      >
        <FaInstagram className={classes.icon} />
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noreferrer"
        className={classes.icon}
      >
        <FaLinkedinIn className={classes.icon} />
      </a>
      <Link to="/contact">
        <FaEnvelope className={classes.icon} />
      </Link>
      <p className={classes.footerText}>
        Copyright &copy; {date} Paint shop. All rights reserved
      </p>
    </footer>
  );
}
