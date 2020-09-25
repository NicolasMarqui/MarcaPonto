import React from "react";
import "./styles.scss";

import { Link } from "react-router-dom";

const LOGO = require("../../Assets/images/logo_horizontal.svg");

const NavBar: React.FC = () => {
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
                                    <Link to="/dashboard">Ponto</Link>
                                </li>
                                <li className="menu__destaque">
                                    <Link to="/">Login</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default NavBar;
