import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import ModalCrud from "../../../Components/ModalCrud";
import { ColumsTableUser } from "../../../Services/TableColumns";
import { getAllColaboradores } from "../../../Services/ApiCalls";
import MainContext from "../../../Contexts/MainContext";
import SelectedColaborador from "../../../Components/RenderSelectedRow/SelectedColaborador";

const LOADING_CLOCK = require("../../../Assets/animations/loading-clock.json");
const LOADING = require("../../../Assets/animations/loading.json");
const SUCCESS = require("../../../Assets/animations/success.json");

const Usuarios: React.FC = () => {
    const { token, openMoreInfo, setOpenMoreInfo } = useContext(MainContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingNewCadastro, setIsLoadingNewCadastro] = useState(false);
    const [cadastroDone, setcadastroDone] = useState(false);
    const [cadastroSuccess, setCadastroSuccess] = useState(false);
    const [startDate, setStartDate] = useState(new Date(92, 4));
    const [modalOpen, setModalOpen] = useState(false);
    const [allColaboradores, setAllColaboradores] = useState([]);
    const [selectedColaborador, setSelectedColaborador] = useState({});

    useEffect(() => {
        setOpenMoreInfo(false);
        getAllC();
    }, []);

    const getAllC = async () => {
        setIsLoading(true);
        const response = await getAllColaboradores(token);

        if (response) {
            const { status, data } = response;

            if (status === 200 && data.length > 0) {
                setAllColaboradores(data);
                setIsLoading(false);
            }
        }
    };

    const formValues = {
        nomeCompleto: "",
        email: "",
        dataNascimento: "",
    };

    const closeModal = () => {
        setModalOpen(false);
        return true;
    };

    const closeModalMoreInfo = () => {
        setOpenMoreInfo(false);
        return true;
    };

    // const handleRowChange = (state: any) => {
    //     console.log("Selected Rows: ", state.selectedRows);
    // };

    const showMoreInfo = async (dataFromRow: any) => {
        setOpenMoreInfo(true);
        setSelectedColaborador(dataFromRow);
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
                            data={allColaboradores}
                            columns={ColumsTableUser}
                            striped={true}
                            pagination={true}
                            onRowClicked={showMoreInfo}
                            pointerOnHover={true}
                            highlightOnHover={true}
                        />
                    </div>
                ) : (
                    <div className="animation__wrapper">
                        <Lottie
                            options={{
                                loop: true,
                                animationData: LOADING,
                            }}
                            height={150}
                            width={150}
                        />
                        <h2>
                            Estamos carregando seus dados{" "}
                            <span role="img" aria-label="Whoops">
                                🧐
                            </span>{" "}
                        </h2>
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

            {openMoreInfo && (
                <ModalCrud onClose={closeModalMoreInfo}>
                    {selectedColaborador ? (
                        <SelectedColaborador data={selectedColaborador} />
                    ) : (
                        ""
                    )}
                </ModalCrud>
            )}
        </>
    );
};
export default Usuarios;
