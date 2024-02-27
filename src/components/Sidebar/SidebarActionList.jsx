import styles from "./Sidebar.module.css";

export default function SidebarActionList({children}) {
    return (
        <div className={styles.actionList}>
            {children}
        </div>
    )
}