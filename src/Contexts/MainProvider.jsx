import React from "react";
import MainContext from "./MainContext";
import useStorage from "../Utils/useStorage";

const MainProvider = ({ children }) => {
    const [token, setToken, removeToken] = useStorage("token");
    const [
        currentLoggedUserId,
        setCurrentLoggedUserId,
        removeCurrentLoggedUserId,
    ] = useStorage("colId");

    return (
        <MainContext.Provider
            value={{
                token,
                setToken,
                removeToken,
                currentLoggedUserId,
                setCurrentLoggedUserId,
                removeCurrentLoggedUserId,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export default MainProvider;
