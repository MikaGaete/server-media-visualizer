import {CustomButtonProps} from "../types/CustomButtonTypes.tsx";

export const CustomButton = ({type, text, name, handleClick, hidden}: CustomButtonProps) => {
    return (
        <button className={`${hidden && 'hidden'} bg-[#181818] text-white raleway-normal-400 text-medium py-2 px-10 rounded-lg`} type={type} name={name} onClick={handleClick}>
            {text}
        </button>
    );
};