import React, { useEffect, useState, useContext } from "react";
import "../../styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import MainContext from "../../../../Contexts/MainContext";
import { getAllExpediente } from "../../../../Services/ApiCalls";
import { showToast } from "../../../../Functions";
import { ERROR } from "../../../../Services/Constants";
import api from "../../../../Services/api";
import { ALL_SETOR, INSERT_SETOR } from "../../../../Services/Endpoints";

//Animations
const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");

const AddSelectedSetor: React.FC = () => {
    const {
        token,
        setaddModalOpen,
        sethasCloseEditModal,
        removehasCloseEditModal,
    } = useContext(MainContext);

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [adicionadoSuccess, setAdicionadoSuccess] = useState(false);
    const [adicionadoError, setAdicionadoError] = useState(false);
    const [isAtivo, setIsAtivo] = useState(false);

    //States Setores
    const [isLoadingAllSetores, setIsLoadingAllSetores] = useState(false);
    const [allSetores, setAllSetores] = useState<any[]>([]);

    const formValues1 = {
        id: "",
        nome: "",
        ativo: "",
    };

    useEffect(() => {
        getTodosSetores();
    }, []);

    const getTodosSetores = async () => {
        setIsLoadingAllSetores(true);
        await api
            .get(ALL_SETOR, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllSetores(data);
                    setIsLoadingAllSetores(false);
                }
            })
            .catch((err) => {
                showToast("ERROR", "Algo deu errado 🤨", {});
            });
    };

    return (
        <div className="selected__wrapper">
            {!isSubmiting ? (
                <Formik
                    initialValues={formValues1}
                    onSubmit={async (values) => {
                        const { nome } = values;

                        // Check if expediente already exists
                        const hasSetor = allSetores.filter((e: any) => {
                            return (
                                e.nome === nome ||
                                e.nome.toLowerCase() === nome.toLowerCase()
                            );
                        });

                        if (hasSetor && hasSetor.length > 0) {
                            showToast(
                                "ERROR",
                                "Esse expediente já existe!",
                                {}
                            );

                            return false;
                        }

                        setIsSubmiting(true);

                        const newSetor = {
                            nome,
                            ativo: isAtivo,
                        };

                        console.log(newSetor);
                        await api
                            .post(INSERT_SETOR, newSetor, {
                                headers: { Authorization: token },
                            })
                            .then((resp) => {
                                const { status } = resp;

                                if (status === 200 || status === 201) {
                                    setAdicionadoSuccess(true);

                                    window.setTimeout(() => {
                                        showToast(
                                            "SUCCESS",
                                            "Setor adicionado com sucesso!",
                                            {}
                                        );

                                        sethasCloseEditModal(true);
                                        removehasCloseEditModal("closedModal");
                                        setaddModalOpen(false);
                                    }, 2000);
                                }
                            })
                            .catch((err) => {
                                setIsSubmiting(false);
                                window.setInterval(
                                    () => setAdicionadoError(true),
                                    2000
                                );
                                showToast("ERROR", `${err.message}`, {});
                            });
                    }}
                    validate={(values) => {
                        const errors: any = {};

                        const { nome } = values;

                        if (!nome) {
                            errors.nome = "Insira um nome para continuar";
                        }

                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form__group not__centered">
                                <label htmlFor="">Nome</label>
                                <input
                                    type="text"
                                    value={values.nome}
                                    required
                                    className={`${
                                        errors.nome ? "hasError" : ""
                                    }`}
                                    onChange={handleChange("nome")}
                                />
                                {errors.nome ? (
                                    <div className="form__error">
                                        <p>{errors.nome}</p>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form__group not__centered form__flex">
                                <label htmlFor="">Ativo</label>
                                <input
                                    type="checkbox"
                                    value={values.ativo}
                                    className={`${
                                        errors.ativo ? "hasError" : ""
                                    }`}
                                    onChange={(e) => {
                                        setIsAtivo(!isAtivo);
                                        handleChange("ativo");
                                    }}
                                />
                            </div>

                            <div className="form__group not__centered">
                                <button
                                    type="submit"
                                    className={`bt form__login ${
                                        isLoadingAllSetores || errors.nome
                                            ? "bt__not"
                                            : ""
                                    }`}
                                    disabled={
                                        isLoadingAllSetores || errors.nome
                                            ? true
                                            : false
                                    }
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            ) : (
                <Lottie
                    options={{
                        loop: !adicionadoSuccess ? true : false,
                        animationData:
                            !adicionadoSuccess || !adicionadoError
                                ? LOADING
                                : adicionadoSuccess
                                ? SUCCESS
                                : ERROR,
                    }}
                    height={105}
                    width={105}
                />
            )}
        </div>
    );
};
export default AddSelectedSetor;
