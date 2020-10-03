import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import NavBarInterna from "../../Components/NavBarInterna";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import MainContext from "../../Contexts/MainContext";
import Lottie from "react-lottie";
import SideBar from "../../Components/SideBar";
import api from "../../Services/api";
import { USER_INFO } from "../../Services/Endpoints";
import { checkIfAdmin } from "../../Functions";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";

import Home from "./Home";
import Espelho from "./Espelho";
import Settings from "./Settings";
import Usuarios from "./Usuarios";

//Logos
const LOGO = require("../../Assets/images/logo_horizontal.svg");
const JUST_LOGO = require("../../Assets/images/just_logo.png");

//Animation
const LOADING_CLOCK = require("../../Assets/animations/loading-clock.json");

interface DashboardProps {
    match: any;
}

const Dashboard: React.FC<DashboardProps> = ({ match }) => {
    const {
        token,
        setCurrentLoggedUserId,
        sideNavOpen,
        setSideNavOpen,
    } = useContext(MainContext);

    const [loggedUserInfo, setLoggedUserInfo] = useState({
        perfis: ["ADMIN"],
    });
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);

    const { width } = useWindowDimensions();
    let { path } = useRouteMatch();

    useEffect(() => {
        document.title = "Marca Ponto - Dashboard";
        // getLoggedUserInfo();
    }, []);

    const getLoggedUserInfo = async () => {
        await api
            .get(USER_INFO, { headers: { Authorization: token } })
            .then((response) => {
                const { username, colaboradorId, perfis } = response.data;

                //Check if is Admin
                setIsAdmin(checkIfAdmin(perfis));

                //Save ID to localStorage
                setCurrentLoggedUserId(colaboradorId);

                // setLoggedUserInfo({ username, colaboradorId, perfis });
                setIsLoadingInfo(false);
            });
    };

    // TODO -> Criar logo em versão white

    return (
        <div className="dashboard__wrapper">
            <div className="dashboard__content">
                <div
                    className={`content__sidebar ${
                        !sideNavOpen ? "side__closed" : ""
                    }`}
                >
                    <div className="sidebar__logo">
                        <img
                            src={width < 992 || !sideNavOpen ? JUST_LOGO : LOGO}
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
                                <BsChevronDoubleRight color="#fff" size={25} />
                            ) : (
                                <BsChevronDoubleLeft color="#fff" size={25} />
                            )}
                        </div>
                        {isLoadingInfo ? (
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: LOADING_CLOCK,
                                }}
                                height={150}
                                width={150}
                            />
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

                    {isLoadingInfo ? (
                        <Lottie
                            options={{
                                loop: true,
                                animationData: LOADING_CLOCK,
                            }}
                            height={150}
                            width={150}
                        />
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
                                <Route
                                    path={`${path}/espelho`}
                                    component={Espelho}
                                    exact
                                />

                                {isAdmin && (
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
        </div>
    );
};
export default Dashboard;
