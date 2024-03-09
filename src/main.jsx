//Test imports

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
import ConsultarTecnicos, { loadConsultaTecnicos} from './components/main-components/Tecnicos/ConsultarTecnicos';
import RegistrarTecnico, {loadTecnicoFormData} from './components/main-components/Tecnicos/RegistrarTecnico';
import { TecnicoRoot } from './components/main-components/Tecnicos/TecnicoRoot';
import { InfoTecnico } from './components/main-components/Tecnicos/InfoTecnico';
import { TestComponent } from './components/main-components/TestComponent';
import { ErrorScreen } from './components/generic-components/ErrorScreen/ErrorScreen';



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
            index: true, 
            element: <ConsultarTecnicos/>,
            loader: loadConsultaTecnicos,
            errorElement: <ErrorScreen title={"Ha ocurrido un error"}/>
          },
          {
            path: '/tecnicos/:tecnicoId',
            element: <InfoTecnico/>
          },
          {
            path: '/tecnicos/registrar',
            element: <RegistrarTecnico/>,
            loader: loadTecnicoFormData,
            errorElement: <ErrorScreen title={"Ha ocurrido un error"}/>
          },
          {path: '/tecnicos/edit/:tecnicoId',
           element: <RegistrarTecnico/>,
          loader: loadTecnicoFormData,
          errorElement: <ErrorScreen title={"Ha ocurrido un error"}/>}

        ]
      }]
}];


const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


