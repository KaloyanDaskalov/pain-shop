import { Link } from "react-router-dom";
import { useAuth } from "../../state/user";

import { BiUser, BiUserCheck, BiCart, BiAddToQueue, BiLogOut } from "react-icons/bi";
import Logo from "../../assets/logos/paint-shop-logo.svg";
import Wrapper from "../util/wrapper";
import Separator from "../ui/separator";
import Badge from "../ui/badge";

import classes from "./navigation.module.css";

export default function Navigation() {
  const { user, logout, cart } = useAuth();

  return (
    <header className={classes.header}>
      <Wrapper addClass="flex">
        <Link to="/" aria-label="Home">
          <img src={Logo} alt="logo" className={classes.logo} />
        </Link>
        <nav className={classes.nav}>
          <ul className={classes.navbar}>
            {user?.email === "kala_ds@yahoo.com" && (
              <li>
                <Link to="/create" aria-label="Create item" className={classes.link}>
                  <BiAddToQueue />
                </Link>
              </li>
            )}
            <li>
              <Link
                to={user ? "/profile" : "/auth"}
                aria-label="User authentication or profile"
                className={classes.link}>
                {user ? <BiUserCheck /> : <BiUser />}
              </Link>
            </li>
            {user?.email !== "kala_ds@yahoo.com" && (
              <li style={{ position: "relative" }}>
                <Link to="/cart" aria-label="Cart" className={classes.link}>
                  <BiCart />
                  {!!cart.length && <Badge value={cart.length} top={7} right={-3} />}
                </Link>
              </li>
            )}
            {user && (
              <li>
                <BiLogOut aria-label="Logout" className={classes.link} onClick={logout} />
              </li>
            )}
          </ul>
        </nav>
      </Wrapper>
      <Separator />
    </header>
  );
}
