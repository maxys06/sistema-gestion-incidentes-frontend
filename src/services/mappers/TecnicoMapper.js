import Contacto from "../../models/Contacto.js";
import  Especialidad  from "../../models/Especialidad.js";
import  Tecnico  from "../../models/Tecnico.js";
import  Problema  from "../../models/Problema.js";


export function tecnicoMapper(data) {
  let id = data.idTecnico;
  let nombre = data.nombre;
  let apellido = data.apellido;
  let contactos = data.contactos.map(c => new Contacto(c.tipoContacto, c.contacto));
  let especialidades = data.especialidades.map(
    (e) => {
      let problemas = e.problemas.map( p => {
        return new Problema(p.idProblema, p.tipo, p.descripcion, p.tiempoMaximoResolucion, p.complejo);
      })

      return new Especialidad(e.idEspecialidad, e.nombre, problemas);
    }
  )
  
  return new Tecnico(id, nombre, apellido, contactos, especialidades);
}