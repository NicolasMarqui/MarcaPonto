import React, { useContext } from "react";
import "./styles.scss";
import MainContext from "../../Contexts/MainContext";

import { Link } from "react-router-dom";

const LOGO = require("../../Assets/images/logo_horizontal.svg");

const NavBar: React.FC = () => {
    const { token } = useContext(MainContext);

    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header__logo">
                        <h1>
                            <img src={LOGO} alt="Marca Ponto" />
                        </h1>
                    </div>

                    <div className="header__menu">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className={
                                            !token ? "nav__not-logged" : ""
                                        }
                                    >
                                        Ponto
                                    </Link>
                                    {!token ? (
                                        <div className="popup__nav">
                                            <p>Faça o login para acessar!</p>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </li>
                                {token ? (
                                    <li className="menu__destaque">
                                        <Link to="/dashboard/settings">
                                            Minha Conta
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="menu__destaque">
                                        <Link to="/">Login</Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default NavBar;
