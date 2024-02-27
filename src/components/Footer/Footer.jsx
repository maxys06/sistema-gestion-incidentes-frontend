import "./Footer.css"

//
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer className="footer">
            <div className="legal">
                <div className="copyright">
                    &copy;2024 Sanchez
                </div>
                <Link to="#./terms.html">
                    Terminos
                </Link>
                <Link to="#./privacy.html">
                    Privacidad
                </Link>
            </div>
            <div className="contact">
                <div>Telefono: 03547-1234567</div>
                <Link to="https://www.twitter.com">X</Link>
                <Link to="https://www.instagram.com">Instagram</Link>
            </div>
    </footer>
    )
}