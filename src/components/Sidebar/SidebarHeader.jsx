import styles from "./Sidebar.module.css";

export default function SidebarHeader({color, title}) {
    return (
        <div className={`${styles.sidebarHeader} ${styles[color]}`}>
            {title}
        </div>
        )
}