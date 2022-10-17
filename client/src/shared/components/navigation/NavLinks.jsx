import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navlinks.module.css";

function Navlinks(props) {
    return <ul className={classes["nav-links"]}>
        <li>
            <NavLink to="/">ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to="/u1/places">MY PLACES</NavLink>
        </li><li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
        </li><li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
        
    </ul>
}

export default Navlinks;