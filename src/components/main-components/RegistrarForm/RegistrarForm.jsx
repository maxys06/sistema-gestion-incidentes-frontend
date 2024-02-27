import { Button } from "../../Button/Button";
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


export function SubmitButton({description, isValid, errors}) {
    return (
        <div className={styles.submitButtonContainer}>
            <Button type="submit" buttonClass='register' size='big' >{description}</Button>
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

export function SelectList({attributeName, options, selectOptionMessage, register, requiredMessage=undefined}) {
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
                        {...register(attributeName, {required: (requiredMessage != undefined ) ? requiredMessage : "This field is required!" })}>
                    <option value="" disabled hidden key="empty">{selectOptionMessage}</option>
                    {options.map((o) => {
                        return (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        )
                    })}
                </select>

            </div>

        )



}