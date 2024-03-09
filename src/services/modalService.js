import { useNavigate } from "react-router-dom";

let modalShow= null;

/*
  modalShowParameters = (show, setings{
    blockedScreen: bool
    title: string,
    body: string,
    actionButtons: [{
      text,
      color,
      handler
    }])

  }
*/


function subscribeShow(showFunction) {

  //This allows sets the value of modalShow. This is a function used to control the modal.
  modalShow = showFunction;
}
function blockScreen(title, message) {

  if (modalShow !=null) {
    modalShow(true, {
      type: "block",
      title: title, 
      body: message
    });
  }

}

function unlockScreen() {
  if (modalShow !=null){modalShow(false)}
}

function hide() {
  if (modalShow !=null){modalShow(false)}
}

function showInfo(title, message) {
  if (modalShow !=null) {
    modalShow(true,
      {
        type: "info",
        body: message,
        title: title
      }
    )}
}

function warn(title, message) {
  if (modalShow !=null){
    modalShow(true, 
      {
        type: 'warning',
        title: title,
        body: message}
      )}
}

function ask(message, actionHandler) {
  if (modalShow !=null) {
    modalShow(true, 
    {
      type: 'question',
      title: "Confirmar",
      body: message,
      action: {
        text: "Aceptar",
        handler: actionHandler
      },
      cancelText: "Cancelar"
    }
  )}
}

function redirectMessage(title, message, route) {

  if (modalShow !=null) {
    modalShow(true, 
    {
      type: 'redirect',
      title: title,
      body: message,
      action: {
        text: "Aceptar",
        route: route
      }
    }
  )}
}


const modalService = {subscribeShow, blockScreen, unlockScreen, showInfo, warn, ask, hide, redirectMessage}


export default modalService




