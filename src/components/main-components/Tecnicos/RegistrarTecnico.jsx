import styles from '../RegistrarForm/RegistrarForm.module.css'
import { useForm} from 'react-hook-form'
import { Form, Input, RadioButtonList,SubmitButton, Fieldset, CheckboxList} from '../RegistrarForm/RegistrarForm'

export default function RegistrarTecnico(){

    function onSubmit(data) {
        console.log(data)
    }

    const {register, handleSubmit, watch, formState: {errors,  touchedFields, isValid}} = useForm(
        {
            mode: 'onSubmit',
            defaultValues: {
                contactMethod: 1
            }
        }
    );

    const selectedContactMethod = watch("contactMethod");
    

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
                <RadioButtonList
                    attributeName="contactMethod"
                    register={register}
                    buttons={
                    [
                        {
                            label: "Telefono",
                            value: 1
                        },
                        {
                            label: "Email",
                            value: 2
                        }]
                    }
                    requiredMessage="Seleccione al menos un metodo de contacto"
                    error={errors.contactMethod}

                    />
                <Input label={(selectedContactMethod == 1) ?
                            "Numero de Telefono" :
                            "E-Mail"
                       }
                       type="text"
                       attributeName="contacto"
                       register={register}
                       error={errors.contacto}
                       touched={touchedFields.contacto}
                       validations=
                        {
                         (selectedContactMethod == 1) ?
                            {
                                required: "El numero de telefono es requerido",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "Numero de telefono invalido. Ingrese el numero sin guion"
                                  } 

                        } : {
                                required: "El E-Mail es requerido", 
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                    message: "Direccion email invalida."
                              }}
                       }/>
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