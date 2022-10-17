import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import Navlinks from "./NavLinks";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
    return <MainHeader>
        <button className={classes["main-navigation__menu-btn"]}>
        <span></span>
        <span></span>
        <span></span>
        </button>
        <h1 className={classes["main-navigation__title"]}> 
        <Link to="/"> Your places </Link>
        </h1>
        <nav>
            <Navlinks/>
        </nav>
    </MainHeader> 
}

export default MainNavigation;