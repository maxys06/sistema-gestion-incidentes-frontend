import { useEffect, useState } from "react";
import {ConsultarMenuWrapper} from '../../generic-components/Consultar/ConsultarMenuWrapper'
import { QueryMenu, Input, Fieldset, CheckboxList } from "../../generic-components/Consultar/QueryMenu/QueryMenu";
import { ResultTable, HeaderCell, HeaderRow, DataRow } from "../../generic-components/Consultar/ResultTable/ResultTable";

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
    return {tecnicosData, especialidades, filters};
}

export default function ConsultarTecnicos(){

    //A weird hack, due to the way the state that's being passed onto the sort-comparator is old. It does not represent the new one.
    //When it's in its first state (no field is sorted), or when the user is sorting by another field, the sortOrder defaults to 'asc'

    function getNextSortOrder(attribute) {
        let nextSortOrder;
        if (sortedAttribute == '' || (attribute != sortedAttribute)) {
            nextSortOrder='asc'
        }
        else {
            nextSortOrder = sortOrder == 'asc' ? 'desc' : 'asc';
        }

        return nextSortOrder;
    }


    function sortTecnicos(attribute, sortOrder, comparator=undefined) {

        if (!comparator) {
            comparator = getGenericComparator(attribute, sortOrder);
        }
        let sortedArray = [...tecnicosData];
        sortedArray.sort(comparator);

        setTecnicos(sortedArray);
    }

    function getGenericComparator(attribute, sortOrder) {
        let comparator = function(o1, o2) {
            let aValue = o1[attribute];
            let bValue = o2[attribute];


            //Handling for null values

            if (!aValue && !bValue) {
                return 0
            }
            if (!aValue) {
                return -1
            }
            if (!bValue) {
                return 1
            }

            if (sortOrder === 'asc') {
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            } else if (sortOrder === 'desc') {
                if (aValue > bValue) return -1;
                if (aValue < bValue) return 1;
                return 0;
            } else {
                throw new Error('Invalid sort order. Please use "asc" or "desc".');
            }
        };

        return comparator; 
    }

    function handleGenericSort(attribute, comparator=undefined) {

        /* A generic sort handler. It creates a comparator according to the attribute. */
        let newSortOrder = getNextSortOrder(attribute);
        setSortedAttribute(attribute);
        setSortOrder(newSortOrder);
        sortTecnicos(attribute, newSortOrder, comparator);

    }

    function handleDelete(id) {

        async function deleteTecnico() {
            try {
                let tecnicoBorrado = await tecnicosService.deleteTecnico(id);
                modalService.showInfo("Operacion Correcta", "El tecnico se ha eliminado correctamente");
                let updatedTecnicos = tecnicos.filter(t => t.id != tecnicoBorrado.id);
                setTecnicos(updatedTecnicos);
            }
            catch(err) {
                console.log("Ha fallado la eliminacion del tecnico");
            }
            
            
        }

        modalService.ask("Seguro que desea eliminar el tecnico?", deleteTecnico)

    }

    function isChecked(especialidad) {
        let isChecked = filters.especialidades.some(ef => Number(ef) == Number(especialidad.idEspecialidad))

        return isChecked;
    }

    // React stuff
    let {tecnicosData, especialidades, filters} = useLoaderData();
    let [tecnicos, setTecnicos] = useState([])
    let [sortedAttribute, setSortedAttribute] = useState('');
    let [sortOrder, setSortOrder] = useState('');

    //When the data changes, set it to the state to enable the sort functions.
    useEffect(
        () => {
            if(sortedAttribute) {
                sortTecnicos(sortedAttribute, sortOrder);
            } else {
                setTecnicos(tecnicosData)
            }
        } 
        ,[tecnicosData])
    
    return (
        <ConsultarMenuWrapper header="Consulta de Tecnicos">
            <QueryMenu currentPage={filters.page ?? 1}>
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
            <ResultTable caption={"Listado de tecnicos"}>
                <HeaderRow>
                    <HeaderCell onSort={handleGenericSort} attributeName='id' isCurrentlySorted={sortedAttribute=='id'} sortingOrientation={sortOrder}>ID</HeaderCell>
                    <HeaderCell onSort={handleGenericSort} attributeName='nombre' isCurrentlySorted={sortedAttribute=='nombre'} sortingOrientation={sortOrder}>Nombre</HeaderCell>
                    <HeaderCell onSort={handleGenericSort} attributeName='apellido' isCurrentlySorted={sortedAttribute=='apellido'} sortingOrientation={sortOrder}>Apellido</HeaderCell>
                </HeaderRow>

                {tecnicos.length > 0 &&
                    <tbody>
                    {tecnicos.map(t => {
                        return(
                            <DataRow key={t.id} dataId={t.id} fields={[t.id, t.nombre, t.apellido]} onDelete={handleDelete}/>
                        )
                    })}
                </tbody>}
            </ResultTable>
        </ConsultarMenuWrapper>
    )
}