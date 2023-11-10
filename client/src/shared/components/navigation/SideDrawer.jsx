import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./SideDrawer.module.css";

function SideDrawer(props) {
   const content = (
      <CSSTransition
         in={props.show} // when is component redered
         timeout={200}
         classNames="slide-in-left"
         mountOnEnter // add to dom
         unmountOnExit //remove from dom
      >
         <aside className={classes["side-drawer"]} onClick={props.onClick}>
            {props.children}
         </aside>
      </CSSTransition>
   );

   return createPortal(content, document.getElementById("drawer-root"));
}

export default SideDrawer;
