import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";
import Lottie from "react-lottie";
import api from "../../../../Services/api";
import {
    APROVAR_PONTO,
    ATUALIZAR_PONTO,
    REPROVAR_PONTO,
} from "../../../../Services/Endpoints";
import MainContext from "../../../../Contexts/MainContext";
import { insertNewLog } from "../../../../Services/ApiCalls";
import { saveFromDate, showToast } from "../../../../Functions";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface AprovarPontoProps {
    dataPonto: any;
}

const LOADING = require("../../../../Assets/animations/loading.json");
const SUCCESS = require("../../../../Assets/animations/success.json");
const ERROR = require("../../../../Assets/animations/error.json");

const AprovarPonto: React.FC<AprovarPontoProps> = ({ dataPonto }) => {
    const {
        token,
        currentLoggedUserId,
        setNotificationCount,
        notificationCount,
        sethasCloseEditModal,
        removehasCloseEditModal,
        setOpenMoreInfo,
    } = useContext(MainContext);

    useEffect(() => {
        if (localizacao) {
            const location = localizacao
                .slice(1, -1)
                .split(",")
                .map((coord: any) => Number(coord));

            if (location) {
                setLat(location[0]);
                setLong(location[1]);
            }
        }
    }, []);

    const {
        data,
        horario,
        id,
        tipoDoRegistro,
        localizacao,
        observacao,
    } = dataPonto;

    // State geral
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [updateSuccess, setupdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    const aprovarPonto = async () => {
        await api
            .patch(`${APROVAR_PONTO}/${id}`, {
                headers: { Authorization: token },
            })
            .then((resp) => {
                const { status } = resp;

                if (status === 200) {
                    setupdateSuccess(true);

                    insertNewLog(
                        currentLoggedUserId,
                        `Aprovado o ponto #${id}`
                    );

                    setNotificationCount(notificationCount + 1);

                    showToast("SUCCESS", "Ponto Aprovado 😀", {});

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

                window.setTimeout(() => setIsSubmiting(false), 2000);

                return false;
            });
    };

    const reprovarPonto = async () => {
        await api
            .patch(`${REPROVAR_PONTO}/${id}`, {
                headers: { Authorization: token },
            })
            .then((resp) => {
                const { status } = resp;

                if (status === 200) {
                    setupdateSuccess(true);

                    insertNewLog(
                        currentLoggedUserId,
                        `Aprovado o ponto #${id}`
                    );

                    setNotificationCount(notificationCount + 1);

                    showToast("SUCCESS", "Ponto Aprovado 😀", {});

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

                window.setTimeout(() => setIsSubmiting(false), 2000);

                return false;
            });
    };

    return (
        <div className="selected__wrapper">
            <h3 className="tt-sub title-blue title-blue title-bold title-center">
                Aprovar ponto - {id}
            </h3>
            {!isSubmiting ? (
                <>
                    <div className="wrapper__aprovar">
                        <ul className="infos">
                            <li>
                                <div className="pnt__info">
                                    <p>
                                        ID: <span>{id}</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="pnt__info">
                                    <p>
                                        Data:{""}
                                        <span>
                                            {saveFromDate(new Date(data))}
                                        </span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="pnt__info">
                                    <p>
                                        Horário: <span> {horario}</span>
                                    </p>
                                </div>
                            </li>
                            {localizacao && lat !== 0 && long !== 0 && (
                                <li>
                                    <div className="pnt__info">
                                        <p>Localização:</p>
                                        <br />
                                        <div className="m__map">
                                            <MapContainer
                                                center={[lat, long]}
                                                zoom={16}
                                                scrollWheelZoom={true}
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={[lat, long]}>
                                                    <Popup>
                                                        Sua localização
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    </div>
                                </li>
                            )}
                            <li>
                                <div className="pnt__info">
                                    <p>
                                        Tipo de Registro: {""}
                                        <span>{tipoDoRegistro}</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="pnt__info">
                                    <p>
                                        Observação:{" "}
                                        <span>
                                            {observacao ? observacao : "-"}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bnt__aprovar">
                        <button className="bt" onClick={aprovarPonto}>
                            Aprovar
                        </button>
                        <button
                            className="bt form__login"
                            onClick={reprovarPonto}
                        >
                            Reprovar
                        </button>
                    </div>
                </>
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
export default AprovarPonto;
