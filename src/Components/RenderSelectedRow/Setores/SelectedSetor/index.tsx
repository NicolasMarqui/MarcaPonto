import React, { useState, useContext } from "react";
import "../../styles.scss";
import { Formik } from "formik";
import { BsTrash } from "react-icons/bs";
import Lottie from "react-lottie";
import MainContext from "../../../../Contexts/MainContext";
import { showToast } from "../../../../Functions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import api from "../../../../Services/api";
import { ALL_SETOR } from "../../../../Services/Endpoints";

//Animations
const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");
const ERROR = require("../../../../Assets/animations/error.json");

interface SelectedRowPrSetor {
    data: any;
}

const SelectedSetor: React.FC<SelectedRowPrSetor> = ({ data }) => {
    const {
        token,
        setOpenMoreInfo,
        sethasCloseEditModal,
        removehasCloseEditModal,
    } = useContext(MainContext);

    // DATA PROPS
    const { id, nome, ativo } = data;

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [updateSuccess, setupdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    //States Ativo
    const [isAtivo, setIsAtivo] = useState(ativo === "true" ? true : false);

    const formValues = {
        id,
        nome,
        ativo,
    };

    const askIfDelete = () => {
        confirmAlert({
            title: "Confirme antes de continuar",
            message: `Tem certeza que deseja excluir #${id} - ${nome}?`,
            buttons: [
                {
                    label: "Sim",
                    onClick: async () => {
                        setIsSubmiting(true);

                        await api
                            .delete(`${ALL_SETOR}/${id}`, {
                                headers: { Authorization: token },
                            })
                            .then((resp) => {
                                const { status } = resp;
                                if (status === 200 || status === 201) {
                                    setupdateSuccess(true);

                                    window.setTimeout(() => {
                                        showToast(
                                            "SUCCESS",
                                            `O setor ${id} - ${nome} foi excluido com sucesso 😉!`,
                                            {}
                                        );

                                        sethasCloseEditModal(true);
                                        removehasCloseEditModal("closedModal");
                                        setOpenMoreInfo(false);
                                    }, 2000);
                                }
                            })
                            .catch((error) => {
                                setUpdateError(true);

                                const { errors } = error.response.data;

                                errors.map((err: any) =>
                                    showToast("ERROR", `${err.message}`, {})
                                );

                                window.setTimeout(
                                    () => setIsSubmiting(false),
                                    2000
                                );

                                return false;
                            });
                    },
                },
                {
                    label: "Não",
                    onClick: () => {},
                },
            ],
        });
    };

    return (
        <div className="selected__wrapper">
            {!isSubmiting ? (
                <Formik
                    initialValues={formValues}
                    onSubmit={async (values) => {
                        const { id, nome } = values;

                        setIsSubmiting(true);

                        const setorField = {
                            nome,
                            ativo: isAtivo,
                        };

                        await api
                            .put(`${ALL_SETOR}/${id}`, setorField, {
                                headers: { Authorization: token },
                            })
                            .then((resp) => {
                                const { status } = resp;

                                if (status === 200) {
                                    setupdateSuccess(true);

                                    showToast(
                                        "SUCCESS",
                                        "Alterações feitas com sucesso 😁",
                                        {}
                                    );

                                    window.setTimeout(() => {
                                        sethasCloseEditModal(true);
                                        removehasCloseEditModal("closedModal");
                                        setOpenMoreInfo(false);
                                    }, 2000);
                                }
                            })
                            .catch((err) => {
                                setIsSubmiting(true);
                                setUpdateError(true);

                                const { errors } = err.response.data;

                                errors.map((err: any) =>
                                    showToast("ERROR", `${err.message}`, {})
                                );

                                window.setTimeout(
                                    () => setIsSubmiting(false),
                                    2000
                                );

                                return false;
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
                                    value={isAtivo.toString()}
                                    checked={isAtivo ? true : false}
                                    className={`${
                                        errors.ativo ? "hasError" : ""
                                    }`}
                                    onChange={(e) => {
                                        setIsAtivo(!isAtivo);
                                        handleChange("ativo");
                                    }}
                                />
                            </div>

                            <div className="form__group not__centered form__side-side">
                                <div
                                    className="selected__remove bt"
                                    onClick={askIfDelete}
                                >
                                    <BsTrash />
                                </div>
                                <button
                                    type="submit"
                                    className={`bt form__login ${
                                        errors.nome ? "bt__not" : ""
                                    }`}
                                    disabled={errors.nome ? true : false}
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
                        loop: !updateSuccess ? true : false,
                        animationData:
                            !updateSuccess && !updateError
                                ? LOADING
                                : updateSuccess
                                ? SUCCESS
                                : updateError
                                ? ERROR
                                : LOADING,
                    }}
                    height={105}
                    width={105}
                />
            )}
        </div>
    );
};
export default SelectedSetor;
