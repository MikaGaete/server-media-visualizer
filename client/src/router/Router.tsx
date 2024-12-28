import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Landing} from "../pages/Landing.tsx";
import {Login} from "../pages/Login.tsx";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing/>} />
                <Route path={'/login'} element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};