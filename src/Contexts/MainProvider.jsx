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
    const [openMoreInfo, setOpenMoreInfo] = useStorage("openMoreInfoModal");
    const [addModalOpen, setaddModalOpen] = useStorage("openAddModal");
    const [
        hasCloseEditModal,
        sethasCloseEditModal,
        removehasCloseEditModal,
    ] = useStorage("closedModal");
    const [userLocalization, setUserLocalization] = useStorage("local");

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
                hasCloseEditModal,
                sethasCloseEditModal,
                removehasCloseEditModal,
                addModalOpen,
                setaddModalOpen,
                userLocalization,
                setUserLocalization
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export default MainProvider;
