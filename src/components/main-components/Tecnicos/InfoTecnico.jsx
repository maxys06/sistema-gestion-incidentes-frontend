import { useParams } from "react-router-dom";
import { Attribute, Info, InfoGroup, InfoList, ListElement } from "../../generic-components/Info/Info";
import { useEffect, useState } from "react";
import { getTecnicoById } from "../../../services/TecnicosService";
import Tecnico  from "../../../models/Tecnico.js";

export function InfoTecnico() {

  let [tecnico, setTecnico] = useState(new Tecnico("", "", "", [], []));


  let {tecnicoId} = useParams();
  
  useEffect(()=> {
    async function loadTecnico() {
      let tecnico = await getTecnicoById(tecnicoId);
      setTecnico(tecnico);
    }
    loadTecnico();

    return () => setTecnico(new Tecnico("", "", "", [], []))

  }, [])

    let telefonos = tecnico.datosContacto.filter(d => d.tipo == 'telefono'.toUpperCase());
    let emails = tecnico.datosContacto.filter(d => d.tipo == 'email'.toUpperCase());
    return (
    <Info>
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