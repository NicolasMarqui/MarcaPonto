import React, { useEffect, useState, useContext } from "react";
import "../../styles.scss";
import { Formik } from "formik";
import Lottie from "react-lottie";
import MainContext from "../../../../Contexts/MainContext";
import { showToast } from "../../../../Functions";
import { ERROR } from "../../../../Services/Constants";
import api from "../../../../Services/api";
import MaskedInput from "react-text-mask";
import {
    ALL_DIAS_DA_SEMANA,
    ALL_EXPEDIENTE,
    ALL_REGISTRO,
    INSERT_HORARIOS,
} from "../../../../Services/Endpoints";
import TimeKeeper from "react-timekeeper";

//Animations
const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");

const AddSelectedHorario: React.FC = () => {
    const {
        token,
        setaddModalOpen,
        sethasCloseEditModal,
        removehasCloseEditModal,
    } = useContext(MainContext);

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [adicionadoSuccess, setAdicionadoSuccess] = useState(false);
    const [adicionadoError, setAdicionadoError] = useState(false);

    // State Clock
    const [time, setTime] = useState("08:00am");
    const [toleranciaAtraso, setToleranciaAtraso] = useState("00:00");
    const [toleranciaExtra, setToleranciaExtra] = useState("00:00");

    // States Expedientes
    const [isLoadingAllExpedientes, setIsLoadingAllExpedientes] = useState(
        false
    );
    const [selectedExpediente, setSelectedExpediente] = useState("");
    const [allExpedientes, setAllExpedientes] = useState<any[]>([]);

    // States Dias da semana
    const [isLoadingAllDias, setIsLoadingAllDias] = useState(false);
    const [selectedDia, setSelectedDia] = useState("");
    const [allDias, setAllDias] = useState<any[]>([]);

    // States Tipo de Registro
    const [isLoadingAllTipos, setIsLoadingAllTipos] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState("");
    const [allTipos, setAllTipos] = useState<any[]>([]);

    const formValues1 = {
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

    return (
        <div className="selected__wrapper">
            {!isSubmiting ? (
                <Formik
                    initialValues={formValues1}
                    onSubmit={async (values) => {
                        setIsSubmiting(true);

                        const newHorario = {
                            diaDaSemanaId: selectedDia,
                            tipoDoRegistroId: selectedTipo,
                            horario: time,
                            toleranciaExtra: toleranciaExtra,
                            toleranciaAtraso: toleranciaAtraso,
                        };

                        await api
                            .post(INSERT_HORARIOS, newHorario, {
                                headers: { Authorization: token },
                            })
                            .then((resp) => {
                                const { status } = resp;

                                if (status === 200 || status === 201) {
                                    setAdicionadoSuccess(true);

                                    window.setTimeout(() => {
                                        showToast(
                                            "SUCCESS",
                                            "Horário adicionado com sucesso!",
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
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form__group not__centered">
                                <label htmlFor="">Dia da Semana</label>
                                <select
                                    required
                                    defaultValue={"Selecione um dia da semana"}
                                    onChange={(e) => {
                                        setSelectedDia(e.target.value);
                                        handleChange("diaDaSemanaId");
                                    }}
                                >
                                    <option
                                        value="Selecione um dia da semana"
                                        disabled
                                    >
                                        Selecione um dia da semana
                                    </option>
                                    {!isLoadingAllDias ? (
                                        allDias.map((expe, i) => (
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
                            <div className="form__group not__centered">
                                <label htmlFor="">Expediente</label>
                                <select
                                    required
                                    defaultValue={"Selecione um expediente"}
                                    onChange={(e) => {
                                        setSelectedExpediente(e.target.value);
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
                            <div className="form__group not__centered">
                                <label htmlFor="">Horário</label>
                                <TimeKeeper
                                    time={time}
                                    onChange={(newTime) =>
                                        setTime(newTime.formatted12)
                                    }
                                />
                            </div>
                            <div className="form__group not__centered">
                                <label htmlFor="">Tipo de Registro</label>
                                <select
                                    required
                                    defaultValue={
                                        "Selecione um tipo de registro"
                                    }
                                    onChange={(e) => {
                                        setSelectedTipo(e.target.value);
                                        handleChange("tipoDoRegistroId");
                                    }}
                                >
                                    <option
                                        value="Selecione um tipo de registro"
                                        disabled
                                    >
                                        Selecione um tipo de registro
                                    </option>
                                    {!isLoadingAllTipos ? (
                                        allTipos.map((tip, i) => (
                                            <option key={i} value={i + 1}>
                                                {tip[i]}
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
                                    value={toleranciaAtraso}
                                    defaultValue={toleranciaAtraso}
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
                                    value={toleranciaExtra}
                                    defaultValue={toleranciaExtra}
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
                            <div className="form__group not__centered">
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
export default AddSelectedHorario;
