import { Outlet } from "react-router-dom"

import Sidebar  from "../../Sidebar/Sidebar"
import SidebarHeader  from "../../Sidebar/SidebarHeader"
import SidebarActionList from "../../Sidebar/SidebarActionList"
import SidebarElement from "../../Sidebar/SidebarElement"


export function TecnicoRoot() {

    return (
        <div className="main-container">
            <Sidebar>
                <SidebarHeader color="blue" title="Tecnicos"/>
                <SidebarActionList>
                    <SidebarElement description="Consultar Tecnicos"
                                    to="/tecnicos"/>
                    <SidebarElement description="Registrar nuevo Tecnico"
                                    to="/tecnicos/registrar"/>
                </SidebarActionList>

            </Sidebar>
            <Outlet/>
        </div>

    )

}