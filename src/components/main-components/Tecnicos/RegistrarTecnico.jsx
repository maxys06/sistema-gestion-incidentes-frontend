import styles from '../RegistrarForm/RegistrarForm.module.css'

import { useFieldArray, useForm} from 'react-hook-form'
import { Form, Input, RadioButtonList, SubmitButton, Fieldset, CheckboxList, SelectList} from '../RegistrarForm/RegistrarForm'
import { Button } from '../../Button/Button';

// Services

import { getAllContactTypes, getContactTypeByValue } from '../../../services/ContactTypeService';
import { useEffect, useState } from 'react';

export default function RegistrarTecnico(){

    //Form stuff

    const {register, handleSubmit, watch, control,  formState: {errors,  touchedFields, isValid}} = useForm(
        {
            mode: 'onSubmit',
            defaultValues: {
                nombre: "",
                apellido: "",
                specialties: [],
                contactData: [{
                    type: "",
                    data: ""
                }]

            }
        }
    );

    const {fields, append, remove} = useFieldArray({name: "contactData", control});

    console.log("errors", errors)

    function onSubmit(data) {
        console.log(data);
        console.log(watchContactData[1]);
        
    }

    // I'm watching the contactData field. That field, is an array of Objects of {type, data}
    // watchContactData is an array that has all the fields of the contactData array, with their updated values.
    let watchContactData = watch('contactData');

    // Normal react.


    let [contactMethods, setContactMethods] = useState([]);

    useEffect(() => {
        async function getContactTypes() {
            let response = await getAllContactTypes();
            setContactMethods(response);
        }

        getContactTypes();
        console.log(watchContactData)

        return () => {setContactMethods([])}

    }, [])



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
                        let  contact = getContactTypeByValue(watchContactData[idx].type)

                        return(
                            <div key={field.id} style={{display: 'flex', gap: '1ch', alignItems: 'start'}}>
                                <SelectList
                                    attributeName={`contactData.${idx}.type`}
                                    options={contactMethods}
                                    register={register}
                                    selectOptionMessage={"Metodo de Contacto"}
                                    error={errors.contactData?.[idx]?.type}
                                    required={"Por favor, seleccione un metodo de contacto."}
                                />
                                {   // We only render the input if there is a contactType selected
                                    contact &&                                
                                    <Input 
                                        label={contact.label}
                                        type='text'
                                        attributeName={`contactData.${idx}.data`}
                                        register={register}
                                        validations={{required: contact.required, pattern: contact.pattern}}
                                        error={errors.contactData?.[idx]?.data}
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
                                append({type: "telefono", data: ""})}
                            buttonClass='add'>Nuevo metodo de contacto</Button>
            </Fieldset>

            <Fieldset header={`Especialidades`}>
            <CheckboxList
                    attributeName="specialties"
                    register={register}
                    buttons={
                    [
                        {
                            label: "Windows",
                            value: 1
                        },
                        {
                            label: "Linux",
                            value: 2
                        }]
                    }
                    requiredMessage="Seleccione al menos una especialidad"
                    error={errors.specialties}

                    />
            </Fieldset>
            <SubmitButton description={"Registrar Tecnico"} isValid={isValid} errors={errors}/>
        </Form>
    )
}