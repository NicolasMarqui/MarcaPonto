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
import TimeKeeper from "react-timekeeper";
import {
    ALL_COLABORADORES,
    ALL_DIAS_DA_SEMANA,
    ALL_EXPEDIENTE,
    ALL_FUNCAO,
    ALL_HORARIOS,
    ALL_REGISTRO,
    ALL_SETOR,
} from "../../../../Services/Endpoints";
import MaskedInput from "react-text-mask";

//Animations
const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");
const ERROR = require("../../../../Assets/animations/error.json");

interface SelectedRowPrHorario {
    data: any;
}

const SelectedHorario: React.FC<SelectedRowPrHorario> = ({ data }) => {
    const {
        token,
        setOpenMoreInfo,
        sethasCloseEditModal,
        removehasCloseEditModal,
    } = useContext(MainContext);

    // DATA PROPS
    const {
        id,
        diaDaSemana,
        expedienteId,
        horario,
        tipoRegistro,
        toleranciaAtraso,
        toleranciaExtra,
    } = data;

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [updateSuccess, setupdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    // State Clock
    const [time, setTime] = useState(horario);
    const [valueToleranciaAtraso, setToleranciaAtraso] = useState(
        toleranciaAtraso
    );
    const [valueToleranciaExtra, setToleranciaExtra] = useState(
        toleranciaExtra
    );

    // States Expedientes
    const [isLoadingAllExpedientes, setIsLoadingAllExpedientes] = useState(
        false
    );
    const [selectedExpediente, setSelectedExpediente] = useState(expedienteId);
    const [allExpedientes, setAllExpedientes] = useState<any[]>([]);
    const [currentExpediente, setCurrentExpediente] = useState("");

    // States Dias da semana
    const [isLoadingAllDias, setIsLoadingAllDias] = useState(false);
    const [selectedDia, setSelectedDia] = useState(diaDaSemana);
    const [allDias, setAllDias] = useState<any[]>([]);

    // States Tipo de Registro
    const [isLoadingAllTipos, setIsLoadingAllTipos] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState(tipoRegistro);
    const [allTipos, setAllTipos] = useState<any[]>([]);

    const formValues = {
        id: "",
        diaDaSemana: "",
        expedienteId: "",
        horario: "",
        tipoRegistro: "",
        toleranciaAtraso: "",
        toleranciaExtra: "",
    };

    useEffect(() => {
        getTodosExpedientes();
        getTodosDiasDaSemana();
        getTodosTiposRegistro();
    }, []);

    const getTodosExpedientes = async () => {
        setIsLoadingAllExpedientes(true);
        await api
            .get(ALL_EXPEDIENTE, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllExpedientes(data);

                    //Get selected user
                    const filteredExpediente = data.filter(
                        (u: any) => u.id === expedienteId
                    );

                    setCurrentExpediente(filteredExpediente[0].nome);

                    setIsLoadingAllExpedientes(false);
                }
            })
            .catch((err) => {
                showToast("ERROR", "Algo deu errado 🤨", {});
            });
    };

    const getTodosDiasDaSemana = async () => {
        setIsLoadingAllDias(true);
        await api
            .get(ALL_DIAS_DA_SEMANA, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllDias(data);
                    setIsLoadingAllDias(false);
                }
            })
            .catch((err) => {
                showToast("ERROR", "Algo deu errado 🤨", {});
            });
    };

    const getTodosTiposRegistro = async () => {
        setIsLoadingAllTipos(true);
        await api
            .get(ALL_REGISTRO, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllTipos(data);
                    setIsLoadingAllTipos(false);
                }
            })
            .catch((err) => {
                showToast("ERROR", "Algo deu errado 🤨", {});
            });
    };

    const askIfDelete = () => {
        confirmAlert({
            title: "Confirme antes de continuar",
            message: `Tem certeza que deseja excluir #${id}-${diaDaSemana}?`,
            buttons: [
                {
                    label: "Sim",
                    onClick: async () => {
                        setIsSubmiting(true);

                        await api
                            .delete(`${ALL_HORARIOS}/${id}`, {
                                headers: { Authorization: token },
                            })
                            .then((resp) => {
                                const { status } = resp;
                                if (status === 200 || status === 201) {
                                    setupdateSuccess(true);

                                    window.setTimeout(() => {
                                        showToast(
                                            "SUCCESS",
                                            `O Horário ${id} - ${diaDaSemana} foi excluido com sucesso 😉!`,
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
                        const { id } = values;

                        setIsSubmiting(true);

                        const HorarioField = {
                            diaDaSemanaId: selectedDia,
                            tipoDoRegistroId: selectedTipo,
                            horario: time,
                            toleranciaExtra: toleranciaExtra,
                            toleranciaAtraso: toleranciaAtraso,
                        };

                        await api
                            .put(`${ALL_HORARIOS}/${id}`, HorarioField, {
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
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form__group not__centered">
                                <label htmlFor="">Dia da Semana</label>
                                <select
                                    onChange={(e) => {
                                        setSelectedDia(e.target.value);
                                        handleChange("diaDaSemana");
                                    }}
                                >
                                    <option
                                        selected
                                        defaultValue={diaDaSemana}
                                        value={diaDaSemana}
                                    >
                                        {isLoadingAllDias
                                            ? "Aguarde..."
                                            : selectedDia}
                                    </option>
                                    {!isLoadingAllDias ? (
                                        allDias
                                            .filter((u) => u.id !== diaDaSemana)
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
                                <label htmlFor="">Expediente</label>
                                <select
                                    onChange={(e) => {
                                        setSelectedExpediente(e.target.value);
                                        handleChange("expedienteId");
                                    }}
                                >
                                    <option
                                        selected
                                        defaultValue={expedienteId}
                                        value={expedienteId}
                                    >
                                        {isLoadingAllExpedientes
                                            ? "Aguarde..."
                                            : currentExpediente}
                                    </option>
                                    {!isLoadingAllExpedientes ? (
                                        allExpedientes
                                            .filter(
                                                (u) => u.id !== expedienteId
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
                                <label htmlFor="">Horário</label>
                                <TimeKeeper
                                    hour24Mode={true}
                                    time={time}
                                    onChange={(newTime) =>
                                        setTime(newTime.formatted12)
                                    }
                                />
                            </div>

                            <div className="form__group not__centered">
                                <label htmlFor="">Tipo de Registro</label>
                                <select
                                    onChange={(e) => {
                                        setSelectedTipo(e.target.value);
                                        handleChange("tipoDoRegistroId");
                                    }}
                                >
                                    <option
                                        selected
                                        defaultValue={tipoRegistro}
                                        value={tipoRegistro}
                                    >
                                        {isLoadingAllTipos
                                            ? "Aguarde..."
                                            : tipoRegistro}
                                    </option>
                                    {!isLoadingAllTipos ? (
                                        allTipos.map((func, i) => (
                                            <option key={i} value={i + 1}>
                                                {func[i]}
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
                                <label htmlFor="">Tolerância Atraso</label>
                                <MaskedInput
                                    type="tel"
                                    pattern="[0-9]*"
                                    value={valueToleranciaAtraso}
                                    defaultValue={valueToleranciaAtraso}
                                    required
                                    placeholder="__:__"
                                    onChange={(e) => {
                                        setToleranciaAtraso(e.target.value);
                                        handleChange("toleranciaAtraso");
                                    }}
                                    mask={[
                                        /[0-9]/,
                                        /[0-9]/,
                                        ":",
                                        /[0-9]/,
                                        /[0-9]/,
                                    ]}
                                />
                            </div>
                            <div className="form__group not__centered">
                                <label htmlFor="">Tolerância Extra</label>
                                <MaskedInput
                                    type="tel"
                                    pattern="[0-9]*"
                                    value={valueToleranciaExtra}
                                    defaultValue={valueToleranciaExtra}
                                    required
                                    placeholder="__:__"
                                    onChange={(e) => {
                                        setToleranciaExtra(e.target.value);
                                        handleChange("toleranciaExtra");
                                    }}
                                    mask={[
                                        /[0-9]/,
                                        /[0-9]/,
                                        ":",
                                        /[0-9]/,
                                        /[0-9]/,
                                    ]}
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
                                        !selectedExpediente ||
                                        !selectedTipo ||
                                        !selectedDia
                                            ? "bt__not"
                                            : ""
                                    }`}
                                    disabled={
                                        !selectedExpediente ||
                                        !selectedTipo ||
                                        !selectedDia
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
export default SelectedHorario;
