import { Button, GoBackButton } from "../Button/Button";
import styles from "./RegistrarForm.module.css";

export function Form({submitHandler, onSubmit, children}) {
    return (
        <form onSubmit={submitHandler(onSubmit)} class={styles.formRegistrar}>
            {children}
        </form>
    )
}


export function Fieldset({header, children}) {
    return(

        <fieldset className={styles.formGroup}>
            <header className={styles.formGroupHeader}>
                {header}
            </header>
            <div className={styles.formGroupInputs}>
                {children}
            </div>
        </fieldset>

    )
}

export function Input({label, type, attributeName, register, validations, error}) {

    return (
        <div className={styles.input}>
            <input id={attributeName}
                   type={type} {...register(attributeName, validations)}
                   className={(error) ? styles.inputError : ""}/>
            <label htmlFor={attributeName}>{label}</label>
            {(error) && <ErrorMessage>{error.message}</ErrorMessage>}
            

        </div>
    )
}


export function RadioButtonList({attributeName, register, buttons, error, requiredMessage}) {
    return (
        <div>
            <div className={styles.radioButtonList}>
                {
                    buttons.map((b, index) => {
                        return (
                            <div key={index} className={styles.radioButton}>
                                <input 
                                    id={b.label}
                                    type='radio'
                                    className={styles.radioButton}
                                    name={attributeName}
                                    value={b.value}
                                    {...register(attributeName, { required: requiredMessage }) }/>
                                <label htmlFor={b.label}>
                                    {b.label}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
            {(error) && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>

        

    )
}


export function CheckboxList({attributeName, register, buttons, error, requiredMessage}) {
    return (
        <div>
            <div className={styles.checkBoxList}>
                {
                    buttons.map((b, index) => {
                        return (
                            <div key={index} className={styles.checkBox}>
                                <input 
                                    id={b.label}
                                    type='checkbox'
                                    name={attributeName}
                                    value={b.value}
                                    defaultChecked={b.isChecked}
                                    {...register(attributeName, { required: requiredMessage }) }/>
                                <label htmlFor={b.label}>
                                    {b.label}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
            {(error) && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>

        

    )
}


export function FormButtons({description, isValid, errors, submitType}) {
    return (
        <div className={styles.submitButtonContainer}>
            <GoBackButton size='normal' >{"Volver"}</GoBackButton>
            <Button type="submit" buttonClass={submitType} size='big' >{description}</Button>
            {(!isValid && Object.keys(errors).length > 0) 
                    && <ErrorMessage>
                            Verifique los datos ingresados.
                       </ErrorMessage>}
        </div>
    )
}

export function ErrorMessage({children}) {
    return (
        <div className={styles.error}>{children}</div>
    )
}

export function SelectList({attributeName, options, selectOptionMessage, register, error, required = {value: false, message: "This field is not requried"}}) {
    /*options: [
            {
                value
                label
            }
        ]
    */

        return (
        
            <div>
                <select className={styles.select}
                        {...register(attributeName, {required: required })}>
                    <option value="" key={options.length + 1} hidden>{selectOptionMessage}</option>
                    {options.map((o) => {
                        return (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        )
                    })}
                </select>
                {(error) && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>

        )



}