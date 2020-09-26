import React from "react";
import "./styles.scss";
import { Formik } from "formik";
import MaskedInput from "react-text-mask";

import NavBar from "../../Components/NavBar";

const LOGO_VERTICAL = require("../../Assets/images/logo_vertical.png");

const Login: React.FC = () => {
    return (
        <div className="login__wrapper">
            <NavBar />
            <div className="login__form">
                <img
                    src={LOGO_VERTICAL}
                    alt="Marca Ponto"
                    className="form__logo"
                />

                <div className="form__inputs">
                    <Formik
                        initialValues={{ emailOrUsername: "", password: "" }}
                        onSubmit={(values) => {
                            const { emailOrUsername, password } = values;
                            console.log(emailOrUsername, password);
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
                        {({ values, handleChange, handleSubmit, errors }) => (
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
                                            errors.password ? "hasError" : ""
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
            </div>
            <div className="login__ball">
                <div className="ball ball__black"></div>
                <div className="ball ball__red"></div>
            </div>
        </div>
    );
};
export default Login;
