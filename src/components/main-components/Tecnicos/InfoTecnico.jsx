import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Attribute, Info, InfoGroup, InfoList, ListElement } from "../../generic-components/Info/Info.jsx";
import { useEffect, useState } from "react";
import tecnicosService from "../../../services/tecnicosService.js";
import Tecnico  from "../../../models/Tecnico.js";
import modalService from "../../../services/modalService.js";

export function InfoTecnico() {


    let [tecnico, setTecnico] = useState(new Tecnico("", "", "", [], []));
    let {tecnicoId} = useParams();
    
    useEffect(()=> {
      async function loadTecnico() {
        let tecnico = await tecnicosService.getTecnicoById(tecnicoId);
        setTecnico(tecnico);
      }
      loadTecnico();

      return () => setTecnico(new Tecnico("", "", "", [], []))

    }, [])

    function handleDelete() {
      async function deleteTecnico() {
        try {
            await tecnicosService.deleteTecnico(tecnicoId);
            modalService.redirectMessage("Eliminacion exitosa", "Se ha eliminado el tecnico correctamente", "/tecnicos")
        }
        catch(err) {
            console.log("Ha fallado la eliminacion del tecnico", err);
        }
        
        
    }

    modalService.ask("Seguro que desea eliminar el tecnico?", deleteTecnico)
    }

    let telefonos = tecnico.datosContacto.filter(d => d.tipo == 'telefono'.toUpperCase());
    let emails = tecnico.datosContacto.filter(d => d.tipo == 'email'.toUpperCase());


    return (
    <Info handleDelete={handleDelete} dataId={tecnicoId}>
      <InfoGroup header={`Nombre y Apellido`}>
        <Attribute attributeName={'Nombre'}>{tecnico.nombre}</Attribute>
        <Attribute attributeName={'Apellido'}>{tecnico.apellido}</Attribute>
      </InfoGroup>

      <InfoGroup header={`Datos de Contacto`}>
        {telefonos.length > 0 &&
            <Attribute attributeName={'Telefonos'}>
            <InfoList>
              {
                telefonos
                .map((d, idx) => 
                  {
                    return (<ListElement key={idx}>{d.dato}</ListElement>)
                  })
              }
            </InfoList>
          </Attribute>
        }

        {emails.length > 0 &&
          <Attribute attributeName={'E-Mails'}>
            <InfoList>
              {
                emails
                .map((d, idx) => 
                  {
                    return (<ListElement key={idx}>{d.dato}</ListElement>)
                  })
              }
            </InfoList>
          </Attribute>
        }

      </InfoGroup>

      <InfoGroup header="Especialidades">
        <Attribute attributeName={'Especialidades'}>
          <InfoList>
            {tecnico.especialidades.map(e => {return (
              <ListElement>{e.nombre}</ListElement>
            )})}
          </InfoList>
        </Attribute>
      </InfoGroup>
    </Info>)
  }