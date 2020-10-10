import React, { useEffect, useState, useContext } from "react";
import "../styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import MainContext from "../../../Contexts/MainContext";
import {
    getAllExpediente,
    getAllFuncoes,
    insertNewColaborador,
} from "../../../Services/ApiCalls";
import { showToast, validateEmail } from "../../../Functions";
import "react-confirm-alert/src/react-confirm-alert.css";

//Animations
const LOADING = require("../../../Assets/animations/loading.json");
const SUCCESS = require("../../../Assets/animations/success.json");

const AddSelectedColaborador: React.FC = () => {
    const {
        token,
        setaddModalOpen,
        sethasCloseEditModal,
        removehasCloseEditModal,
    } = useContext(MainContext);

    // States Função
    const [isLoadingAllFunçoes, setIsLoadingAllFunçoes] = useState(false);
    const [allFuncoes, setAllFuncoes] = useState<any[]>([]);

    const [selectedFuncaoId, setSelectedFuncaoId] = useState("");
    const [selectedExpedienteId, setSelectedExpedienteId] = useState("");

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [adicionadoSuccess, setAdicionadoSuccess] = useState(false);
    const [isAtivo, setIsAtivo] = useState(false);

    //States Expediente
    const [isLoadingAllExpedientes, setIsLoadingAllExpedientes] = useState(
        false
    );
    const [allExpedientes, setAllExpedientes] = useState<any[]>([]);

    const formValues1 = {
        id: "",
        nome: "",
        email: "",
        funcaoId: "",
        expedienteId: "",
        ativo: "",
    };

    useEffect(() => {
        getTodasFuncoes();
        getTodosExpediente();
    }, []);

    const getTodasFuncoes = async () => {
        setIsLoadingAllFunçoes(true);
        const responseFuncao = await getAllFuncoes(token);

        if (responseFuncao) {
            if (responseFuncao.status === 200) {
                setAllFuncoes(responseFuncao.data);
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
                        const { nome, email } = values;

                        setIsSubmiting(true);

                        const newColaborador = {
                            nome,
                            email,
                            funcaoId: Number(selectedFuncaoId),
                            expedienteId: Number(selectedExpedienteId),
                            isAtivo,
                        };

                        const newColaboradorResponse = await insertNewColaborador(
                            token,
                            newColaborador
                        );

                        if (newColaboradorResponse) {
                            if (
                                newColaboradorResponse.response.status ===
                                    201 ||
                                newColaboradorResponse.response.status === 200
                            ) {
                                setAdicionadoSuccess(true);

                                window.setTimeout(() => {
                                    showToast(
                                        newColaboradorResponse.response
                                            .statusType,
                                        "Colaborador adicionado com sucesso!",
                                        {}
                                    );

                                    sethasCloseEditModal(true);
                                    removehasCloseEditModal("closedModal");
                                    setaddModalOpen(false);
                                }, 2000);
                            } else {
                                setIsSubmiting(false);
                                showToast(
                                    "ERROR",
                                    "Algo deu errado, verifique os campos novamente 🤨",
                                    {}
                                );
                            }
                        } else {
                            setIsSubmiting(false);
                            showToast("ERROR", "Algo deu errado 🤨", {});
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
                                <label htmlFor="">E-mail</label>
                                <input
                                    type="email"
                                    required
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
                                    required
                                    onChange={(e) => {
                                        setSelectedFuncaoId(e.target.value);
                                        handleChange("funcaoId");
                                    }}
                                    defaultValue={"Selecione uma função"}
                                >
                                    <option
                                        value="Selecione uma função"
                                        disabled
                                    >
                                        Selecione uma função
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
                                    required
                                    defaultValue={"Selecione um expediente"}
                                    onChange={(e) => {
                                        setSelectedExpedienteId(e.target.value);
                                        handleChange("expedienteId");
                                    }}
                                >
                                    <option
                                        value="Selecione um expediente"
                                        disabled
                                    >
                                        Selecione um expediente
                                    </option>
                                    {!isLoadingAllExpedientes ? (
                                        allExpedientes.map((expe, i) => (
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
                        loop: !adicionadoSuccess ? true : false,
                        animationData: !adicionadoSuccess ? LOADING : SUCCESS,
                    }}
                    height={105}
                    width={105}
                />
            )}
        </div>
    );
};
export default AddSelectedColaborador;
