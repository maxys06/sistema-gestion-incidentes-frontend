import { useEffect, useState } from "react";
import { CheckboxList, ConsultarMenuWrapper, Fieldset, HeaderRow, Input, QueryMenu, ResultTable, DataRow, HeaderCell} from "../../generic-components/Consultar/Consultar";

import tecnicosService from "../../../services/tecnicosService";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import specialtyService from "../../../services/specialtyService";

export async function loadConsultaTecnicos() {
    let data = {};
    data.tecnicosData = await tecnicosService.getAllTecnicos();
    data.especialidadesData = await specialtyService.getAllSpecialties();
    return data;
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

    // React stuff
    let {tecnicosData, especialidadesData} = useLoaderData();

    let [tecnicos, setTecnicos] = useState(tecnicosData);
    let [sortedAttribute, setSortedAttribute] = useState('');
    let [sortOrder, setSortOrder] = useState('');

    const {register, handleSubmit} = useForm(
        {
            mode: 'onSubmit',
            defaultValues: {
                nombre: "",
                apellido: "",
                especialidades: []
            }
        })

    async function onSearch(filters) {
        let result = await tecnicosService.filterTecnicos(filters);
        setTecnicos(result);
        setSortedAttribute('');
        setSortOrder('');
    }
    
    //Load all technicians when entering the site.

    return (
        <ConsultarMenuWrapper header="Consulta de Tecnicos">
            <QueryMenu submitHandler={handleSubmit} onSubmit={onSearch}>
                <Fieldset header="Nombre y apellido">
                    <Input register={register} type='text' attributeName='nombre' label="Nombre"/>
                    <Input register={register} type='text' attributeName='apellido' label="Apellido"/>
                </Fieldset>
                {especialidadesData.length > 0 &&
                <Fieldset header="Especialidades">
                    <CheckboxList
                        register = {register}
                        attributeName={'especialidades'}
                        buttons= {
                            especialidadesData.map(d => {return {label: d.nombre, value: d.idEspecialidad}})
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