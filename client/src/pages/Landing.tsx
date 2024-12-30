import {NavBar} from "../components/NavBar.tsx";
import {ImagesColumn} from "../components/ImagesColumn.tsx";
import {DocumentColumn} from "../components/DocumentColumn.tsx";

export const Landing = () => {
    return (
        <div className={'bg-[#f1f1f1] w-screen min-h-screen flex flex-col items-center scrollbar-hide'}>
            <NavBar/>
            <div className={'w-full max-w-[100vw] h-[90vh] flex justify-center mt-[10vh] py-8'}>
                <ImagesColumn/>
                <div className={'h-full w-0.5 bg-gray-400 rounded-lg'}></div>
                <DocumentColumn/>
            </div>
        </div>
    );
};