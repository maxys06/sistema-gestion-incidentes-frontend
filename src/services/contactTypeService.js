import { $API_ROUTE, $API_CONTACTOS, $API_TIPOS_CONTACTO } from "../config.js";
import TipoContacto  from "../models/TipoContacto.js";
import axios from "axios";
import { httpService } from "./httpService.js";

let contactTypes = [];

let route = `${$API_ROUTE}${$API_CONTACTOS}${$API_TIPOS_CONTACTO}`;



async function getAllContactTypes() {
  


    let response = await httpService.get(route);
    let tiposContacto = response.data.map(d => new TipoContacto(d.idTipoContacto, d.tipo, d.regex, d.mensajeError));
    contactTypes = tiposContacto;
    return tiposContacto;
}

const contactTypeService = {getAllContactTypes}

export default contactTypeService




