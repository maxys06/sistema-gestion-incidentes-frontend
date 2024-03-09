import styles from './Button.module.css'
import { Link, useNavigate } from 'react-router-dom'

export function Button({buttonClass, type, size="normal", children, onClick, disabled=false, autoFocus=false}) {

    //Sizes: small, big

    return <button 
            onClick={onClick}
            type={type}
            disabled={disabled}
            autoFocus={autoFocus}
            className={`${styles.myButton} ${styles[size]} ${styles[buttonClass]}`}>
                {children}
            </button>
}

export function LinkButton({children, to, size, buttonClass, disabled=false}) {
    return (
        <Link className={`${styles.myButton} ${styles[size]} ${styles[buttonClass]}`} to={to} size={size} disabled={disabled}>{children}</Link>
    )
}

export function GoBackButton({children, size, disabled=false}) {

    let navigate = useNavigate();

    return (
        <Button buttonClass={"goBack"} onClick={() => navigate(-1)} size={size} disabled={disabled}>{children}</Button>
    )
}