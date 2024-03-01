import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function SidebarElement({description, to}) {
    return (
        <NavLink to={to} end className={styles.actionLink}
                 style={({ isActive, isPending, isTransitioning }) => {
                    return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "black",
                    viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}>
            {description}
        </NavLink>
    )
}   