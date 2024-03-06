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
    modalService.warn("Error en la peticion", "Ha ocurrido un error en la peticion" + error);
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
    modalService.warn("Error en la peticion", error.message);
    return Promise.reject(error);
  }
)

export {httpService}