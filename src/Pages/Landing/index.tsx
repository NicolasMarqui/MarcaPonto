import React, { useContext } from "react";
import "./styles.scss";
import NavBar from "../../Components/NavBar";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AllLanguages } from "../../Services/AllLanguages";
import { showToast } from "../../Functions";
import MainContext from "../../Contexts/MainContext";
import ScrollAnimation from "react-animate-on-scroll";

const Landing: React.FC = () => {
    const { setBrowserLanguage } = useContext(MainContext);

    const HERO_IMAGE = require("../../Assets/images/Banner.png");
    const PORTABILIT_IMAGE = require("../../Assets/images/portabilit.png");
    const IMAGE_1_SECTION = require("../../Assets/images/dashboard.jpg");
    const IMAGE_2_SECTION = require("../../Assets/images/relatorio.jpg");
    const IMAGE_3_SECTION = require("../../Assets/images/horarios.jpg");
    const APP_IMAGE = require("../../Assets/images/app.jpg");
    const GOOGLE_APP_IMAGE = require("../../Assets/images/google-play.png");
    const APPLE_APP_IMAGE = require("../../Assets/images/app-store.png");

    const changeBrowserLanguage = (value: string, title: string) => {
        let toastSuccessMessage = `Idioma alterado para ${title}`;

        showToast("SUCCESS", toastSuccessMessage, {});
        setBrowserLanguage(value);
    };

    return (
        <div className="landing__wrapper">
            <NavBar />

            <div className="landing__hero">
                <div className="container">
                    <ScrollAnimation animateIn="bounceInLeft">
                        <div className="hero__info">
                            <h2 className="tt-title title-bold">
                                Controle de Ponto Online
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>

                            <div className="info__contact">
                                <input type="email" placeholder="Seu E-mail" />
                                <a href="_" className="bt">
                                    Saiba mais
                                </a>
                            </div>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation animateIn="bounceInRight">
                        <div className="hero__image">
                            <img src={HERO_IMAGE} alt="MarcaPonto" />
                        </div>
                    </ScrollAnimation>
                </div>
            </div>

            <div className="landing__section-rapido">
                <div className="section">
                    <div className="container">
                        <h2 className="tt-title title-bold title-center title-blue">
                            Rápido e de fácil uso.
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>

                        <div className="rapido__screens">
                            <div className="screen screen_1">
                                <ScrollAnimation
                                    animateIn="fadeIn"
                                    animateOut="fadeOut"
                                >
                                    <img
                                        src={IMAGE_3_SECTION}
                                        alt="MarcaPonto"
                                    />
                                </ScrollAnimation>
                            </div>
                            <div className="screen screen_2 highlight">
                                <ScrollAnimation
                                    animateIn="fadeIn"
                                    animateOut="fadeOut"
                                >
                                    <img
                                        src={IMAGE_1_SECTION}
                                        alt="MarcaPonto"
                                    />
                                </ScrollAnimation>
                            </div>
                            <div className="screen screen_3">
                                <ScrollAnimation
                                    animateIn="fadeIn"
                                    animateOut="fadeOut"
                                >
                                    <img
                                        src={IMAGE_2_SECTION}
                                        alt="MarcaPonto"
                                    />
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="landing__funciona">
                <div className="section">
                    <div className="container">
                        <h2 className="tt-title title-bold title-blue title-center">
                            Como funciona
                        </h2>

                        <ul className="funciona__list">
                            <li>
                                <ScrollAnimation animateIn="fadeIn">
                                    <div className="list__item">
                                        <div className="item__number">
                                            <p>1.</p>
                                        </div>
                                        <div className="item__desc">
                                            <p>Contrate nossos serviços</p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </li>
                            <li className="no-flex hidden-xs hidden-sm">
                                <div className="list__arrow">
                                    <BsArrowRight size={30} color="#C6C6C6" />
                                </div>
                            </li>
                            <li>
                                <ScrollAnimation animateIn="fadeIn" delay={500}>
                                    <div className="list__item">
                                        <div className="item__number">
                                            <p>2.</p>
                                        </div>
                                        <div className="item__desc">
                                            <p>
                                                Faça o cadastro de usuários e
                                                afins
                                            </p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </li>
                            <li className="no-flex hidden-xs hidden-sm">
                                <div className="list__arrow">
                                    <BsArrowRight size={30} color="#C6C6C6" />
                                </div>
                            </li>
                            <li>
                                <ScrollAnimation
                                    animateIn="fadeIn"
                                    delay={1000}
                                >
                                    <div className="list__item">
                                        <div className="item__number">
                                            <p>3.</p>
                                        </div>
                                        <div className="item__desc">
                                            <p>Aproveite nosso sistema</p>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="landing__price">
                <div className="section">
                    <div className="container">
                        <h2 className="tt-title title-bold title-blue title-center">
                            Nossos preços
                        </h2>
                    </div>
                </div>
            </div>

            <div className="landing__app">
                <div className="section">
                    <div className="container">
                        <div className="app__wrapper">
                            <div className="app__image">
                                <ScrollAnimation
                                    animateIn="bounceInRight"
                                    delay={300}
                                >
                                    <img src={APP_IMAGE} alt="App MarcaPonto" />
                                </ScrollAnimation>
                            </div>

                            <div className="app__desc">
                                <h2 className="tt-title title-bold title-blue">
                                    Em qualquer lugar
                                </h2>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </p>

                                <div className="desc__badges">
                                    <ScrollAnimation animateIn="fadeIn">
                                        <img
                                            src={GOOGLE_APP_IMAGE}
                                            alt="Google Play"
                                        />
                                    </ScrollAnimation>
                                    <ScrollAnimation animateIn="fadeIn">
                                        <img
                                            src={APPLE_APP_IMAGE}
                                            alt="App Store"
                                        />
                                    </ScrollAnimation>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="landing__footer">
                    <div className="section">
                        <div className="container">
                            <div className="footer__section-1">
                                <h2 className="tt-title title-bold title-blue">
                                    MarcaPonto
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ut dicta accusamus
                                    voluptatibus quaerat. Temporibus harum,
                                    ducimus repellendus quis.
                                </p>

                                <div className="footer__badges">
                                    <img
                                        src={APPLE_APP_IMAGE}
                                        alt="App Store"
                                    />
                                    <img
                                        src={GOOGLE_APP_IMAGE}
                                        alt="Google Play"
                                    />
                                </div>
                            </div>

                            <div className="footer__section-2">
                                <h3 className="tt-sub title-blue title-blue title-bold">
                                    Links úteis
                                </h3>

                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">Minha conta</Link>
                                    </li>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/contato">Contato</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="footer__portabilit">
                                <img src={PORTABILIT_IMAGE} alt="Portabilit" />
                            </div>

                            <div className="footer__section-3">
                                <h3 className="tt-sub title-blue title-blue title-bold">
                                    Configurações
                                </h3>

                                <div className="section-3__lang">
                                    <ul>
                                        {AllLanguages.map((lang) => (
                                            <li
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
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="footer__copy">
                            <p>&copy; Copyright 2020 - PortabilIT</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Landing;
