import { $API_TECNICO } from '../config';
import { httpService } from './httpService';
import { tecnicoMapper } from './mappers/TecnicoMapper';
import qs from 'qs';


async function getAllTecnicos() {

  try {
    let response = await httpService.get($API_TECNICO);
    let tecnicos = response.data.map(d => tecnicoMapper(d));
    console.log(tecnicos);
    return tecnicos;
  }
  catch(err) {
    throw("Error al buscar los datos \n" + err)
  }
}

async function getTecnicoById(id) {
    let response = await httpService.get(`${$API_TECNICO}/${id}`, {
    })
    let tecnico = tecnicoMapper(response.data);
    console.log(tecnico)
    return tecnico
}

async function postTecnico(data) {

    let response = await httpService.post($API_TECNICO, data);
    return tecnicoMapper(response.data);
  }

async function filterTecnicos(filters) {
  let parsedFilter = qs.stringify(filters, { arrayFormat: 'repeat' })
  let response = await httpService.get(`${$API_TECNICO}/filtros?${parsedFilter}`)
  let tecnicos = response.data.tecnicos.map(d => tecnicoMapper(d));

  return {tecnicos: tecnicos, totalPages: response.data.totalPages, totalElements: response.data.totalElements, selectedPage: response.data.selectedPage}
}

async function deleteTecnico(id) {
  let response = await httpService.delete(`${$API_TECNICO}/${id}`);
  return tecnicoMapper(response.data);
}

async function editTecnico(id, data) {
  let response = await httpService.put(`${$API_TECNICO}/${id}`, data);
  return tecnicoMapper(response.data);
}

const tecnicosService = {postTecnico, getTecnicoById, getAllTecnicos, filterTecnicos, deleteTecnico, editTecnico}

export default tecnicosService;