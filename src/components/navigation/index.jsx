import { Link } from "react-router-dom";
import { useAuth } from "../../state/user";

import {
  BiUser,
  BiUserCheck,
  BiCart,
  BiListUl,
  BiAddToQueue,
  BiLogOut,
} from "react-icons/bi";
import Logo from "../../assets/logos/paint-shop-logo.svg";
import Wrapper from "../util/wrapper";
import Separator from "../ui/separator";

import classes from "./navigation.module.css";

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <header className={classes.header}>
      <Wrapper addClass="flex">
        <Link to="/">
          <img src={Logo} alt="logo" className={classes.logo} />
        </Link>
        <nav className={classes.nav}>
          <ul className={classes.navbar}>
            {user?.email === "kala_ds@yahoo.com" && (
              <>
                <li>
                  <Link to="/create" className={classes.link}>
                    <BiAddToQueue />
                  </Link>
                </li>
                <li>
                  <Link to="/" className={classes.link}>
                    <BiListUl />
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to={user ? "/profile" : "/auth"} className={classes.link}>
                {user ? <BiUserCheck /> : <BiUser />}
              </Link>
            </li>
            {user?.email !== "kala_ds@yahoo.com" && (
              <li>
                <Link to="/cart" className={classes.link}>
                  <BiCart />
                </Link>
              </li>
            )}
            {user && (
              <li>
                <BiLogOut className={classes.link} onClick={logout} />
              </li>
            )}
          </ul>
        </nav>
      </Wrapper>
      <Separator />
    </header>
  );
}
