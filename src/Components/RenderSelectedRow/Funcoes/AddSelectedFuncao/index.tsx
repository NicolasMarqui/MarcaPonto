import React, { useEffect, useState, useContext } from "react";
import "../../styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import MainContext from "../../../../Contexts/MainContext";
import { showToast } from "../../../../Functions";
import { ERROR } from "../../../../Services/Constants";
import api from "../../../../Services/api";
import {
    ALL_COLABORADORES,
    ALL_FUNCAO,
    ALL_SETOR,
    INSERT_FUNCAO,
} from "../../../../Services/Endpoints";
import { insertNewLog } from "../../../../Services/ApiCalls";

//Animations
const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");

const AddSelectedFuncao: React.FC = () => {
    const {
        token,
        setaddModalOpen,
        sethasCloseEditModal,
        removehasCloseEditModal,
        currentLoggedUserId,
        notificationCount,
        setNotificationCount,
    } = useContext(MainContext);

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [adicionadoSuccess, setAdicionadoSuccess] = useState(false);
    const [adicionadoError, setAdicionadoError] = useState(false);
    const [isResponsavel, setIsResponsavel] = useState(false);

    //State Função
    const [allFuncoes, setAllFuncoes] = useState<any[]>([]);

    // State Responsável
    const [isLoadingAllUsuarios, setIsLoadingAllUsuarios] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState("");
    const [allUsuarios, setAllUsuarios] = useState<any[]>([]);

    //State Setor
    const [isLoadingAllSetores, setIsLoadingAllSetores] = useState(false);
    const [selectedSetor, setSelectedSetor] = useState("");
    const [allSetores, setAllSetores] = useState<any[]>([]);

    const formValues1 = {
        id: "",
        nome: "",
        funcaoResponsavelId: "",
        responsavel: "",
        setorId: "",
    };

    useEffect(() => {
        getTodosUsuarios();
        getTodosSetores();
        getTodasFuncoes();
    }, []);

    const getTodosUsuarios = async () => {
        setIsLoadingAllUsuarios(true);
        await api
            .get(ALL_COLABORADORES, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllUsuarios(data);
                    setIsLoadingAllUsuarios(false);
                }
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

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
                showToast("ERROR", err.message, {});
            });
    };

    const getTodasFuncoes = async () => {
        await api
            .get(ALL_FUNCAO, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllFuncoes(data);
                }
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    return (
        <div className="selected__wrapper">
            {!isSubmiting ? (
                <Formik
                    initialValues={formValues1}
                    onSubmit={async (values) => {
                        const { nome } = values;

                        const hasFuncao = allFuncoes.filter((e: any) => {
                            return (
                                e.nome === nome ||
                                e.nome.toLowerCase() === nome.toLowerCase()
                            );
                        });

                        if (hasFuncao && hasFuncao.length > 0) {
                            showToast("ERROR", "Essa Função já existe!", {});

                            return false;
                        }

                        const newFuncao = {
                            nome,
                            funcaoResponsavelId: Number(selectedUsuario),
                            setorId: Number(selectedSetor),
                            responsavel: isResponsavel,
                        };

                        setIsSubmiting(true);

                        await api
                            .post(INSERT_FUNCAO, newFuncao, {
                                headers: { Authorization: token },
                            })
                            .then((resp) => {
                                const { status } = resp;

                                if (status === 200 || status === 201) {
                                    setAdicionadoSuccess(true);

                                    insertNewLog(
                                        currentLoggedUserId,
                                        `Função ${nome} adicionada`
                                    );

                                    setNotificationCount(notificationCount + 1);

                                    window.setTimeout(() => {
                                        showToast(
                                            "SUCCESS",
                                            "Funcão adicionada com sucesso!",
                                            {}
                                        );

                                        sethasCloseEditModal(true);
                                        removehasCloseEditModal("closedModal");
                                        setaddModalOpen(false);
                                    }, 2000);
                                }
                            })
                            .catch((err) => {
                                setAdicionadoError(true);

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
                                <label htmlFor="">Responsável</label>
                                <select
                                    required
                                    onChange={(e) => {
                                        setSelectedUsuario(e.target.value);
                                        handleChange("funcaoResponsavelId");
                                    }}
                                    defaultValue={"Selecione um responsável"}
                                >
                                    <option
                                        value="Selecione um responsável"
                                        disabled
                                    >
                                        Selecione um responsável
                                    </option>
                                    {!isLoadingAllUsuarios ? (
                                        allUsuarios.map((func) => (
                                            <option
                                                key={func.id}
                                                value={func.id}
                                            >
                                                {`${func.id} - ${func.nome}`}
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
                                <label htmlFor="">Setor</label>
                                <select
                                    required
                                    onChange={(e) => {
                                        setSelectedSetor(e.target.value);
                                        handleChange("setorId");
                                    }}
                                    defaultValue={"Selecione um setor"}
                                >
                                    <option value="Selecione um setor" disabled>
                                        Selecione um setor
                                    </option>
                                    {!isLoadingAllSetores ? (
                                        allSetores.map((func) => (
                                            <option
                                                key={func.id}
                                                value={func.id}
                                            >
                                                {`${func.id} - ${func.nome}`}
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
                                <label htmlFor="">Responsável</label>
                                <input
                                    type="checkbox"
                                    value={isResponsavel.toString()}
                                    onChange={(e) => {
                                        setIsResponsavel(!isResponsavel);
                                        handleChange("responsavel");
                                    }}
                                />
                            </div>

                            <div className="form__group not__centered">
                                <button
                                    type="submit"
                                    className={`bt form__login ${
                                        errors.nome ||
                                        !selectedUsuario ||
                                        !selectedSetor
                                            ? "bt__not"
                                            : ""
                                    }`}
                                    disabled={
                                        errors.nome ||
                                        !selectedUsuario ||
                                        !selectedSetor
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
export default AddSelectedFuncao;
