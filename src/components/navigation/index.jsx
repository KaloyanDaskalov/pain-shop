import { useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../state/Auth"

import { FaPaintBrush } from "react-icons/fa";
import Wrapper from "../util/wrapper";
import NavLink from "../ui/nav-link";
import Separator from "../ui/separator";

import classes from "./navigation.module.css";

export default function Navigation() {
  const [toggle, setToggle] = useState(false);
  //   const { user } = useAuth()

  const hamburgerClasses = [classes.hamburger];
  const sidebarClasses = [classes.sidebar];

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const closeHandler = () => {
    setToggle(false);
  };

  if (toggle) {
    hamburgerClasses.push(classes.open);
    sidebarClasses.push(classes.show);
  }
  return (
    <>
      <nav className={sidebarClasses.join(" ")} onClick={closeHandler}>
        <ul>
          <li>
            <NavLink href="/" addClass="side">
              Auth
            </NavLink>
          </li>
          <li>
            <NavLink href="/" addClass="side">
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
      <header className={classes.header}>
        <Wrapper addClass="flex">
          <div className={classes.menu} onClick={toggleHandler}>
            <div className={hamburgerClasses.join(" ")}></div>
          </div>
          <Link to="/" onClick={closeHandler}>
            <FaPaintBrush className={classes.logo} />
          </Link>
          <nav className={classes.nav}>
            <ul className={classes.navbar}>
              <li>
                <NavLink href="/" addClass="link">
                  Auth
                </NavLink>
              </li>
              <li>
                <NavLink href="/" addClass="link">
                  Cart
                </NavLink>
              </li>
            </ul>
          </nav>
        </Wrapper>
        <Separator />
      </header>
    </>
  );
}
