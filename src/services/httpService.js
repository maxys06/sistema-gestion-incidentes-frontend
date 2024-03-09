import axios from "axios";
import { $API_ROUTE } from "../config";
import modalService from "./modalService";
import { useErrorBoundary } from "react-error-boundary";

const httpService = axios.create({
  baseURL: $API_ROUTE,
  timeout: 1000,
  headers: {'Content-type': 'application/json'}
});


httpService.interceptors.request.use(
  (request) => {
    console.log("Enviando peticion...", request);
    modalService.blockScreen("Procesando peticion", "Espere por favor...");
    return request
  },
  (error) => {
    console.log("Error en la peticion...", request);
    modalService.warn("Error en la peticion", "Ha ocurrido un error en la peticion: " + error.message + " " + error.response?.data);
    return Promise.reject(error);
  }
)

httpService.interceptors.response.use(
  (response) => {
    console.log("Respuesta:", response);
    modalService.unlockScreen();
    return response
  },
  (error) => {
    console.log("Error en la respuesta: ", error);

    let errorMessage = {};
    errorMessage.message = `Message: ${error.message}`;
    errorMessage.code = `Code: ${error.code}`;
    errorMessage.data = error.response ? `Data: ${error.response.data}` : ""
    let errorString = ` ${errorMessage.message} \n ${errorMessage.code} \n  ${errorMessage.data}`; 

    modalService.warn("Error en la peticion", errorString);
    return Promise.reject(error);
  }
)

export {httpService}