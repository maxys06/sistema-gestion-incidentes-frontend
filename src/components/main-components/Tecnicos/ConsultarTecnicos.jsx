import { useEffect, useState } from "react";
import {ConsultarMenuWrapper} from '../../generic-components/Consultar/ConsultarMenuWrapper'
import { QueryMenu, Input, Fieldset, CheckboxList } from "../../generic-components/Consultar/QueryMenu/QueryMenu";
import { ResultTable, HeaderCell, HeaderRow, DataRow, GenericResultTable } from "../../generic-components/Consultar/ResultTable/ResultTable";

import tecnicosService from "../../../services/tecnicosService";
import { useLoaderData} from "react-router-dom";
import specialtyService from "../../../services/specialtyService";
import qs from 'qs'
import modalService from "../../../services/modalService";

export async function loadConsultaTecnicos({request}) {
    const url = new URL(request.url);
    let filters = qs.parse(url.search, {delimiter: "&",ignoreQueryPrefix: true, allowEmptyArrays: true})
    filters.especialidades = !Array.isArray(filters.especialidades) ? Array.of(filters.especialidades) : filters.especialidades;
    let tecnicosData = await tecnicosService.filterTecnicos(filters);
    let especialidades = await specialtyService.getAllSpecialties();
    return {tecnicosData: tecnicosData.tecnicos,
            totalElements: tecnicosData.totalElements,
            totalPages: tecnicosData.totalPages,
            especialidades, 
            filters};
}

export default function ConsultarTecnicos(){

    //A weird hack, due to the way the state that's being passed onto the sort-comparator is old. It does not represent the new one.
    //When it's in its first state (no field is sorted), or when the user is sorting by another field, the sortOrder defaults to 'asc'


    function isChecked(especialidad) {
        let isChecked = filters.especialidades.some(ef => Number(ef) == Number(especialidad.idEspecialidad))

        return isChecked;
    }
    let {tecnicosData, totalElements, totalPages, especialidades, filters} = useLoaderData();
    
    return (
        <ConsultarMenuWrapper header="Consulta de Tecnicos">
            <QueryMenu currentPage={filters.page ?? 1} totalElements={totalElements} totalPages={totalPages}>
                    <Fieldset header="Nombre y apellido">
                        <Input type='search' attributeName='nombre' label="Nombre" defaultValue={filters.nombre}/>
                        <Input type='search' attributeName='apellido' label="Apellido" defaultValue={filters.apellido}/>
                    </Fieldset>
                    {especialidades.length > 0 &&
                    <Fieldset header="Especialidades">
                        <CheckboxList
                            attributeName={'especialidades'}
                            buttons= {
                                especialidades.map(d => {return {label: d.nombre, value: d.idEspecialidad, defaultChecked: isChecked(d)}})
                                }/>
                    </Fieldset>}
            
            </QueryMenu>
            <GenericResultTable
                caption="Listado de Tecnicos"
                deleteService={tecnicosService.deleteTecnico}
                dataArray={tecnicosData}
                dataIdAttribute={{
                    title: "ID",
                    attribute: "id"
                }}
                dataAttributeArray={[
                    {
                      title: "Nombre",
                      attribute: "nombre",
                    },{
                      title: "Apellido",
                      attribute: "apellido",
                    }
                ]
                }

            />
        </ConsultarMenuWrapper>
    )
}