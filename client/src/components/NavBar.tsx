import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

export const NavBar = () => {
    const navigate = useNavigate();

    // TODO add logic to get the loggedIn state when available

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const target = event.target as HTMLButtonElement;

        if (target.name) {
            navigate(`/${target.name}`);
        }
        else navigate('/');
    }

    return (
        <div
            className={'w-full h-[10vh] flex justify-between bg-gradient-to-b from-[#f1f1f1] from-90% to-transparent px-8'}>
            <div className={'flex items-center justify-start gap-12'}>
                <button className={'raleway-normal-600 text-xl'} onClick={handleClick}>MIKA'S MANAGEMENT TOOL</button>
                <button name={'photos'} className={'raleway-normal-500 text-lg'} onClick={handleClick}>Photos</button>
                <button name={'docs'} className={'raleway-normal-500 text-lg'} onClick={handleClick}>Docs</button>
                <button className={'raleway-normal-500 text-lg'}>More</button>
            </div>
            <div className={'flex items-center'}>
                {/* TODO add alternative to the login button for when the user is already logged in */}
                <button name={'login'} className={'bg-[#181818] text-white raleway-normal-400 px-8 py-2 rounded-2xl'} onClick={handleClick}>Log in</button>
            </div>
        </div>
    );
};