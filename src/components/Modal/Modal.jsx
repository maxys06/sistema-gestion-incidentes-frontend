import { useEffect, useRef, useState } from "react";
import modalService from "../../services/modalService";
import styles from "./Modal.module.css";

import {Button} from "../generic-components/Button/Button"

export function Modal() {

  let modalDialog = useRef(null); 

  let [isShowing, setIsShowing] = useState(false);
  let [header, setHeader] = useState(false);
  let [message, setMessage] = useState(false);
  
  let [type, setType] = useState(); // "block, info, warning, error, question"

  let [actionButton, setActionButton] = useState({});

  let [cancelText, setCancelText] = useState("Cancelar")

  useEffect(()=> {

    //Subscribing the SHOW FUNCTION to the modalService. This allows the showFunction to be used outside of this component. By doing so, we can have a pure javascript service to control
    //the modal from the outside, in a non react environment.

    modalService.subscribeShow(Show);
    return () => modalService.subscribeShow(null);
  },[])


  useEffect(()=> {

    //This is used to syncronize the state of the HTML dialog, with the react state.

    if (isShowing) {
      modalDialog.current.showModal()}
    else {modalDialog.current.close()};

  }, [isShowing])


  //We show a modal, with these attributes.

  function Show(show, {title, body, type, action, cancelText} = {}) {

    /*action: 
        text: string,
        handler: function
    */

    setIsShowing(x => x = show);
    setHeader(x => x = title);
    setMessage(x=> x = body);
    setType(x => x = type);
    setActionButton(x => x = action);
    setCancelText(x => x=cancelText)
  }


  // We have a function to handle the canceling if the type is "block"

  function handleCancel(e) {
    if (type == 'block') {
      e.preventDefault();
    }
  }

  function handleClose() {
    Show(false);
  }

  async function handleActionButton() {
    handleClose();
    await actionButton.handler()
  }

  let modalFooterContent, modalClass;

  switch(type) {
    case('block'): {
      modalClass = 'block'
      modalFooterContent = <></>
      break
    }
    case('info'): {
      modalClass = 'info'
      modalFooterContent = <Button buttonClass={'accept'} onClick={handleClose} autoFocus={true}>Aceptar</Button>
      break
    }

    case('warning'): {
      modalClass = 'warning'
      modalFooterContent= <Button buttonClass={'accept'} onClick={handleClose} autoFocus={true}>Aceptar</Button>
      break}

    case('question'): {
      modalClass = 'question'
      modalFooterContent = 
          <>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button buttonClass={"accept"}onClick={handleActionButton}>{actionButton.text}</Button>
          </>
      break
    }

    case(undefined): {
      break
    }

    default: {
      throw new Error("Modal type is invalid. \n" + `Type: ${type}`)
    }

  }


  return (
      <dialog
        onCancel={handleCancel} ref={modalDialog}
        className={styles.dialog}>
          <header className={`${styles.header}  ${styles[modalClass]}`}>
            {header}
            {type !== 'block' && <button className={`${styles.closeButton}`} onClick={handleClose}><span className="material-symbols-out">close</span></button>}
          </header>
          <section className={`${styles.section} ${styles[modalClass]}`}>
            {message}
            {type == 'block' && <div className={styles.loader}></div>}
          </section>
          <footer className={styles.footer}>
            {modalFooterContent}
          </footer>
      </dialog>)
}
