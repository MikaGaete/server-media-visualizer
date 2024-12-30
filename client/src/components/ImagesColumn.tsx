import {ImageCardProps} from "../types/ImageCardTypes.tsx";
import {ImageCard} from "./ImageCard.tsx";
import {FileInput} from "../templates/FileInput.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

export const ImagesColumn = () => {
    const [images, setImages] = useState([]);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/images/9`, {
                headers: {
                    authorization: cookies.token
                }
            });

            setImages(data.data.images);
        }
        catch (error) {
            console.log(error);
            alert('Images could not be fetched. Please try again later.');
        }
    }

    return (
        <div className={'w-[50%] h-full flex flex-col gap-4 overflow-y-auto no-scrollbar px-8'}>
            <h1 className={'text-6xl raleway-normal-600'}>Photos</h1>
            <div className={'flex flex-col gap-4'}>
                <div className={'flex flex-wrap justify-around gap-2'}>
                    {images.map((image: ImageCardProps) => <ImageCard key={image.id} {...image} />)}
                </div>
                <FileInput id={crypto.randomUUID()} accept={'image/*'} endpoint={'images'}/>
            </div>
        </div>
    );
};