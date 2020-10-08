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
    const [isModalPontoOpen, setIsModalPontoOpen] = useStorage("modalPonto");
    const [pontoStatus, setPontoStatus] = useStorage("pontoStatus");
    const [showNavBarXs, setShowNavBarXs] = useStorage("sideNavXXS");
    const [openMoreInfo, setOpenMoreInfo] = useStorage("sidebarOpen");

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
                isModalPontoOpen,
                setIsModalPontoOpen,
                pontoStatus,
                setPontoStatus,
                showNavBarXs,
                setShowNavBarXs,
                openMoreInfo,
                setOpenMoreInfo,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export default MainProvider;
