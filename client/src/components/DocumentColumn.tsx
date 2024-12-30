import {ImageCardProps} from "../types/ImageCardTypes.tsx";
import {DocumentCard} from "./DocumentCard.tsx";
import {FileInput} from "../templates/FileInput.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

export const DocumentColumn = () => {
    const [documents, setDocuments] = useState([]);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        getDocs();
    }, []);

    const getDocs = async () => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/docs/9`, {
                headers: {
                    authorization: cookies.token
                }
            });

            setDocuments(data.data.documents);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={'w-[50%] h-full flex flex-col gap-4 overflow-y-auto scrollbar-hide px-8'}>
            <h1 className={'text-6xl raleway-normal-600'}>Docs</h1>
            <div className={'w-full flex flex-col gap-4'}>
                <div className={'flex flex-wrap justify-between gap-2'}>
                    {documents.map((doc: ImageCardProps) => <DocumentCard key={doc.id} {...doc}/>)}
                </div>
                <FileInput id={crypto.randomUUID()} accept={'.pdf,.txt,.docx,.doc,.rtf,.xlsx,.xls,.pptx,.ppt'} endpoint={'docs'}/>
            </div>
        </div>
    );
};