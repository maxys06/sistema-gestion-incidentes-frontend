//Libraries imports/

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Style Imports

import '@material-design-icons/font'
import './GlobalStyle.css'

//Component imports
import Root from "./components/Root"
import Landing from './components/main-components/Landing/Landing';
import ConsultarTecnicos from './components/main-components/Tecnicos/ConsultarTecnicos';
import RegistrarTecnico from './components/main-components/Tecnicos/RegistrarTecnico';
import { TecnicoRoot } from './components/main-components/Tecnicos/TecnicoRoot';

const routes = [{

    path: "/",
    element: <Root/>,
    children: [
      {index: true, element: <Landing/>},
      {
        path:'/tecnicos',
        element: <TecnicoRoot/>,
        children: [
          {
            index: true, element: <ConsultarTecnicos/>
          },
          {
            path: '/tecnicos/registrar',
            element: <RegistrarTecnico/>
          }
        ]
      }]
}];


const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
