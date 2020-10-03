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
    const [sideNavOpen, setSideNavOpen] = useStorage("sidebarOpen");

    return (
        <MainContext.Provider
            value={{
                token,
                setToken,
                removeToken,
                currentLoggedUserId,
                setCurrentLoggedUserId,
                removeCurrentLoggedUserId,
                sideNavOpen,
                setSideNavOpen,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export default MainProvider;
