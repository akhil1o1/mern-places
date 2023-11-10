import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import Navlinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
   const [drawerIsOpen, setDrawerIsOpen] = useState(false);

   function openDrawerHandler() {
      setDrawerIsOpen(true);
   }

   function closeDrawerHandler() {
      setDrawerIsOpen(false);
   }

   return (
      <>
         {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
         <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <nav className={classes["main-navigation__drawer-nav"]}>
               <Navlinks />
            </nav>
         </SideDrawer>
         <MainHeader>
            <button
               className={classes["main-navigation__menu-btn"]}
               onClick={openDrawerHandler}
            >
               <span />
               <span />
               <span />
            </button>
            <h1 className={classes["main-navigation__title"]}>
               <Link to="/">Places</Link>
            </h1>
            <nav className={classes["main-navigation__header-nav"]}>
               <Navlinks />
            </nav>
         </MainHeader>
      </>
   );
}

export default MainNavigation;
