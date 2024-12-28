import {NavBar} from "../components/NavBar.tsx";

export const Landing = () => {
    return (
        <div className={'bg-[#f1f1f1] w-screen min-h-screen flex flex-col items-center'}>
            <NavBar/>
            <div className={'w-full min-h-[90vh] flex flex-col items-center justify-center'}>
                a
            </div>
        </div>
    );
};