import {MouseEventHandler} from "react";

export type CustomButtonProps = {
    type?: 'submit' | 'button' | 'reset',
    text: string,
    name?: string,
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    hidden?: boolean,
}