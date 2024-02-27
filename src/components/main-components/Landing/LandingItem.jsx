//Styling
import styles from "./LandingItem.module.css";

// Components
import { Link } from "react-router-dom";

export default function LandingItem({to, header, descriptionItems,color}) {

    return (
        <Link to={to} className={`${styles.landingItem} ${styles[color]}`} >
            <div className={styles.header}>
                {header}
            </div>
            <ul>
                {descriptionItems.map((i, idx) => {
                return (
                    <li key={idx}>
                        {i}
                    </li>
                    )
                })}
            </ul>
        </Link>
    )

}