import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import NavBarInterna from "../../Components/NavBarInterna";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import MainContext from "../../Contexts/MainContext";
import Lottie from "react-lottie";
import Settings from "./Settings";
import Home from "./Home";
import Espelho from "./Espelho";
import SideBar from "../../Components/SideBar";
import api from "../../Services/api";
import { USER_INFO } from "../../Services/Endpoints";

const LOGO = require("../../Assets/images/logo_horizontal.svg");
const JUST_LOGO = require("../../Assets/images/just_logo.png");

const LOADING_CLOCK = require("../../Assets/animations/loading-clock.json");

interface DashboardProps {
    match: any;
}

const Dashboard: React.FC<DashboardProps> = ({ match }) => {
    const { token } = useContext(MainContext);
    const [loggedUserInfo, setLoggedUserInfo] = useState({});
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);

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
                console.log(username, colaboradorId, perfis);
                setLoggedUserInfo({ username, colaboradorId, perfis });
                setIsLoadingInfo(false);
            });
    };

    // TODO -> Criar logo em versão white

    return (
        <Switch>
            <div className="dashboard__wrapper">
                <div className="dashboard__content">
                    <div className="content__sidebar">
                        <div className="sidebar__logo">
                            <img
                                src={width < 992 ? JUST_LOGO : LOGO}
                                alt="Marca Ponto"
                                className={width < 992 ? "img__smaller" : ""}
                            />
                        </div>

                        <div className="sidebar__menu">
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
                                <SideBar type="USER" />
                            )}
                        </div>
                    </div>

                    <div className="content__main">
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
                                <Route path={path} component={Home} exact />
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Switch>
    );
};
export default Dashboard;
