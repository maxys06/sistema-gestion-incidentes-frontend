//Library Import
import { Outlet } from "react-router-dom";

//Style Import;



//Component Import
import { Header } from "./Header/Header";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";

export default function Root() {

    return (
        <>
            <Header/>
            <Navbar/>
            <Outlet/>
            <Footer/>

        </>
    )



}

