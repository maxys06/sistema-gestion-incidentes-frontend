//Library Import
import { Outlet } from "react-router-dom";

//Style Import;



//Component Import
import { Header } from "./Header/Header";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";
import { Modal } from "./Modal/Modal";

export default function Root() {

    return (
        <>
            <Modal/>
            <Header/>
            <Navbar/>
            <Outlet/>
            <Footer/>

        </>
    )



}

