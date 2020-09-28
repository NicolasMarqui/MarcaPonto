import React from "react";
import MainContext from "./MainContext";
import useStorage from "../Utils/useStorage";

const MainProvider = ({ children }) => {
    const [token, setToken, removeToken] = useStorage("token");

    return (
        <MainContext.Provider value={{ token, setToken, removeToken }}>
            {children}
        </MainContext.Provider>
    );
};

export default MainProvider;
