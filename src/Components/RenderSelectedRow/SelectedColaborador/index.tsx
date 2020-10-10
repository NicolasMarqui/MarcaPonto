import React, { useEffect, useState, useContext } from "react";
import "../styles.scss";
import { Formik } from "formik";
import { BsTrash } from "react-icons/bs";
import Lottie from "react-lottie";
import MainContext from "../../../Contexts/MainContext";
import {
    deleteColaboradorById,
    getAllExpediente,
    getAllFuncoes,
    getExpedienteById,
    getFuncaoById,
    updateColaboradorById,
} from "../../../Services/ApiCalls";
import { showToast, validateEmail } from "../../../Functions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

//Animations
const LOADING = require("../../../Assets/animations/loading.json");
const SUCCESS = require("../../../Assets/animations/success.json");
const ERROR = require("../../../Assets/animations/error.json");

interface SelectedRowPrColaborador {
    data: any;
}

const SelectedColaborador: React.FC<SelectedRowPrColaborador> = ({ data }) => {
    const {
        token,
        setOpenMoreInfo,
        sethasCloseEditModal,
        removehasCloseEditModal,
    } = useContext(MainContext);
    const { id, nome, email, funcaoId, expedienteId, ativo } = data;

    // States Função
    const [loadingFuncao, setIsLoadingFuncao] = useState(false);
    const [funcaoName, setFuncaoName] = useState("");
    const [isLoadingAllFunçoes, setIsLoadingAllFunçoes] = useState(false);
    const [allFuncoes, setAllFuncoes] = useState<any[]>([]);

    const [selectedFuncaoId, setSelectedFuncaoId] = useState(funcaoId);
    const [selectedExpedienteId, setSelectedExpedienteId] = useState(
        expedienteId
    );

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [updateSuccess, setupdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    //States Ativo
    const [isAtivo, setIsAtivo] = useState(ativo === "true" ? true : false);

    //States Expediente
    const [loadingExpediente, setIsLoadingExpediente] = useState(false);
    const [expedienteName, setExpedienteName] = useState("");
    const [isLoadingAllExpedientes, setIsLoadingAllExpedientes] = useState(
        false
    );
    const [allExpedientes, setAllExpedientes] = useState<any[]>([]);

    const formValues = {
        id,
        nome,
        email,
        funcaoId,
        expedienteId,
        ativo,
    };

    useEffect(() => {
        getFuncaoName();
        getTodasFuncoes();
        getExpedienteName();
        getTodosExpediente();
    }, []);

    const askIfDelete = () => {
        confirmAlert({
            title: "Confirme antes de continuar",
            message: `Tem certeza que deseja excluir #${id}${nome}?`,
            buttons: [
                {
                    label: "Sim",
                    onClick: async () => {
                        const responseRemove = await deleteColaboradorById(
                            token,
                            id
                        );

                        setIsSubmiting(true);

                        window.setInterval(() => setUpdateError(true), 2000);

                        if (responseRemove) {
                            if (responseRemove.status === 200) {
                                setupdateSuccess(true);
                                setIsSubmiting(true);

                                window.setTimeout(() => {
                                    showToast(
                                        "SUCCESS",
                                        `o Colaborador ${id} - ${nome} foi excluido com sucesso 😉!`,
                                        {}
                                    );

                                    sethasCloseEditModal(true);
                                    removehasCloseEditModal("closedModal");
                                    setOpenMoreInfo(false);
                                }, 2000);
                            } else {
                                window.setInterval(() => {
                                    setUpdateError(true);
                                    showToast(
                                        "ERROR",
                                        `Algo deu errado 😣`,
                                        {}
                                    );

                                    setIsSubmiting(false);
                                }, 2000);
                            }
                        } else {
                            window.setInterval(() => {
                                setUpdateError(true);
                                showToast("ERROR", `Algo deu errado 😣`, {});

                                setIsSubmiting(false);
                            }, 2000);
                        }
                    },
                },
                {
                    label: "Não",
                    onClick: () => {},
                },
            ],
        });
    };

    const getFuncaoName = async () => {
        setIsLoadingFuncao(true);
        const responseFuncao = await getFuncaoById(token, funcaoId);

        if (responseFuncao) {
            if (responseFuncao.status === 200) {
                setFuncaoName(responseFuncao.data.nome);
                setIsLoadingFuncao(false);
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

    const getTodasFuncoes = async () => {
        setIsLoadingAllFunçoes(true);
        const responseFuncao = await getAllFuncoes(token);

        if (responseFuncao) {
            if (responseFuncao.status === 200) {
                setAllFuncoes(
                    responseFuncao.data.filter(
                        (curr: any) => curr.id !== funcaoId
                    )
                );
                setIsLoadingAllFunçoes(false);
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

    const getExpedienteName = async () => {
        setIsLoadingExpediente(true);
        const responseExpediente = await getExpedienteById(token, expedienteId);

        if (responseExpediente) {
            if (responseExpediente.status === 200) {
                setExpedienteName(responseExpediente.data.nome);
                setIsLoadingExpediente(false);
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

    const getTodosExpediente = async () => {
        setIsLoadingAllExpedientes(true);
        const responseExpediente = await getAllExpediente(token);

        if (responseExpediente) {
            if (responseExpediente.status === 200) {
                setAllExpedientes(
                    responseExpediente.data.filter(
                        (curr: any) => curr.id !== expedienteId
                    )
                );
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
                    initialValues={formValues}
                    onSubmit={async (values) => {
                        const { id, nome, email } = values;

                        setIsSubmiting(true);

                        const colaboradoresField = {
                            id,
                            nome,
                            email,
                            funcaoId: Number(selectedFuncaoId),
                            expedienteId: Number(selectedExpedienteId),
                            ativo: isAtivo,
                        };

                        const responseSubmit = await updateColaboradorById(
                            token,
                            id,
                            colaboradoresField
                        );

                        if (responseSubmit) {
                            if (responseSubmit.status === 200) {
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
                            } else {
                                showToast(
                                    "ERROR",
                                    `Não foi possivel salvar as alterações no usuário ${nome}`,
                                    {}
                                );
                            }
                        } else {
                            showToast(
                                "ERROR",
                                "Ops, por gentileza recarregue a página",
                                {}
                            );
                        }
                    }}
                    validate={(values) => {
                        const errors: any = {};

                        const { nome, email } = values;

                        if (!nome) {
                            errors.nome = "Insira um nome para continuar";
                        }

                        if (!email || !validateEmail(email)) {
                            errors.email = "E-mail inválido 🤨";
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
                                <label htmlFor="">Função</label>
                                <select
                                    className={`${
                                        errors.funcaoId ? "hasError" : ""
                                    }`}
                                    onChange={(e) => {
                                        setSelectedFuncaoId(e.target.value);
                                        handleChange("funcaoId");
                                    }}
                                >
                                    <option
                                        selected
                                        defaultValue={funcaoId}
                                        value={funcaoId}
                                    >
                                        {loadingFuncao
                                            ? "Aguarde..."
                                            : funcaoName}
                                    </option>
                                    {!isLoadingAllFunçoes ? (
                                        allFuncoes.map((func) => (
                                            <option
                                                key={func.id}
                                                value={func.id}
                                            >
                                                {func.nome}
                                            </option>
                                        ))
                                    ) : (
                                        <option
                                            disabled
                                            defaultValue="Aguarde..."
                                        >
                                            Aguarde...
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="form__group not__centered">
                                <label htmlFor="">Expediente</label>
                                <select
                                    className={`${
                                        errors.expedienteId ? "hasError" : ""
                                    }`}
                                    onChange={(e) => {
                                        setSelectedExpedienteId(e.target.value);
                                        handleChange("expedienteId");
                                    }}
                                >
                                    <option
                                        selected
                                        defaultValue={expedienteId}
                                        value={expedienteId}
                                    >
                                        {loadingExpediente
                                            ? "Aguarde..."
                                            : expedienteName}
                                    </option>
                                    {!isLoadingAllExpedientes ? (
                                        allExpedientes.map((expe) => (
                                            <option
                                                key={expe.id}
                                                value={expe.id}
                                            >
                                                {expe.nome}
                                            </option>
                                        ))
                                    ) : (
                                        <option
                                            disabled
                                            defaultValue="Aguarde..."
                                        >
                                            Aguarde...
                                        </option>
                                    )}
                                </select>
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
                                        isLoadingAllExpedientes ||
                                        isLoadingAllFunçoes ||
                                        errors.nome ||
                                        errors.email ||
                                        !selectedFuncaoId ||
                                        !selectedExpedienteId
                                            ? "bt__not"
                                            : ""
                                    }`}
                                    disabled={
                                        isLoadingAllExpedientes ||
                                        isLoadingAllFunçoes ||
                                        errors.nome ||
                                        errors.email ||
                                        !selectedFuncaoId ||
                                        !selectedExpedienteId
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
                        loop: !updateSuccess ? true : false,
                        animationData:
                            !updateSuccess && !updateError
                                ? LOADING
                                : updateSuccess
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
export default SelectedColaborador;
