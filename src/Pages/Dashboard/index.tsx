import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import NavBarInterna from "../../Components/NavBarInterna";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import MainContext from "../../Contexts/MainContext";
import SideBar from "../../Components/SideBar";
import api from "../../Services/api";
import { USER_INFO } from "../../Services/Endpoints";
import {
    checkIfAdmin,
    checkIfColaborador,
    checkIfGestor,
} from "../../Functions";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";

import Home from "./Home";
import Espelho from "./Espelho";
import Settings from "./Settings";
import Usuarios from "./Usuarios";
import PontoModal from "../../Components/PontoModal";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";
import LoadingMarcaPonto from "../../Components/LoadingMarcaPonto";
import DashSkeleton from "../../Components/Skeletons/Dash";
import SideBarSkeleton from "../../Components/Skeletons/Side";

//Logos
const LOGO = require("../../Assets/images/logo_horizontal.svg");
const JUST_LOGO = require("../../Assets/images/just_logo.png");

interface DashboardProps {
    match: any;
}

const Dashboard: React.FC<DashboardProps> = ({ match }) => {
    const {
        token,
        setCurrentLoggedUserId,
        sideNavOpen,
        setSideNavOpen,
        isModalPontoOpen,
        showNavBarXs,
        setShowNavBarXs,
    } = useContext(MainContext);

    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isGestor, setIsGestor] = useState(false);
    const [isColaborador, setIsColaborador] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(true);

    const { width } = useWindowDimensions();
    let { path } = useRouteMatch();

    useEffect(() => {
        document.title = "Marca Ponto - Dashboard";
        getLoggedUserInfo();
    }, []);

    const getLoggedUserInfo = async () => {
        await api
            .get(USER_INFO, { headers: { Authorization: token } })
            .then((response) => {
                const { username, colaboradorId, perfis } = response.data;

                //Check if is Admin
                setIsAdmin(checkIfAdmin(perfis));

                //Check if is Gestor
                setIsGestor(checkIfGestor(perfis));

                //Check if is Colaborador
                setIsColaborador(checkIfColaborador(perfis));

                //Save ID to localStorage
                setCurrentLoggedUserId(colaboradorId);

                setLoggedUserInfo({ username, colaboradorId, perfis });
                setIsLoadingInfo(false);
                setIsLoadingAll(false);
            });
    };

    // TODO -> Criar logo em versão white

    return (
        <div className="dashboard__wrapper">
            {!isLoadingAll ? (
                <div className="dashboard__content">
                    <div
                        className={`content__sidebar ${
                            !sideNavOpen ? "side__closed" : ""
                        } ${showNavBarXs ? "side__full__xxs" : ""}`}
                    >
                        <div className="sidebar__logo">
                            <img
                                src={
                                    width < 992 || !sideNavOpen
                                        ? JUST_LOGO
                                        : LOGO
                                }
                                alt="Marca Ponto"
                                className={width < 992 ? "img__smaller" : ""}
                            />
                        </div>

                        <div
                            className={`sidebar__menu ${
                                !sideNavOpen ? "side__closed" : ""
                            }`}
                        >
                            <div
                                className="menu__toggle"
                                onClick={() => setSideNavOpen(!sideNavOpen)}
                            >
                                {!sideNavOpen ? (
                                    <BsChevronDoubleRight
                                        color="#fff"
                                        size={25}
                                    />
                                ) : (
                                    <BsChevronDoubleLeft
                                        color="#fff"
                                        size={25}
                                    />
                                )}
                            </div>
                            {isLoadingInfo ? (
                                <div className="skel__wrapper">
                                    <SideBarSkeleton />
                                </div>
                            ) : (
                                <SideBar type={loggedUserInfo} />
                            )}
                        </div>
                    </div>

                    <div
                        className={`content__main ${
                            !sideNavOpen ? "side__closed" : ""
                        }`}
                    >
                        <NavBarInterna data={loggedUserInfo} />

                        <div
                            className="open__side__xxs"
                            onClick={() => setShowNavBarXs(true)}
                        >
                            <BiMenuAltLeft size={30} />
                        </div>

                        {showNavBarXs && (
                            <div
                                className="close__side__xxs"
                                onClick={() => setShowNavBarXs(false)}
                            >
                                <IoMdCloseCircle size={30} />
                            </div>
                        )}

                        {isModalPontoOpen && <PontoModal />}

                        {isLoadingInfo ? (
                            <div className="skel__wrapper">
                                <DashSkeleton />
                            </div>
                        ) : (
                            <>
                                <Switch>
                                    <Route
                                        path={path}
                                        exact
                                        render={(props) => (
                                            <Home
                                                data={loggedUserInfo}
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Route
                                        path={`${path}/settings`}
                                        component={Settings}
                                        exact
                                    />
                                    {isGestor ||
                                        (isColaborador && (
                                            <Route
                                                path={`${path}/espelho`}
                                                component={Espelho}
                                                exact
                                            />
                                        ))}

                                    {(isAdmin || isGestor) && (
                                        <Route
                                            path={`${path}/usuarios`}
                                            component={Usuarios}
                                            exact
                                        />
                                    )}
                                </Switch>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <LoadingMarcaPonto />
            )}
        </div>
    );
};
export default Dashboard;
