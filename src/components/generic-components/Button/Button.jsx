import styles from './Button.module.css'
import { Link } from 'react-router-dom'

export function Button({buttonClass, type, size="normal", children, onClick, disabled=false}) {

    //Sizes: small, big

    return <button 
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`${styles.myButton} ${styles[size]} ${styles[buttonClass]}`}>
                {children}
            </button>
}

export function LinkButton({children, to, size, buttonClass, disabled=false}) {
    return (
        <Link className={`${styles.myButton} ${styles[size]} ${styles[buttonClass]}`} to={to} size={size} disabled={disabled}>{children}</Link>
    )
}