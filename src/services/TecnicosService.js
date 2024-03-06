import { $API_TECNICO } from '../config';
import { httpService } from './httpService';
import { tecnicoMapper } from './mappers/TecnicoMapper';


export async function getAllTecnicos() {

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

export async function getTecnicoById(id) {
  try {
    let response = await httpService.get(`${$API_TECNICO}/${id}`, {
    })
    let tecnico = tecnicoMapper(response.data);
    console.log(tecnico)
    return tecnico


  }
  catch(err) {
    throw("Error al buscar los datos \n" + err)
  }
}

export async function postTecnico(data) {

  try {
    console.log(data);
    let response = await httpService.post(TECNICOS_URL, data,  {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return tecnicoMapper(response.data);
  }
  catch(err){
    console.log("Error al postear tecnico: ", err)
  }
}

