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
import { showToast } from "../../../Functions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

//Animations
const LOADING = require("../../../Assets/animations/loading.json");
const SUCCESS = require("../../../Assets/animations/success.json");

interface SelectedRowPrColaborador {
    data: any;
}

const SelectedColaborador: React.FC<SelectedRowPrColaborador> = ({ data }) => {
    const { token, setOpenMoreInfo } = useContext(MainContext);
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

    const [hasChanged, setHasChanged] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [updateSuccess, setupdateSuccess] = useState(false);

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
            message: `Tem certeza que deseja #${id}${nome}?`,
            buttons: [
                {
                    label: "Sim",
                    onClick: async () => {
                        const responseRemove = await deleteColaboradorById(
                            token,
                            id
                        );

                        if (responseRemove) {
                            if (responseRemove.status === 200) {
                                showToast(
                                    "SUCCESS",
                                    `o Colaborador ${id} - ${nome} foi excluido com sucesso 😉!`,
                                    {}
                                );
                            }
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
                        const { id, nome, email, ativo } = values;

                        setIsSubmiting(true);

                        const colaboradoresField = {
                            id,
                            nome,
                            email,
                            funcaoId: Number(selectedFuncaoId),
                            expedienteId: Number(selectedExpedienteId),
                            ativo,
                        };

                        console.log(colaboradoresField);

                        const responseSubmit = await updateColaboradorById(
                            token,
                            id,
                            colaboradoresField
                        );

                        if (responseSubmit) {
                            if (responseSubmit.status === 200) {
                                setupdateSuccess(true);

                                window.setTimeout(() => {
                                    hasChanged &&
                                        showToast(
                                            "SUCCESS",
                                            "Alterações feitas com sucesso 😁",
                                            {}
                                        );

                                    setOpenMoreInfo(false);
                                }, 2000);
                            } else {
                                showToast("ERROR", "Tente Novamente 🤔", {});
                            }
                        } else {
                            showToast("ERROR", "Tente Novamente 🤔", {});
                        }
                    }}
                    validate={(values) => {
                        const errors: any = {};

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
                                    onChange={(e) => {
                                        handleChange("nome");
                                        setHasChanged(true);
                                    }}
                                />
                            </div>
                            <div className="form__group not__centered">
                                <label htmlFor="">E-mail</label>
                                <input
                                    type="email"
                                    value={values.email}
                                    className={`${
                                        errors.email ? "hasError" : ""
                                    }`}
                                    onChange={(e) => {
                                        handleChange("email");
                                        setHasChanged(true);
                                    }}
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
                                        setHasChanged(true);
                                    }}
                                >
                                    <option selected value={funcaoId}>
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
                                        <Lottie
                                            options={{
                                                loop: true,
                                                animationData: LOADING,
                                            }}
                                            height={75}
                                            width={75}
                                        />
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
                                        setHasChanged(true);
                                    }}
                                >
                                    <option selected value={expedienteId}>
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
                                        <Lottie
                                            options={{
                                                loop: true,
                                                animationData: LOADING,
                                            }}
                                            height={75}
                                            width={75}
                                        />
                                    )}
                                </select>
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
                                    className="bt form__login"
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
                        animationData: !updateSuccess ? LOADING : SUCCESS,
                    }}
                    height={105}
                    width={105}
                />
            )}
        </div>
    );
};
export default SelectedColaborador;
