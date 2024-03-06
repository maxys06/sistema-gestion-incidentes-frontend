import { useEffect, useState } from "react";
import { CheckboxList, ConsultarMenuWrapper, Fieldset, HeaderRow, Input, QueryMenu, ResultTable, DataRow, HeaderCell} from "../../generic-components/Consultar/Consultar";

import {getAllTecnicos} from "../../../services/TecnicosService";



export default function ConsultarTecnicos(){

    let [tecnicos, setTecnicos] = useState([]);
    let [sortedAttribute, setSortedAttribute] = useState('');
    let [sortOrder, setSortOrder] = useState('');

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


    function sortTecnicos(attribute, comparator, sortOrder) {
        let sortedArray = [...tecnicos];
        sortedArray.sort(comparator);

        setSortOrder(sortOrder);
        setTecnicos(sortedArray);
        setSortedAttribute(attribute);
    }

    function handleGenericSort(attribute) {

        /* A generic sort handler. It creates a comparator according to the attribute. */

        let comparator;
        let nextSortOrder = getNextSortOrder(attribute);

        comparator = function(o1, o2) {
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

            if (nextSortOrder === 'asc') {
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            } else if (nextSortOrder === 'desc') {
                if (aValue > bValue) return -1;
                if (aValue < bValue) return 1;
                return 0;
            } else {
                throw new Error('Invalid sort order. Please use "asc" or "desc".');
            }
        };

        sortTecnicos(attribute, comparator, nextSortOrder);

    }

    function handleDelete(id) {
        console.log(id);
    }
    
    //Load all technicians when entering the site.

    useEffect(() => {

        async function loadTecnicos() {
            let tecnicos = await getAllTecnicos();
            setTecnicos(tecnicos)
        }
        loadTecnicos();
    }, [])

    return (
        <ConsultarMenuWrapper header="Consulta de Tecnicos">
            <QueryMenu>
                <Fieldset header="Nombre y apellido">
                    <Input label="Nombre"/>
                    <Input label="Apellido"/>
                </Fieldset>
                <Fieldset header="Especialidades">
                    <CheckboxList buttons= {[
                        {label: "Windows", value: 1}, {value: 2, label: "Linux"}
                    ]}/>
                </Fieldset>

            </QueryMenu>
            <ResultTable caption={"Listado de tecnicos"}>
                <HeaderRow>
                    <HeaderCell onSort={handleGenericSort} attributeName='id' isCurrentlySorted={sortedAttribute=='id'} sortingOrientation={sortOrder}>ID</HeaderCell>
                    <HeaderCell onSort={handleGenericSort} attributeName='nombre' isCurrentlySorted={sortedAttribute=='nombre'} sortingOrientation={sortOrder}>Nombre</HeaderCell>
                    <HeaderCell onSort={handleGenericSort} attributeName='apellido' isCurrentlySorted={sortedAttribute=='apellido'} sortingOrientation={sortOrder}>Apellido</HeaderCell>
                </HeaderRow>

                <tbody>
                    {tecnicos.map(t => {
                        return(
                            <DataRow key={t.id} dataId={t.id} fields={[t.id, t.nombre, t.apellido]} onDelete={handleDelete}/>
                        )
                    })}
                </tbody>
            </ResultTable>
        </ConsultarMenuWrapper>
    )
}