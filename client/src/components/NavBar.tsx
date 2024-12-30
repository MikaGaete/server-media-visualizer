import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import {CustomButton} from "../templates/CustomButton.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

export const NavBar = () => {
    const navigate = useNavigate();
    const {isLogged, username} = useSelector((state: RootState) => state.auth);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (isLogged) {
            return;
        }

        const target = event.target as HTMLButtonElement;

        if (target.name) {
            navigate(`/${target.name}`);
        }
        else navigate('/');
    }

    return (
        <div
            className={'fixed top-0 min-w-[100vw] w-full h-[10vh] flex justify-between bg-gradient-to-b from-[#f1f1f1] from-90% to-transparent px-8'}>
            <div className={'flex items-center justify-start gap-12'}>
                <button className={'raleway-normal-600 text-xl'} onClick={handleClick}>MIKA'S MANAGEMENT TOOL</button>
                <button name={'photos'} className={'raleway-normal-500 text-lg'} onClick={handleClick}>Photos</button>
                <button name={'docs'} className={'raleway-normal-500 text-lg'} onClick={handleClick}>Docs</button>
                <button className={'raleway-normal-500 text-lg'}>More</button>
            </div>
            <div className={'flex items-center'}>
                <CustomButton text={isLogged ? username : 'Log in'} name={'login'} handleClick={handleClick}/>
            </div>
        </div>
    );
};