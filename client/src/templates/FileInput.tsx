import photo from "../assets/upload.svg";
import {ChangeEvent, useState} from "react";
import {CustomButton} from "./CustomButton.tsx";
import axios from "axios";
import {FileInputProps} from "../types/FileInputTypes.tsx";
import {useCookies} from "react-cookie";

export const FileInput = ({ id, accept, endpoint }: FileInputProps) => {
    const [files, setFiles] = useState(0);
    const [cookies] = useCookies(['token']);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        if (target.files) {
            setFiles(target.files.length);
        }
    };

    const handleClick = () => {
        const input = document.getElementById(id) as HTMLInputElement | null;

        if (!input) return;

        input.click();
    };

    const handleSubmit = async () => {
        const input = document.getElementById(id) as HTMLInputElement | null;

        if (input?.files) {
            const formData = new FormData();

            for (let i = 0; i < input.files.length; i++) {
                const file = input.files[i];
                formData.append(`file-${i}`, file);
            }

            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/uploads/${endpoint}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: cookies.token
                    }
                });

                input.files = null;
                setFiles(0);
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-center w-full h-16 min-h-12 bg-white rounded-xl border-2 hover:border-default-400 gap-4 cursor-pointer"
                 onClick={handleClick}
            >
                <p className="font-semibold text-xl line-clamp-1 max-w-[50%] text-ellipsis overflow-hidden">
                    {files === 0 ? "Upload File" : files > 1 ? `${files} Files` : `${files} File`}
                </p>
                <img alt="upload logo" src={photo} className="w-10 h-10" />
                <input type="file" accept={accept} multiple className="opacity-0 w-0 h-0" id={id} name="name" onChange={handleFileChange}/>
            </div>
            {<CustomButton text={'Upload'} hidden={files === 0} handleClick={handleSubmit} />}
        </div>
    );
};