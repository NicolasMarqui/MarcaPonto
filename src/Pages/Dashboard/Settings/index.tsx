import React, { useEffect, useContext, useState } from "react";
import "./styles.scss";
import HeaderInside from "../../../Components/HeaderInside";
import Card from "../../../Components/Card";
import { Formik } from "formik";
import { AllLanguages } from "../../../Services/AllLanguages";
import MainContext from "../../../Contexts/MainContext";
import Lottie from "react-lottie";
import { showToast } from "../../../Functions";

interface SettingsProps {
    data: any;
}

const Settings: React.FC<SettingsProps> = ({ data }) => {
    useEffect(() => {
        document.title = "Marca Ponto - Settings";
    }, []);

    const [curiosoClicou, setCuriosoClicou] = useState(false);

    const CHECK_ANIMATION = require("../../../Assets/animations/check.json");
    const TEAM_ANIMATION = require("../../../Assets/animations/team.json");
    const OMG_WOW_VIDEO = require("../../../Assets/curiosidade/omg_wow_video.ogg");
    const OMG_WOW_AUDIO = require("../../../Assets/curiosidade/omg_wow.mp3");

    const TEAM_MEMBERS = [
        {
            id: 1,
            name: "César Facioli",
        },
        {
            id: 2,
            name: "Erikson Lopes",
        },
        {
            id: 3,
            name: "Heitor Amaral",
        },
        {
            id: 4,
            name: "Juarez Junior",
        },
        {
            id: 5,
            name: "Lucas Amstalden",
        },
        {
            id: 6,
            name: "Nicolas Marqui",
        },
    ];

    const { browserLanguage, setBrowserLanguage } = useContext(MainContext);

    const changeBrowserLanguage = (value: string, title: string) => {
        let toastSuccessMessage = `Idioma alterado para ${title}`;

        showToast("SUCCESS", toastSuccessMessage, {});
        setBrowserLanguage(value);
    };

    return (
        <>
            {curiosoClicou && (
                <div className="aoo__curioso">
                    <video
                        src={OMG_WOW_VIDEO}
                        typeof="video/ogg"
                        autoPlay
                        onEnded={() => setCuriosoClicou(false)}
                    ></video>
                    <audio
                        src={OMG_WOW_AUDIO}
                        autoPlay
                        typeof="audio/mp3"
                    ></audio>
                </div>
            )}
            <div className="usuarios__wrapper">
                <div className="usuarios__header">
                    <HeaderInside isHome={false} nome={"Configurações"} />
                </div>
                <div className="page__title-info">
                    <div className="tinf__name">
                        <h2 className="tt-title title-blue title-bold">
                            Configurações
                        </h2>
                    </div>
                </div>
                <div className="settings__opt">
                    <div className="opt__1">
                        <Card>
                            <h3 className="tt-sub title-blue title-bold">
                                Trocar Senha
                            </h3>
                            <p>Digite a senha antiga</p>
                            <div className="form__inputs">
                                <Formik
                                    initialValues={{
                                        emailOrUsername: "",
                                        password: "",
                                    }}
                                    onSubmit={async (values) => {}}
                                    validate={(values) => {
                                        const errors: any = {};
                                        const {
                                            emailOrUsername,
                                            password,
                                        } = values;

                                        if (!emailOrUsername) {
                                            errors.emailOrUsername =
                                                "Esse campo não pode ser vazio :(";
                                        }

                                        if (!password) {
                                            errors.password =
                                                "Esse campo não pode ser vazio :(";
                                        }
                                        return errors;
                                    }}
                                >
                                    {({
                                        values,
                                        handleChange,
                                        handleSubmit,
                                        errors,
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="form__group">
                                                <label htmlFor="">
                                                    Usuário
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        values.emailOrUsername
                                                    }
                                                    className={`${
                                                        errors.emailOrUsername
                                                            ? "hasError"
                                                            : ""
                                                    }`}
                                                    onChange={handleChange(
                                                        "emailOrUsername"
                                                    )}
                                                />
                                                {errors.emailOrUsername ? (
                                                    <div className="form__error">
                                                        <p>
                                                            {
                                                                errors.emailOrUsername
                                                            }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="form__group">
                                                <label htmlFor="">Senha</label>
                                                <input
                                                    type="password"
                                                    value={values.password}
                                                    className={`${
                                                        errors.password
                                                            ? "hasError"
                                                            : ""
                                                    }`}
                                                    onChange={handleChange(
                                                        "password"
                                                    )}
                                                />
                                                {errors.password ? (
                                                    <div className="form__error">
                                                        <p>{errors.password}</p>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="form__group">
                                                <button
                                                    type="submit"
                                                    className="bt form__login"
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </Card>
                    </div>
                    <div className="opt__2">
                        <Card>
                            <h3 className="tt-sub title-blue title-bold">
                                Linguagem
                            </h3>
                            <p>Selecione o idioma do sistema</p>
                            <div className="opt2__lang">
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
                                        <p>{lang.title}</p>
                                        {lang.locale === browserLanguage ? (
                                            <div className="language__current">
                                                <Lottie
                                                    options={{
                                                        loop: false,
                                                        animationData: CHECK_ANIMATION,
                                                    }}
                                                    height={60}
                                                    width={60}
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <div className="opt__3">
                        <Card>
                            <h3 className="tt-sub title-blue title-bold">
                                Sobre
                            </h3>
                            <p>Desenvolvido para o PI do 6° semestre de ADS</p>
                            <div className="sobre__membros">
                                <ul>
                                    {TEAM_MEMBERS.map((t: any) => (
                                        <li key={t.id}>
                                            <strong>{t.name}</strong>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="sobre__animation">
                                <Lottie
                                    options={{
                                        loop: true,
                                        animationData: TEAM_ANIMATION,
                                    }}
                                    height={200}
                                    width={200}
                                />
                            </div>
                            <p
                                className="nao__clica"
                                onClick={() => setCuriosoClicou(true)}
                            >
                                Não clica
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Settings;
