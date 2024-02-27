import { NavLink } from "react-router-dom"

import './Navbar.css'

import { useRef, useState } from "react"

export function Navbar() {

    const links = (
        <>
            <NavLink to="/servicios" className='underline-purple'>SERVICIOS</NavLink>
            <NavLink to="/incidentes"className="underline-orange">INCIDENTES</NavLink>
            <NavLink to="/problemas" className="underline-red">PROBLEMAS</NavLink>
            <NavLink to="/tecnicos"  className="underline-blue">TECNICOS</NavLink>
            <NavLink to="/especialidades" className="underline-pink">ESPECIALIDADES</NavLink>
        </>
    )

    //Using the media queries, the navbar gets hidden

    let [isShowingMenu, setIsShowingMenu] = useState(false);

    function handleShowMenu() {
        setIsShowingMenu(!isShowingMenu);
    }

    let drowpdownLinks = useRef(null);

    let currentHeight = isShowingMenu ? `${drowpdownLinks.current.scrollHeight}px` : '0';


    return (
        <>
        <button onClick={handleShowMenu} className="hamburgerMenu">
            Funcionalidades
        </button>
        <nav ref={drowpdownLinks}
             className={`hamburgerMenuLinks`}
             style={{height:currentHeight}}
             >
                {links}
        </nav>

        <nav class="navbar">
            {links}
        </nav>
        </>

    )
}