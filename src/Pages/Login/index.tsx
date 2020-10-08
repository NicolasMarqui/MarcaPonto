import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import NavBar from "../../Components/NavBar";
import api from "../../Services/api";
import { LOGIN_ENDPOINT } from "../../Services/Endpoints";
import MainContext from "../../Contexts/MainContext";
import { useHistory } from "react-router-dom";
import { showToast } from "../../Functions";
import queryString from "query-string";

const LOGO_VERTICAL = require("../../Assets/images/logo_vertical.png");
const LOADING_CLOCK = require("../../Assets/animations/loading-clock.json");

//TODO: handle 401 error

interface LoginProps {
    location: any;
}

const Login: React.FC<LoginProps> = ({ location }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useContext(MainContext);

    const history = useHistory();

    useEffect(() => {
        const hasStatus = queryString.parse(location.search);

        if (hasStatus && hasStatus.status) {
            showToast("WARNING", hasStatus.status?.toString(), {});
        }
    }, [location.search]);

    return (
        <div className="login__wrapper">
            <NavBar />
            <div className="login__form">
                <img
                    src={LOGO_VERTICAL}
                    alt="Marca Ponto"
                    className="form__logo"
                />

                {!isLoading ? (
                    <div className="form__inputs">
                        <Formik
                            initialValues={{
                                emailOrUsername: "",
                                password: "",
                            }}
                            onSubmit={async (values) => {
                                const { emailOrUsername, password } = values;

                                setIsLoading(true);

                                await api
                                    .post(LOGIN_ENDPOINT, {
                                        username: emailOrUsername,
                                        password,
                                    })
                                    .then((data) => {
                                        console.log(data.status);
                                        const { headers, status } = data;

                                        if (status === 200) {
                                            setToken(headers.authorization);
                                            history.push("/dashboard");
                                        } else {
                                            setIsLoading(false);
                                            showToast(
                                                "ERROR",
                                                "Usuário ou senha incorretos :(",
                                                {}
                                            );
                                        }
                                    })
                                    .catch((err) => {
                                        setIsLoading(false);
                                        history.push(
                                            "/?status=Verifique se as Informações estão corretas 😞"
                                        );
                                        showToast("ERROR", err, {});
                                    });
                            }}
                            validate={(values) => {
                                const errors: any = {};
                                const { emailOrUsername, password } = values;

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
                                        <label htmlFor="">Usuário</label>
                                        <input
                                            type="text"
                                            value={values.emailOrUsername}
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
                                                <p>{errors.emailOrUsername}</p>
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
                                            onChange={handleChange("password")}
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
                ) : (
                    <div className="animation__wrapper">
                        <Lottie
                            options={{
                                loop: true,
                                animationData: LOADING_CLOCK,
                            }}
                            height={150}
                            width={150}
                        />
                        <p>Carregando...</p>
                    </div>
                )}
            </div>
            <div className="login__ball">
                <div className="ball ball__black"></div>
                <div className="ball ball__red"></div>
            </div>
        </div>
    );
};
export default Login;
