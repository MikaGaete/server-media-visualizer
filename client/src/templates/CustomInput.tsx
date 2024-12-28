import {CustomInputProps} from "../types/CustomInputTypes.tsx";

export const CustomInput = ({type, name, value, label, placeholder, styles, error, touched, handleChange, handleBlur, hidden}: CustomInputProps) => {
    return (
        <div className={'flex flex-col gap-1'}>
            <p className={'raleway-normal-500'}>{label}</p>
            <input
                className={`${styles} h-12 bg-[#f1f1f1] border-2 outline-none px-4 py-2 rounded-xl ${hidden && 'hidden'} ${error && touched ? 'border-red-600 placeholder:text-red-600' : 'border-[#181818] placeholder:text-gray-500'}`}
                type={type} placeholder={placeholder} value={value} name={name} onChange={handleChange}
                onBlur={handleBlur}/>
            <div className={'flex justify-center text-red-600 raleway-normal-500'}>
                {error && touched && error}
            </div>
        </div>
    );
};