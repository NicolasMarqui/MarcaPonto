import React, { useEffect, useState, useContext } from "react";
import "../../styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import MainContext from "../../../../Contexts/MainContext";
import {
    getAllExpediente,
    insertNewExpediente,
} from "../../../../Services/ApiCalls";
import { showToast } from "../../../../Functions";
import { ERROR } from "../../../../Services/Constants";
import api from "../../../../Services/api";
import { INSERT_EXPEDIENTE } from "../../../../Services/Endpoints";

//Animations
const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");

const AddSelectedExpediente: React.FC = () => {
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

    //States Expediente
    const [isLoadingAllExpedientes, setIsLoadingAllExpedientes] = useState(
        false
    );
    const [allExpedientes, setAllExpedientes] = useState<any[]>([]);

    const formValues1 = {
        id: "",
        nome: "",
        descricao: "",
        ativo: "",
    };

    useEffect(() => {
        getTodosExpediente();
    }, []);

    const getTodosExpediente = async () => {
        setIsLoadingAllExpedientes(true);
        const responseExpediente = await getAllExpediente(token);

        if (responseExpediente) {
            if (responseExpediente.status === 200) {
                setAllExpedientes(responseExpediente.data);
                setIsLoadingAllExpedientes(false);
            } else {
                showToast(
                    "ERROR",
                    "Algo deu errado, recarregue a página 🤨",
                    {}
                );
            }
        } else {
            showToast("ERROR", "Algo deu errado 🤨", {});
        }
    };

    return (
        <div className="selected__wrapper">
            {!isSubmiting ? (
                <Formik
                    initialValues={formValues1}
                    onSubmit={async (values) => {
                        const { nome, descricao } = values;

                        // Check if expediente already exists
                        const hasExpediente = allExpedientes.filter(
                            (e: any) => {
                                return (
                                    e.nome === nome ||
                                    e.nome.toLowerCase() === nome.toLowerCase()
                                );
                            }
                        );

                        if (hasExpediente && hasExpediente.length > 0) {
                            showToast(
                                "ERROR",
                                "Esse expediente já existe!",
                                {}
                            );

                            return false;
                        }

                        setIsSubmiting(true);

                        const newExpediente = {
                            nome,
                            descricao,
                            isAtivo,
                        };

                        await api
                            .post(INSERT_EXPEDIENTE, newExpediente, {
                                headers: { Authorization: token },
                            })
                            .then((resp) => {
                                const { status } = resp;

                                if (status === 200 || status === 201) {
                                    setAdicionadoSuccess(true);

                                    window.setTimeout(() => {
                                        showToast(
                                            "SUCCESS",
                                            "Expediente adicionado com sucesso!",
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

                        const { nome, descricao } = values;

                        if (!nome) {
                            errors.nome = "Insira um nome para continuar";
                        }

                        if (!descricao) {
                            errors.descricao =
                                "Insira uma descrição para continuar";
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
                            <div className="form__group not__centered">
                                <label htmlFor="">Descrição</label>
                                <textarea
                                    value={values.descricao}
                                    required
                                    className={`${
                                        errors.descricao ? "hasError" : ""
                                    }no-resize set-height`}
                                    onChange={handleChange("descricao")}
                                />
                                {errors.descricao ? (
                                    <div className="form__error">
                                        <p>{errors.descricao}</p>
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
                                        isLoadingAllExpedientes ||
                                        errors.nome ||
                                        errors.descricao
                                            ? "bt__not"
                                            : ""
                                    }`}
                                    disabled={
                                        isLoadingAllExpedientes ||
                                        errors.nome ||
                                        errors.descricao
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
export default AddSelectedExpediente;
