import React, { useState } from "react";
import "./styles.scss";
import CustomTabBar from "../../../Components/CustomTabBar";
import { TabPanel } from "react-tabs";
import { Formik } from "formik";
import Lottie from "react-lottie";
import MaskedInput from "react-text-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LOADING_CLOCK = require("../../../Assets/animations/loading-clock.json");

const Usuarios: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const formValues = {
        nomeCompleto: "",
        email: "",
        apelido: "",
        rg: "",
        cpf: "",
        dataNascimento: "",
    };

    return (
        <div className="usuarios__wrapper">
            <CustomTabBar>
                <TabPanel>
                    {!isLoading ? (
                        <div className="form__inputs">
                            <Formik
                                initialValues={formValues}
                                onSubmit={async (values) => {
                                    const {
                                        nomeCompleto,
                                        email,
                                        apelido,
                                        rg,
                                        cpf,
                                        dataNascimento,
                                    } = values;

                                    setIsLoading(true);
                                }}
                                validate={(values) => {
                                    const errors: any = {};

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
                                        <div className="form__group not__centered">
                                            <label htmlFor="">
                                                Nome Completo
                                            </label>
                                            <input
                                                type="text"
                                                value={values.nomeCompleto}
                                                className={`${
                                                    errors.nomeCompleto
                                                        ? "hasError"
                                                        : ""
                                                }`}
                                                onChange={handleChange(
                                                    "nomeCompleto"
                                                )}
                                            />
                                            {errors.nomeCompleto ? (
                                                <div className="form__error">
                                                    <p>{errors.nomeCompleto}</p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="form__group not__centered">
                                            <label htmlFor="">E-mail</label>
                                            <input
                                                type="email"
                                                value={values.email}
                                                className={`${
                                                    errors.email
                                                        ? "hasError"
                                                        : ""
                                                }`}
                                                onChange={handleChange("email")}
                                            />
                                            {errors.email ? (
                                                <div className="form__error">
                                                    <p>{errors.email}</p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="form__group not__centered">
                                            <label htmlFor="">Apelido</label>
                                            <input
                                                type="text"
                                                value={values.apelido}
                                                className={`${
                                                    errors.apelido
                                                        ? "hasError"
                                                        : ""
                                                }`}
                                                onChange={handleChange(
                                                    "apelido"
                                                )}
                                            />
                                            {errors.apelido ? (
                                                <div className="form__error">
                                                    <p>{errors.apelido}</p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="form__group not__centered">
                                            <label htmlFor="">
                                                Data de Nascimento
                                            </label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date: any) =>
                                                    setStartDate(date)
                                                }
                                            />
                                        </div>
                                        <div className="form__group not__centered">
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
                </TabPanel>
                <TabPanel>Consultar campos</TabPanel>
            </CustomTabBar>
        </div>
    );
};
export default Usuarios;
