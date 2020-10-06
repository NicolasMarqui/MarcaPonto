import React, { useState } from "react";
import "./styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import ModalCrud from "../../../Components/ModalCrud";
import { ColumsTableUser } from "../../../Services/TableColumns";
import { UsuariosData } from "../../../Services/MockData";

const LOADING_CLOCK = require("../../../Assets/animations/loading-clock.json");
const LOADING = require("../../../Assets/animations/loading.json");
const SUCCESS = require("../../../Assets/animations/success.json");

const Usuarios: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingNewCadastro, setIsLoadingNewCadastro] = useState(false);
    const [cadastroDone, setcadastroDone] = useState(false);
    const [cadastroSuccess, setCadastroSuccess] = useState(false);
    const [startDate, setStartDate] = useState(new Date(92, 4));
    const [modalOpen, setModalOpen] = useState(false);

    const formValues = {
        nomeCompleto: "",
        email: "",
        dataNascimento: "",
    };

    const closeModal = () => {
        setModalOpen(false);
        return true;
    };

    return (
        <>
            <div className="usuarios__wrapper">
                {!isLoading ? (
                    <div className="table__wrapper">
                        <div className="usuarios__header">
                            <a
                                href="#new"
                                className="bt"
                                onClick={() => setModalOpen(true)}
                            >
                                + Novo Usuário
                            </a>
                        </div>
                        <DataTable
                            title="Todos os Usuários"
                            data={UsuariosData}
                            columns={ColumsTableUser}
                            striped={true}
                            pagination={true}
                        />
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

            {modalOpen && (
                <ModalCrud onClose={closeModal}>
                    {!isLoadingNewCadastro ? (
                        <Formik
                            initialValues={formValues}
                            onSubmit={async (values) => {
                                const { nomeCompleto, email } = values;

                                console.log(nomeCompleto, email, startDate);

                                setIsLoadingNewCadastro(true);

                                await window.setInterval(() => {
                                    setcadastroDone(true);
                                    setCadastroSuccess(true);
                                }, 2000);
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
                                        <label htmlFor="">Nome Completo</label>
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
                                                errors.email ? "hasError" : ""
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
                                        <label htmlFor="">
                                            Data de Nascimento
                                        </label>
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
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
                                            Cadastrar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    ) : (
                        <Lottie
                            options={{
                                loop: cadastroDone ? false : true,
                                animationData: !cadastroDone
                                    ? LOADING
                                    : cadastroSuccess
                                    ? SUCCESS
                                    : LOADING_CLOCK,
                            }}
                            height={150}
                            width={150}
                        />
                    )}
                </ModalCrud>
            )}
        </>
    );
};
export default Usuarios;
