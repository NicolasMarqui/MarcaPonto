import React, { useEffect } from "react";
import "./styles.scss";
import NavBarInterna from "../../Components/NavBarInterna";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { FaHome, FaCog } from "react-icons/fa";
import useWindowDimensions from "../../Hooks/useWindowDimensions";

import Settings from "./Settings";
import Home from "./Home";
import MenuLink from "../../Components/MenuLink";

const tipo = "comum";
const LOGO = require("../../Assets/images/logo_horizontal.svg");
const JUST_LOGO = require("../../Assets/images/just_logo.png");

interface DashboardProps {
    match: any;
}

const Dashboard: React.FC<DashboardProps> = () => {
    const { width } = useWindowDimensions();
    let { path } = useRouteMatch();

    useEffect(() => {
        document.title = "Marca Ponto - Dashboard";
    }, []);

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
                            <ul>
                                <li>
                                    <MenuLink
                                        icon={
                                            <FaHome color="white" size={24} />
                                        }
                                        text="Home"
                                        from="dashboard"
                                        link="/"
                                    />
                                </li>
                                <li>
                                    <MenuLink
                                        icon={<FaCog color="white" size={24} />}
                                        text="Configurações"
                                        from="dashboard"
                                        link="/settings"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="content__main">
                        <NavBarInterna />

                        <Route path={path} component={Home} exact />
                        <Route
                            path={`${path}/settings`}
                            component={Settings}
                            exact
                        />
                    </div>
                </div>
            </div>
        </Switch>
    );
};
export default Dashboard;
