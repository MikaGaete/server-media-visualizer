import {ReactNode} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {Navigate} from "react-router-dom";

export const Lock = ({children}: {children: ReactNode}) => {
    const {isLogged} = useSelector((state: RootState) => state.auth);

    if (!isLogged) {
        return <Navigate to={'login'} />
    }

    return children
};