import {MdDelete, MdEdit} from "react-icons/md";
import {ImageCardProps} from "../types/ImageCardTypes.tsx";

export const ImageCard = ({id, name, url}: ImageCardProps) => {
    console.log(id);
    return (
        <div className={'max-w-[32%] flex flex-col gap-1'}>
            <img className={'w-full rounded-lg'} src={ url }/>
            <div className={'w-full flex justify-between items-center'}>
                <p className={'raleway-normal-600 text-sm'}>{ name }</p>
                <div className={'flex gap-1'}>
                    <button className={'text-[#181818]'}><MdEdit size={18}/></button>
                    <button className={'text-[#181818]'}><MdDelete size={18}/></button>
                </div>
            </div>
        </div>
    );
};