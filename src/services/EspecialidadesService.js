import axios from "axios";
import { $API_ESPECIALIDADES, $API_ROUTE } from "../config";
import { httpService } from "./httpService";

/*

  Especialidades:
    idEspecialidad
    nombre
    listProblemas

*/

export async function getAllSpecialties() {

  let route = `${$API_ROUTE}${$API_ESPECIALIDADES}`

  try {
    let response = await httpService.get(route);
    let especialidades = response.data
    return especialidades;
  }
  catch(err) {
    return []
  }

}