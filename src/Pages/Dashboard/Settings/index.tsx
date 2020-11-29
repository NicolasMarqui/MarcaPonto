import React, { useEffect, useContext, useState } from "react";
import "./styles.scss";
import HeaderInside from "../../../Components/HeaderInside";
import Card from "../../../Components/Card";
import { Formik } from "formik";
import { AllLanguages } from "../../../Services/AllLanguages";
import MainContext from "../../../Contexts/MainContext";
import Lottie from "react-lottie";
import { showToast } from "../../../Functions";
import { GetAllColaboradores, insertNewLog } from "../../../Services/ApiCalls";
import api from "../../../Services/api";
import { CHANGE_PASSWORD } from "../../../Services/Endpoints";
import { SUCESS } from "../../../Services/Constants";

interface SettingsProps {
    data: any;
}

const Settings: React.FC<SettingsProps> = ({ data }) => {
    useEffect(() => {
        document.title = "Marca Ponto - Settings";
    }, []);

    const [curiosoClicou, setCuriosoClicou] = useState(false);
    const [isLoadingNewSenha, setIsLoadingNewSenha] = useState(false);
    const [newSenhaSuccess, setNewSenhaSuccess] = useState(false);
    const [newSenhaError, setNewSenhaError] = useState(false);
    const [newSenha, setNewSenha] = useState("");

    const CHECK_ANIMATION = require("../../../Assets/animations/check.json");
    const TEAM_ANIMATION = require("../../../Assets/animations/team.json");
    const LOADING = require("../../../Assets/animations/loading.json");
    const SUCCESS = require("../../../Assets/animations/success.json");
    const ERROR = require("../../../Assets/animations/error.json");
    const CONGRATS = require("../../../Assets/animations/congrats.json");
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

    const {
        browserLanguage,
        setBrowserLanguage,
        token,
        currentLoggedUserId,
        notificationCount,
        setNotificationCount,
    } = useContext(MainContext);

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
                                Atualizar Senha
                            </h3>
                            <p>Digite a nova senha</p>
                            <div className="form__inputs">
                                {isLoadingNewSenha ? (
                                    <Lottie
                                        options={{
                                            loop: !newSenhaSuccess
                                                ? true
                                                : false,
                                            animationData:
                                                !newSenhaError &&
                                                !newSenhaSuccess
                                                    ? LOADING
                                                    : newSenhaSuccess
                                                    ? SUCCESS
                                                    : newSenhaError
                                                    ? ERROR
                                                    : LOADING,
                                        }}
                                        height={150}
                                        width={150}
                                    />
                                ) : (
                                    <Formik
                                        initialValues={{
                                            newPassword: newSenha,
                                        }}
                                        onSubmit={async (values) => {
                                            const { newPassword } = values;
                                            setIsLoadingNewSenha(true);

                                            await api
                                                .patch(
                                                    CHANGE_PASSWORD,
                                                    newPassword.toString(),
                                                    {
                                                        headers: {
                                                            Authorization: token,
                                                            "Access-Control-Allow-Origin":
                                                                "*",
                                                            "Content-Type":
                                                                "text/plain",
                                                        },
                                                    }
                                                )
                                                .then((response) => {
                                                    const { status } = response;

                                                    if (status === 200) {
                                                        showToast(
                                                            "SUCCESS",
                                                            "Senha alterada com sucesso 😄",
                                                            {}
                                                        );
                                                        insertNewLog(
                                                            currentLoggedUserId,
                                                            "Senha alterada"
                                                        );
                                                        setNotificationCount(
                                                            notificationCount +
                                                                1
                                                        );

                                                        setNewSenha("");
                                                        setNewSenhaError(false);
                                                        setNewSenhaSuccess(
                                                            true
                                                        );

                                                        window.setTimeout(
                                                            () =>
                                                                setIsLoadingNewSenha(
                                                                    false
                                                                ),
                                                            2000
                                                        );
                                                    }
                                                })
                                                .catch((err) => {
                                                    showToast(
                                                        "ERROR",
                                                        err.response.data
                                                            .message,
                                                        {}
                                                    );

                                                    setNewSenhaSuccess(false);
                                                    setNewSenhaError(true);

                                                    window.setTimeout(
                                                        () =>
                                                            setIsLoadingNewSenha(
                                                                false
                                                            ),
                                                        2000
                                                    );
                                                });
                                        }}
                                        validate={(values) => {
                                            const errors: any = {};
                                            const { newPassword } = values;
                                            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

                                            if (!newPassword) {
                                                errors.newPassword =
                                                    "Esse campo não pode ser vazio :(";
                                            }

                                            if (newPassword.length < 10) {
                                                errors.newPassword =
                                                    "Pelo menos 10 dígitos";
                                            }

                                            if (!format.test(newPassword)) {
                                                errors.newPassword =
                                                    "No mínimo 1 caractere especial";
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
                                                        Senha
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={
                                                            values.newPassword
                                                        }
                                                        className={`${
                                                            errors.newPassword
                                                                ? "hasError"
                                                                : ""
                                                        }`}
                                                        onChange={handleChange(
                                                            "newPassword"
                                                        )}
                                                    />
                                                    {errors.newPassword ? (
                                                        <div className="form__error">
                                                            <p>
                                                                {
                                                                    errors.newPassword
                                                                }
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="form__group">
                                                    <button
                                                        type="submit"
                                                        className={`bt form__login ${
                                                            errors.newPassword
                                                                ? "hasError"
                                                                : ""
                                                        }`}
                                                    >
                                                        Atualizar
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                )}
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
