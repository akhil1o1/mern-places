import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

function ModalOverlay(props) {
  const content = (
    <div className={`${classes.modal} ${props.className}`} style={props.style}>
      <header className={`${classes["modal__header"]} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`${classes["modal__content"]} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${classes["modal__footer"]} ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return createPortal(content, document.getElementById("modal-root"));
}

function Modal(props) {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={classes.modal}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
}

export default Modal;
