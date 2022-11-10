import { Link } from "react-router-dom";
import { useAuth } from "../../state/user";

import {
  BiUser,
  BiUserCheck,
  BiCart,
  BiListUl,
  BiAddToQueue,
} from "react-icons/bi";
import Logo from "../../assets/logos/paint-shop-logo.svg";
import Wrapper from "../util/wrapper";
import Separator from "../ui/separator";

import classes from "./navigation.module.css";

export default function Navigation() {
  const { user } = useAuth();

  return (
    <header className={classes.header}>
      <Wrapper addClass="flex">
        <Link to="/">
          <img src={Logo} alt="logo" className={classes.logo} />
        </Link>
        <nav className={classes.nav}>
          <ul className={classes.navbar}>
            <li>
              <Link to="/auth" className={classes.link}>
                {user ? <BiUserCheck /> : <BiUser />}
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.link}>
                <BiCart />
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.link}>
                <BiListUl />
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.link}>
                <BiAddToQueue />
              </Link>
            </li>
          </ul>
        </nav>
      </Wrapper>
      <Separator />
    </header>
  );
}
