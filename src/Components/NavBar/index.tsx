import React, { useContext, useState, useEffect } from "react";
import "./styles.scss";
import MainContext from "../../Contexts/MainContext";
import { Link } from "react-router-dom";
import { getCurrentFlag, showToast } from "../../Functions";
import { BiChevronDown } from "react-icons/bi";
import { AllLanguages } from "../../Services/AllLanguages";
import { AiOutlineMenu, AiFillCloseCircle } from "react-icons/ai";

const LOGO = require("../../Assets/images/just_logo.png");

const NavBar: React.FC = () => {
    const { token, browserLanguage, setBrowserLanguage } = useContext(
        MainContext
    );

    const [isFixed, setIsFixed] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const fixedNav = () => {
        if (window.pageYOffset > 150) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", fixedNav);
    }, []);

    const changeBrowserLanguage = (value: string, title: string) => {
        let toastSuccessMessage = `Idioma alterado para ${title}`;

        showToast("SUCCESS", toastSuccessMessage, {});
        setBrowserLanguage(value);
    };

    return (
        <>
            <header className={`${isFixed ? "fixed" : ""}`}>
                <div className="container">
                    <div className="header">
                        <div className="header__logo">
                            <h1>
                                <Link to="/">
                                    <img src={LOGO} alt="Marca Ponto" />
                                </Link>
                            </h1>
                        </div>

                        <div className="header__menu hidden-xs hidden-sm">
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
                                                <p>
                                                    Faça o login para acessar!
                                                </p>
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
                                            <Link to="/dashboard">
                                                Minha Conta
                                            </Link>
                                        </li>
                                    ) : (
                                        <li className="menu__destaque">
                                            <Link to="/login">Login</Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>

                        <div className="visible-xs visible-sm hidden-md hidden-lg">
                            <div className="header__mobile">
                                <AiOutlineMenu
                                    size={35}
                                    onClick={() =>
                                        setIsMobileNavOpen(!isMobileNavOpen)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {isMobileNavOpen && (
                <div className="mobile__container-open">
                    <div className="mobile__nav-close">
                        <AiFillCloseCircle
                            size={70}
                            color="#fff"
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        />
                    </div>

                    <div className="container__content">
                        <img
                            src={LOGO}
                            alt="Marca Ponto"
                            className="mobile__logo"
                        />
                        <h2 className="tt-title title-bold title-blue">
                            MarcaPonto
                        </h2>

                        <hr />

                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard"
                                    className={!token ? "nav__not-logged" : ""}
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
                                    <Link to="/dashboard">Minha Conta</Link>
                                </li>
                            ) : (
                                <li className="menu__destaque">
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                            <li>
                                <div className="mobile__lang">
                                    <div className="lang__all">
                                        {AllLanguages.map((lang) => (
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
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};
export default NavBar;
