//Test imports
import { getAllTecnicos } from './services/TecnicosService';

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
import { InfoTecnico } from './components/main-components/Tecnicos/InfoTecnico';
import { TestComponent } from './components/main-components/TestComponent';
import { ErrorBoundary } from 'react-error-boundary';

const routes = [{

    path: "/",
    element: <Root/>,
    children: [
      {index: true, element: <Landing/>},
      {path: '/test', element: <TestComponent/>},
      {
        path:'/tecnicos',
        element: <TecnicoRoot/>,
        children: [
          {
            index: true, element: <ConsultarTecnicos/>
          },
          {
            path: '/tecnicos/:tecnicoId',
            element: <InfoTecnico/>
          },
          {
            path: '/tecnicos/registrar',
            element: <RegistrarTecnico/>,
          },
          {path: '/tecnicos/edit/:tecnicoId',
           element: <>Nothing here brotha</>}

        ]
      }]
}];


const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


