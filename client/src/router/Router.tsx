import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Landing} from "../pages/Landing.tsx";
import {Login} from "../pages/Login.tsx";
import {Lock} from "./Lock.tsx";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Lock><Landing/></Lock>} />
                <Route path={'/login'} element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};