import { Modal } from "../Modal/Modal"
import modalService from "../../services/modalService"

export function TestComponent() {


  async function handleClick() {
    async function backendPetition() {

      return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
    }

    async function searchTecnicos() {
      console.log("Petitioning...");
      modalService.blockScreen("Buscando tecnicos", "Espere por favor...")
      await backendPetition();
      modalService.warn('Error de Conexion', "No se ha podido conectar con el servidor correctamente");
      console.log("COMPLETE...");
    }

    modalService.ask("Confirmacion", "Desea comenzar la busqueda de tecnicos?", "Buscar", searchTecnicos);

  }


  return (
    <>
      
      <button onClick={handleClick}>Show Service</button>
    </>
  )

}