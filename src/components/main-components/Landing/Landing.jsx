import styles from "./Landing.module.css";
import LandingItem from "./LandingItem.jsx"

export default function Landing() {

    return (
    <main className={styles.main}>
        <LandingItem
            to="/servicios"
            header="Servicios"
            color="purple"
            descriptionItems={[
                "Registrar un nuevo servicio",
                "Modificar un servicio Existente",
                "Dar de baja un Servicio"
            ]}/>
        <LandingItem
            to="/tecnicos"
            header="Tecnicos"
            color="blue"
            descriptionItems={[
                "Registrar un nuevo tecnico",
                "Modificar los datos de un tecnico",
                "Dar de baja un tecnico"
            ]}/>
        <LandingItem
            to="/especialidades"
            header="Especialidades"
            color="pink"
            descriptionItems={[
                "Registrar una nueva especialidad",
                "Modificar una especialidad existente",
                "Dar de baja una especialidad"
            ]}/>
    </main>)

}