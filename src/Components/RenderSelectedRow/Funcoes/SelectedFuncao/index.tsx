import React, { useState, useContext, useEffect } from "react";
import "../../styles.scss";
import { Formik } from "formik";
import { BsTrash } from "react-icons/bs";
import Lottie from "react-lottie";
import MainContext from "../../../../Contexts/MainContext";
import { showToast } from "../../../../Functions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import api from "../../../../Services/api";
import {
    ALL_COLABORADORES,
    ALL_FUNCAO,
    ALL_SETOR,
} from "../../../../Services/Endpoints";

//Animations
const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");
const ERROR = require("../../../../Assets/animations/error.json");

interface SelectedRowPrFuncao {
    data: any;
}

const SelectedFuncao: React.FC<SelectedRowPrFuncao> = ({ data }) => {
    const {
        token,
        setOpenMoreInfo,
        sethasCloseEditModal,
        removehasCloseEditModal,
    } = useContext(MainContext);

    // DATA PROPS
    const { id, nome, funcaoResponsavelId, responsavel, setorId } = data;

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [updateSuccess, setupdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    // State Responsável
    const [isLoadingAllUsuarios, setIsLoadingAllUsuarios] = useState(false);
    const [selectedUsuarioID, setSelectedUsuarioID] = useState(
        funcaoResponsavelId
    );
    const [allUsuarios, setAllUsuarios] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState("");

    //State Setor
    const [isLoadingAllSetores, setIsLoadingAllSetores] = useState(false);
    const [selectedSetorID, setSelectedSetorID] = useState(setorId);
    const [allSetores, setAllSetores] = useState<any[]>([]);
    const [currentSetor, setCurrentSetor] = useState("");

    //States Ativo
    const [isResponsavel, setIsResponsavel] = useState(
        responsavel?.props.values === "true" ? true : false
    );

    const formValues = {
        id,
        nome,
        funcaoResponsavelId,
        responsavel,
        setorId,
    };

    useEffect(() => {
        getTodosUsuarios();
        getTodosSetores();
    }, []);

    const getTodosUsuarios = async () => {
        setIsLoadingAllUsuarios(true);
        await api
            .get(ALL_COLABORADORES, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllUsuarios(data);

                    //Get selected user
                    const filteredUser = data.filter(
                        (u: any) => u.id === funcaoResponsavelId
                    );

                    setCurrentUser(filteredUser[0].nome);

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

                    //Get selected user
                    const filteredSetor = data.filter(
                        (u: any) => u.id === setorId
                    );

                    setCurrentSetor(filteredSetor[0].nome);

                    setIsLoadingAllSetores(false);
                }
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    const askIfDelete = () => {
        confirmAlert({
            title: "Confirme antes de continuar",
            message: `Tem certeza que deseja excluir #${id}${nome}?`,
            buttons: [
                {
                    label: "Sim",
                    onClick: async () => {
                        setIsSubmiting(true);

                        await api
                            .delete(`${ALL_FUNCAO}/${id}`, {
                                headers: { Authorization: token },
                            })
                            .then((resp) => {
                                const { status } = resp;
                                if (status === 200 || status === 201) {
                                    setupdateSuccess(true);

                                    window.setTimeout(() => {
                                        showToast(
                                            "SUCCESS",
                                            `A Função ${id} - ${nome} foi excluida com sucesso 😉!`,
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

                        const funcaoField = {
                            nome,
                            funcaoResponsavelId: selectedUsuarioID,
                            setorId: selectedSetorID,
                            responsavel: isResponsavel,
                            ativo: true,
                        };

                        await api
                            .put(`${ALL_FUNCAO}/${id}`, funcaoField, {
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
                            <div className="form__group not__centered">
                                <label htmlFor="">Responsável</label>
                                <select
                                    onChange={(e) => {
                                        setSelectedUsuarioID(e.target.value);
                                        handleChange("funcaoResponsavelId");
                                    }}
                                    defaultValue={funcaoResponsavelId}
                                >
                                    <option value={funcaoResponsavelId}>
                                        {isLoadingAllUsuarios
                                            ? "Aguarde..."
                                            : currentUser}
                                    </option>
                                    {!isLoadingAllUsuarios ? (
                                        allUsuarios
                                            .filter(
                                                (u) =>
                                                    u.id !== funcaoResponsavelId
                                            )
                                            .map((func) => (
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
                                <label htmlFor="">Setor</label>
                                <select
                                    onChange={(e) => {
                                        setSelectedSetorID(e.target.value);
                                        handleChange("setorId");
                                    }}
                                    defaultValue={setorId}
                                >
                                    <option value={setorId}>
                                        {isLoadingAllSetores
                                            ? "Aguarde..."
                                            : currentSetor}
                                    </option>
                                    {!isLoadingAllSetores ? (
                                        allSetores
                                            .filter((u) => u.id !== setorId)
                                            .map((func) => (
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

                            <div className="form__group not__centered form__flex">
                                <label htmlFor="">Responsável</label>
                                <input
                                    type="checkbox"
                                    value={isResponsavel.toString()}
                                    checked={isResponsavel ? true : false}
                                    onChange={(e) => {
                                        setIsResponsavel(!isResponsavel);
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
                                        errors.nome ||
                                        !selectedSetorID ||
                                        !selectedUsuarioID
                                            ? "bt__not"
                                            : ""
                                    }`}
                                    disabled={
                                        errors.nome ||
                                        !selectedSetorID ||
                                        !selectedUsuarioID
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
export default SelectedFuncao;
