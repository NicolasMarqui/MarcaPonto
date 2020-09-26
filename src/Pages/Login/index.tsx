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
                        initialValues={{ cpf: "", password: "" }}
                        onSubmit={(values) => {
                            const { cpf, password } = values;
                            console.log(cpf, password);
                        }}
                        validate={(values) => {
                            const errors: any = {};
                            const { cpf } = values;

                            if (!cpf) {
                                errors.cpf = "Digite seu CPF";
                            } else if (cpf.length < 14) {
                                errors.cpf = "Digite seu CPF completo";
                            }
                            return errors;
                        }}
                    >
                        {({ values, handleChange, handleSubmit, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <label htmlFor="">CPF</label>
                                    <MaskedInput
                                        mask={[
                                            /\d/,
                                            /\d/,
                                            /\d/,
                                            ".",
                                            /\d/,
                                            /\d/,
                                            /\d/,
                                            ".",
                                            /\d/,
                                            /\d/,
                                            /\d/,
                                            "-",
                                            /\d/,
                                            /\d/,
                                        ]}
                                        value={values.cpf}
                                        className={`${
                                            errors.cpf ? "hasError" : ""
                                        }`}
                                        placeholder="___.___.___-__"
                                        onChange={handleChange("cpf")}
                                    />
                                    {errors.cpf ? (
                                        <div className="form__error">
                                            <p>{errors.cpf}</p>
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
                                        onChange={handleChange("password")}
                                    />
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
