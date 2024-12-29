import {NavBar} from "../components/NavBar.tsx";
import {FileInput} from "../templates/FileInput.tsx";

export const Landing = () => {


    return (
        <div className={'bg-[#f1f1f1] w-screen min-h-screen flex flex-col items-center scrollbar-hide'}>
            <NavBar/>
            <div className={'w-full max-w-[100vw] h-[90vh] flex justify-center mt-[10vh] p-8'}>
                <div className={'w-[50%] min-h-full flex flex-col gap-4 overflow-y-auto scrollbar-hide px-8'}>
                    <h1 className={'text-6xl raleway-normal-600'}>Photos</h1>
                    <div>
                        <FileInput id={crypto.randomUUID()} accept={'image/*'} endpoint={'images'}/>
                    </div>
                </div>
                <div className={'h-full w-0.5 bg-gray-400 rounded-lg'}></div>
                <div className={'w-[50%] min-h-full flex flex-col gap-4 overflow-y-auto scrollbar-hide px-8'}>
                    <h1 className={'text-6xl raleway-normal-600'}>Docs</h1>
                    <div>
                        <FileInput id={crypto.randomUUID()} accept={'.pdf,.txt,.docx,.doc,.rtf,.xlsx,.xls,.pptx,.ppt'} endpoint={'docs'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};