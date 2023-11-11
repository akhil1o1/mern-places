import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { authActions } from "../../../store/authSlice";
import Button from "../FormElements/Button";
import classes from "./Navlinks.module.css";

function Navlinks() {
   const isLoggedIn = useSelector(state => state.isLoggedIn);
   const userId = useSelector(state => state.userId);

   const {logOut} = authActions;

   const dispatch = useDispatch();

   function logOutHandler() {
      dispatch(logOut());
   }

   return (
      <ul className={classes["nav-links"]}>
         <li>
            <NavLink to="/">ALL USERS</NavLink>
         </li>
         {isLoggedIn && (
            <li>
               <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
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
