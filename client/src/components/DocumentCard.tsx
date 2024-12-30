import {FaFilePdf} from "react-icons/fa6";
import {ImageCardProps} from "../types/ImageCardTypes.tsx";

export const DocumentCard = ({id, name, url}: ImageCardProps) => {
    console.log(id, url);
    return (
        <div className={'flex gap-2 items-center w-[48%]'}>
            <div className={'p-2 border-2 text-[#b51308] border-[#b51308] rounded-lg'}>
                <FaFilePdf size={22}/>
            </div>
            <p className={'raleway-normal-600'}>{name}</p>
        </div>
    );
};