import { Link } from "react-router-dom";


//Style imports
import "./Header.css";



export function Header() {

    return (
    <header className="container-site-header">
        <Link class="site-header" to="/">
            <p>Sistema De Gestion de Incidentes</p>
        </Link>
        <div className="button-container">
            <Link to="/signup" id='new-user'className="button-link">Registrar</Link>
            <Link to="/login" id='login' className="button-link">Iniciar Sesion</Link>
        </div>
    </header>
    )

}