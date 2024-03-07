
import { useFieldArray, useForm} from 'react-hook-form'
import { Form, Input, RadioButtonList, SubmitButton, Fieldset, CheckboxList, SelectList} from '../../generic-components/RegistrarForm/RegistrarForm'
import { Button } from '../../generic-components/Button/Button';

// Services

import contactTypeService from '../../../services/contactTypeService';
import { useEffect, useState, useRef } from 'react';
import specialtyService  from '../../../services/specialtyService';
import tecnicosService from '../../../services/tecnicosService';
import { Navigate, useLoaderData} from 'react-router-dom';
import modalService from '../../../services/modalService';

export async function loadTecnicoFormData() {
    
    let data = {};
    try {
        data.specialties = await specialtyService.getAllSpecialties();
        data.contactMethods = await contactTypeService.getAllContactTypes();
    }
    catch(err) {
        throw(err);
    }
        
    return data;
      
}

export default function RegistrarTecnico(){

    //Get the data from the loader.
    let {specialties, contactMethods} = useLoaderData();


    //Form stuff

    const {
        register,
        handleSubmit,
        watch, control,
        formState: {errors,  touchedFields, isValid}} = useForm(
        {
            mode: 'onSubmit',
            defaultValues: {
                nombre: "",
                apellido: "",
                idEspecialidades: [],
                contactos: [{
                    tipoContacto: "",
                    contacto: ""
                }]

            }
        }
    );    
    //The contacts are part of a dynamic field.
    const {fields, append, remove} = useFieldArray({name: "contactos", control});

    // I'm watching the contactData field. That field, is an array of Objects of {type, data}
    // watchContactData is an array that has all the fields of the contactData array, with their updated values.
    let watchContactData = watch('contactos');

    // Normal react.
    let [isSubmitSucessful, setSubmitSucessful] = useState(false)
    let tecnicoRegistrado = useRef({});

    let formContactTypes =contactMethods.map(c => {return {value: c.tipo, label: c.tipo}});
    //We adapt the specialties attributes so that we can use it in our select.
    let formSpecialties =specialties.map(s => {return({label: s.nombre, value: s.idEspecialidad})})

    //ON SUBMIT FUNCTION.

    async function onSubmit(data) { 
        
        async function submitTecnico(data) {
            try {
                let tecnico = await tecnicosService.postTecnico(data);
                tecnicoRegistrado.current.id = tecnico.id;
                setSubmitSucessful(true);
            }
            catch(err) {
                alert(err)
                setSubmitSucessful(false);
            }
        }

        modalService.ask("Esta seguro de que desea registrar el tecnico?", async () => await submitTecnico(data))


               
    }


    //Aux function to retreive the data of a contact type according to its type:
    function getContactByTipo(tipo) {
        let contactType = contactMethods.find(c => c.tipo == tipo);
        return contactType;
    }

    //REDIRECT AFTER FORM SUCCESFULL.

    if(isSubmitSucessful) {
        return <Navigate to={`/tecnicos/${tecnicoRegistrado.current.id}`}/>
    }

    return(
            <Form submitHandler={handleSubmit} onSubmit={onSubmit}>
                <Fieldset header="Nombres y Apellidos">
                    <Input label={"Nombre"}
                           type='text'
                           attributeName="nombre"
                           register={register}
                           validations={{required: "El nombre del tecnico es requerido."}}
                           error={errors.nombre}
                           touched={touchedFields.nombre}/>
                    <Input label={"Apellido"}
                           type='text'
                           attributeName={"apellido"}
                           register={register}
                           validations={{required: "El apellido del tecnico es requerido."}}
                           error={errors.apellido}
                           touched={touchedFields.apellido}/>
                </Fieldset>
    
                <Fieldset header={`Datos de Contacto`}>
    
                    {
                        fields.map((field, idx) => {
                            //We obtain the selected contact type.
                            let  contact = getContactByTipo(watchContactData[idx].tipoContacto)
    
                            return(
                                <div key={field.id} style={{display: 'flex', gap: '1ch', alignItems: 'start'}}>
                                    <SelectList
                                        attributeName={`contactos.${idx}.tipoContacto`}
                                        options={formContactTypes}
                                        register={register}
                                        selectOptionMessage={"Metodo de Contacto"}
                                        error={errors.contactos?.[idx]?.tipoContacto}
                                        required={"Por favor, seleccione un metodo de contacto."}
                                    />
                                    {   // We only render the input if there is a contactType selected
                                        contact &&                                
                                        <Input 
                                            label={contact.tipo}
                                            type='text'
                                            attributeName={`contactos.${idx}.contacto`}
                                            register={register}
                                            validations={{required: "Este campo es requerido", pattern: {value: contact.regex, message: contact.mensajeError}}}
                                            error={errors.contactos?.[idx]?.contacto}
                                        />}
    
                                    {   //We ensure that the first button cannot be deleted.
                                        idx > 0 && 
                                        <Button type="button" size='small' buttonClass={'delete'} onClick={() => remove(idx)}>
                                            Eliminar
                                        </Button>
                                    }
                                </div>
                            )
                            
                    })}
                        <Button type="button" 
                                onClick={() => 
                                    append({tipoContacto: "", contacto: ""})}
                                buttonClass='add'>Nuevo metodo de contacto</Button>
                </Fieldset>
    
                <Fieldset header={`Especialidades`}>
                    <CheckboxList
                            attributeName="idEspecialidades"
                            register={register}
                            buttons={formSpecialties}
                            requiredMessage="Seleccione al menos una especialidad"
                            error={errors.idEspecialidades}
    
                    /> 
                </Fieldset>
                <SubmitButton description={"Registrar Tecnico"} isValid={isValid} errors={errors}
    />
            </Form>
    )
}