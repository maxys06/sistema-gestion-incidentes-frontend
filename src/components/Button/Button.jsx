import styles from './Button.module.css'

export function Button({buttonClass, type, size="normal", children, onClick}) {

    //Sizes: small, big

    return <button 
            onClick={onClick}
            type={type}
            className={`${styles.myButton} ${styles[size]} ${styles[buttonClass]}`}>
                {children}
            </button>
}