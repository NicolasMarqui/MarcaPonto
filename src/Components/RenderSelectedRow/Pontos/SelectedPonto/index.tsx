import React, { useState, useContext } from "react";
import { Formik } from "formik";
import Lottie from "react-lottie";
import TimeKeeper from "react-timekeeper";
import DatePicker from "react-date-picker";
import api from "../../../../Services/api";
import { ATUALIZAR_PONTO } from "../../../../Services/Endpoints";
import MainContext from "../../../../Contexts/MainContext";
import { insertNewLog } from "../../../../Services/ApiCalls";
import { saveFromDate, showToast } from "../../../../Functions";

interface SelectedPontosProps {
    dataPonto: any;
}

const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");
const ERROR = require("../../../../Assets/animations/error.json");

const SelectedPontos: React.FC<SelectedPontosProps> = ({ dataPonto }) => {
    const {
        token,
        currentLoggedUserId,
        setNotificationCount,
        notificationCount,
        sethasCloseEditModal,
        removehasCloseEditModal,
        setOpenMoreInfo,
    } = useContext(MainContext);
    const { data, horario, id, tipoDoRegistro, localizacao, obs } = dataPonto;

    const allTiposArray = [
        {
            id: 0,
            nome: "Início da Jornada",
        },
        {
            id: 1,
            nome: "Início do Intervalo",
        },
        {
            id: 2,
            nome: "Fim do Intervalo",
        },
        {
            id: 3,
            nome: "Fim da Jornada",
        },
    ];

    const formValues = {
        id,
        data,
        tipoDoRegistroId: 0,
        localizacao,
        observacao: obs,
    };

    // State geral
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [updateSuccess, setupdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    // State data
    const [valueData, onChangeData] = useState(
        data ? new Date(data) : new Date()
    );

    // States Tipo de Registro
    const [selectedTipo, setSelectedTipo] = useState(
        tipoDoRegistro
            ? allTiposArray.filter((t: any) => t.nome === tipoDoRegistro)[0].id
            : 0
    );

    // State Horário
    const [time, setTime] = useState(horario);

    return (
        <div className="selected__wrapper">
            {!isSubmiting ? (
                <Formik
                    initialValues={formValues}
                    onSubmit={async (values) => {
                        const { id, observacao } = values;

                        setIsSubmiting(true);

                        const atualizarPontoFields = {
                            data: saveFromDate(valueData),
                            horario: time,
                            tipoDoRegistroId: selectedTipo,
                            localizacao: localizacao,
                            obs: observacao,
                        };

                        await api
                            .put(
                                `${ATUALIZAR_PONTO}/${id}`,
                                atualizarPontoFields,
                                {
                                    headers: { Authorization: token },
                                }
                            )
                            .then((resp) => {
                                const { status } = resp;

                                if (status === 200) {
                                    setupdateSuccess(true);

                                    insertNewLog(
                                        currentLoggedUserId,
                                        `Alterações feitas no ponto #${id}`
                                    );

                                    setNotificationCount(notificationCount + 1);

                                    showToast(
                                        "SUCCESS",
                                        "Alterações enviadas para seu gestor com sucesso 😀",
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
                            <div className="form__group not__centered not__styled">
                                <label htmlFor="">Data</label>
                                <DatePicker
                                    onChange={onChangeData as any}
                                    value={valueData}
                                />
                            </div>

                            <div className="form__group not__centered">
                                <label htmlFor="">Horário</label>
                                <TimeKeeper
                                    hour24Mode={true}
                                    time={time}
                                    onChange={(newTime) => {
                                        let hour =
                                            newTime.hour <= 9
                                                ? `0${newTime.hour}`
                                                : newTime.hour;
                                        let minute =
                                            newTime.minute <= 9
                                                ? `0${newTime.minute}`
                                                : newTime.minute;

                                        setTime(`${hour}:${minute}`);
                                    }}
                                />
                            </div>

                            <div className="form__group not__centered">
                                <label htmlFor="">Tipo de Registro</label>
                                <select
                                    onChange={(e) => {
                                        setSelectedTipo(Number(e.target.value));
                                        handleChange("tipoDoRegistroId");
                                    }}
                                >
                                    {tipoDoRegistro ? (
                                        <option
                                            selected
                                            defaultValue={
                                                allTiposArray.filter(
                                                    (t: any) =>
                                                        t.nome ===
                                                        tipoDoRegistro
                                                )[0].id
                                            }
                                            value={
                                                allTiposArray.filter(
                                                    (t: any) =>
                                                        t.nome ===
                                                        tipoDoRegistro
                                                )[0].id
                                            }
                                        >
                                            {tipoDoRegistro}
                                        </option>
                                    ) : (
                                        <option
                                            selected
                                            defaultValue="Carregando"
                                            value="Carregando"
                                        >
                                            Carregando
                                        </option>
                                    )}
                                    {allTiposArray
                                        .filter(
                                            (alt: any) =>
                                                alt.nome !== tipoDoRegistro
                                        )
                                        .map((func, i) => (
                                            <option
                                                key={func.id}
                                                value={func.id}
                                            >
                                                {func.nome}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="form__group not__centered">
                                <label htmlFor="">Observação</label>
                                <textarea
                                    value={values.observacao}
                                    required
                                    className={`no-resize set-height`}
                                    onChange={handleChange("observacao")}
                                />
                            </div>

                            <div className="form__group not__centered form__side-side">
                                <button
                                    type="submit"
                                    className={`bt selected__remove ${
                                        valueData || selectedTipo
                                            ? "bt-not"
                                            : ""
                                    }`}
                                >
                                    Atualizar
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
export default SelectedPontos;
