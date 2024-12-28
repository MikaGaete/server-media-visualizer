import {ChangeEvent} from "react";

export type CustomInputProps = {
    type: string,
    name: string,
    value: string,
    label: string,
    placeholder?: string,
    styles?: string,
    error?: string,
    touched?: boolean,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    handleBlur: (event: ChangeEvent<HTMLInputElement>) => void,
    hidden?: boolean,
}