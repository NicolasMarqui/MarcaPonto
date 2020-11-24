import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import NavBar from "../../Components/NavBar";
import api from "../../Services/api";
import { MdError } from "react-icons/md";
import { LOGIN_ENDPOINT } from "../../Services/Endpoints";
import MainContext from "../../Contexts/MainContext";
import { useHistory } from "react-router-dom";
import { showToast } from "../../Functions";
import ModalCrud from "../../Components/ModalCrud";

const LOGO_VERTICAL = require("../../Assets/images/logo_vertical.png");
const LOADING_CLOCK = require("../../Assets/animations/loading-clock.json");

//TODO: handle 401 error

interface LoginProps {
    location: any;
}

const Login: React.FC<LoginProps> = ({ location }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalSenhaAberto, setIsModalSenhaAberto] = useState(false);
    const { setToken, token } = useContext(MainContext);

    const history = useHistory();

    useEffect(() => {
        //Check if user is already Logged
        if (token) {
            history.push("/dashboard");
        }
    }, []);

    const handleCloseModal = () => {
        setIsModalSenhaAberto(false);
        return true;
    };

    return (
        <>
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
                                    const {
                                        emailOrUsername,
                                        password,
                                    } = values;

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
                                            showToast(
                                                "ERROR",
                                                err.response.data.message,
                                                {}
                                            );
                                        });
                                }}
                                validate={(values) => {
                                    const errors: any = {};
                                    const {
                                        emailOrUsername,
                                        password,
                                    } = values;

                                    if (!emailOrUsername) {
                                        errors.emailOrUsername =
                                            "Digite um e-mail";
                                    }

                                    if (!password) {
                                        errors.password = "Digite uma senha";
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
                                        <div className="form__group bigger__margin">
                                            <label
                                                htmlFor=""
                                                className="label__input"
                                            >
                                                Usuário
                                            </label>
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
                                                <>
                                                    <div className="form__error">
                                                        <p>
                                                            {
                                                                errors.emailOrUsername
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="error__icon">
                                                        <MdError
                                                            size={20}
                                                            color="red"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="form__group bigger__margin">
                                            <label
                                                htmlFor=""
                                                className="label__input"
                                            >
                                                Senha
                                            </label>
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
                                                <>
                                                    <div className="form__error">
                                                        <p>{errors.password}</p>
                                                    </div>
                                                    <div className="error__icon">
                                                        <MdError
                                                            size={20}
                                                            color="red"
                                                        />
                                                    </div>
                                                </>
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
                                        <div className="no__password">
                                            <p
                                                onClick={() =>
                                                    setIsModalSenhaAberto(true)
                                                }
                                            >
                                                Esqueci minha senha
                                            </p>
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
            {isModalSenhaAberto && (
                <ModalCrud onClose={handleCloseModal}>
                    <div className="modalSenha__wrapper">
                        <div className="modalSenha__content">
                            <h3 className="tt-sub title-blue title-bold">
                                Problemas com a senha
                            </h3>
                            <ul>
                                <li>
                                    <p>
                                        Verifique se seu superior cadastrou seu
                                        e-mail.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Verifique se a senha foi enviada para
                                        seu e-mail.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Caso tenha trocado de senha, entre em
                                        contato com o seu gestor.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ModalCrud>
            )}
        </>
    );
};
export default Login;
