import React, { useContext } from "react";
import "./styles.scss";
import MainContext from "../../Contexts/MainContext";

import { Link } from "react-router-dom";
import { getCurrentFlag, showToast } from "../../Functions";
import { BiChevronDown } from "react-icons/bi";
import { AllLanguages } from "../../Services/AllLanguages";

const LOGO = require("../../Assets/images/just_logo.png");

const NavBar: React.FC = () => {
    const { token, browserLanguage, setBrowserLanguage } = useContext(
        MainContext
    );

    const changeBrowserLanguage = (value: string, title: string) => {
        let toastSuccessMessage = `Idioma alterado para ${title}`;

        showToast("SUCCESS", toastSuccessMessage, {});
        setBrowserLanguage(value);
    };

    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header__logo">
                        <h1>
                            <Link to="/">
                                <img src={LOGO} alt="Marca Ponto" />
                            </Link>
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
                                <li>
                                    <div className="opcoes__language">
                                        <div className="lang__current">
                                            <img
                                                src={`https://www.countryflags.io/${getCurrentFlag(
                                                    browserLanguage
                                                )}/flat/64.png`}
                                                alt="Portuguese"
                                            />
                                            <BiChevronDown
                                                size={20}
                                                color="#222"
                                            />
                                        </div>
                                        <div className="lang__more-options">
                                            {AllLanguages.filter(
                                                (all) =>
                                                    all.locale !==
                                                    browserLanguage
                                            ).map((lang) => (
                                                <div
                                                    className="mo__wrapper"
                                                    onClick={() =>
                                                        changeBrowserLanguage(
                                                            lang.locale,
                                                            lang.title
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={`https://www.countryflags.io/${lang.flag}/flat/64.png`}
                                                        alt={lang.title}
                                                    />
                                                    <p>{lang.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                                {token ? (
                                    <li className="menu__destaque">
                                        <Link to="/dashboard">Minha Conta</Link>
                                    </li>
                                ) : (
                                    <li className="menu__destaque">
                                        <Link to="/login">Login</Link>
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
