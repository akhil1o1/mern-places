import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";
import classes from "./Navlinks.module.css";

function Navlinks(props) {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, logOut } = authCtx;

  const navigate = useNavigate();


  function logOutHandler() {
    logOut();
    navigate("/");
  }

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Button inverse onClick={logOutHandler}>
            LOGOUT
          </Button>
        </li>
      )}
    </ul>
  );
}

export default Navlinks;
