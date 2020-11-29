import React, { useContext, useState, useEffect } from "react";
import "./styles.scss";
import Lottie from "react-lottie";
import HeaderInside from "../../../Components/HeaderInside";
import MainContext from "../../../Contexts/MainContext";
import {
    GetAllColaboradores,
    insertNewDelimitadorPonto,
} from "../../../Services/ApiCalls";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
    // @ts-ignore
    Map,
    TileLayer,
    FeatureGroup,
    Circle,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { showToast } from "../../../Functions";
import Axios from "axios";

const Delimitar: React.FC = () => {
    const { token } = useContext(MainContext);

    const LOADING = require("../../../Assets/animations/loading.json");

    // STATES
    const [currentUserEdit, setCurrentUserEdit] = useState<any>({});
    const [allPontos, setAllPontos] = useState([]);
    const [originalPontos, setOriginalPontos] = useState([]);
    const [currentLat, setCurrentLat] = useState(-23.08972755612617);
    const [currentLong, setCurrentLong] = useState(-47.21274684479759);
    const [zoom, setZoom] = useState(14);

    // CHAMADAS
    const {
        statusCodeAllColaboradores,
        dataAllColaboradores,
    } = GetAllColaboradores(token);

    useEffect(() => {
        document.title = "Marca Ponto - Delimitar";
        getAllDelimitador();
    }, []);

    const createNewPonto = (e: any) => {
        if (
            Object.keys(currentUserEdit).length === 0 &&
            currentUserEdit.constructor === Object
        ) {
            showToast(
                "ERROR",
                "Nenhum usuário selecionado, o delimitador não será salvo.",
                {}
            );
            return false;
        } else {
            const { _latlng, _mRadius } = e.layer;

            const data = {
                latLng: [_latlng.lat, _latlng.lng],
                radius: _mRadius,
                isHomeOffice: true,
            };

            insertNewDelimitadorPonto(currentUserEdit.id, data);
            showToast("SUCCESS", "Delimitador adicionado", {});
        }
    };

    // const editNewPonto = (e: any) => {
    //     if (
    //         Object.keys(currentUserEdit).length === 0 &&
    //         currentUserEdit.constructor === Object
    //     ) {
    //         showToast(
    //             "ERROR",
    //             "Nenhum usuário selecionado, o delimitador não será salvo.",
    //             {}
    //         );
    //         return false;
    //     } else {
    //         const { _layers } = e.layers;
    //         const data = {
    //             latLng: [_layers["64"]._latlng.lat, _layers["64"]._latlng.lng],
    //             radius: _layers["64"]._mRadius,
    //             isHomeOffice: true,
    //         };

    //         // Axios.put(`https://marcaponto-api.herokuapp.com/api/ponto/${col.id}`)
    //         // .then((response: any) => {
    //         //     const { status } = response;

    //         //     if (status === 200) {
    //         //         showToast("SUCCESS", "Delimitador Atualizado", {});
    //         //     }
    //         // })
    //         // .catch((err: any) => {
    //         //     return err;
    //         // });
    //     }
    // };

    const getAllDelimitador = () => {
        Axios.get(`https://marcaponto-api.herokuapp.com/api/ponto`)
            .then((response: any) => {
                const { data } = response;
                setAllPontos(data.data);
                setOriginalPontos(data.data);
            })
            .catch((err: any) => {
                return err;
            });
    };

    const handleUserClick = (col: any) => {
        setCurrentUserEdit(col);

        Axios.get(`https://marcaponto-api.herokuapp.com/api/ponto/${col.id}`)
            .then((response: any) => {
                const { status, data } = response;

                if (status === 200) {
                    console.log(data.data);
                    if (data.data && data.data.length > 0) {
                        setCurrentLat(data.data[0].latLng[0]);
                        setCurrentLong(data.data[0].latLng[1]);
                        setZoom(16);

                        setAllPontos(data.data);
                    } else {
                        setCurrentLat(-23.08972755612617);
                        setCurrentLong(-47.21274684479759);
                        setZoom(14);
                        setAllPontos([]);
                    }
                }
            })
            .catch((err: any) => {
                return err;
            });
    };

    return (
        <>
            <div className="usuarios__wrapper">
                <div className="usuarios__header">
                    <HeaderInside isHome={false} nome={"Delimitar"} />
                </div>
                <div className="page__title-info">
                    <div className="tinf__name">
                        <h2 className="tt-title title-blue title-bold">
                            Delimitar pontos
                        </h2>
                    </div>
                </div>

                <div className="delimitar__wrapper">
                    <div className="del__users">
                        <h3 className="tt-sub title-blue title-bold title-center">
                            Usuários
                        </h3>
                        <p style={{ textAlign: "center" }}>
                            Clique no usuário para editar...
                        </p>

                        {statusCodeAllColaboradores === 200 ? (
                            <ul>
                                {dataAllColaboradores.map((col: any) => (
                                    <li>
                                        <div
                                            className="col__info"
                                            onClick={() => handleUserClick(col)}
                                        >
                                            <h6>{col.nome}</h6>
                                            <p>{col.email}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Lottie
                                options={{
                                    loop: true,
                                    animationData: LOADING,
                                }}
                                height={200}
                                width={200}
                            />
                        )}
                    </div>
                    <div className="del__map">
                        {Object.keys(currentUserEdit).length !== 0 &&
                            currentUserEdit.constructor === Object && (
                                <div className="editing__now">
                                    <h5>
                                        Editando:{" "}
                                        <span>{currentUserEdit.nome}</span>
                                    </h5>
                                </div>
                            )}
                        {Object.keys(currentUserEdit).length !== 0 &&
                            currentUserEdit.constructor === Object && (
                                <div
                                    className="cancel__editing"
                                    onClick={() => {
                                        setCurrentUserEdit({});
                                        setCurrentLat(-23.08972755612617);
                                        setCurrentLong(-47.21274684479759);
                                        setZoom(14);
                                        setAllPontos(originalPontos);
                                    }}
                                >
                                    <h5>
                                        Cancelar edição{" "}
                                        <AiOutlineCloseCircle size={20} />
                                    </h5>
                                </div>
                            )}
                        <Map
                            center={[currentLat, currentLong]}
                            zoom={zoom}
                            scrollWheelZoom={true}
                        >
                            <FeatureGroup>
                                {Object.keys(currentUserEdit).length !== 0 &&
                                    currentUserEdit.constructor === Object && (
                                        <EditControl
                                            position="topright"
                                            onCreated={(e: any) => {
                                                createNewPonto(e);
                                            }}
                                            // onEdited={(e: any) => {
                                            //     editNewPonto(e);
                                            // }}
                                            draw={{
                                                marker: false,
                                                rectangle: false,
                                                polygon: false,
                                                polyline: false,
                                                circlemarker: false,
                                            }}
                                        />
                                    )}
                                {originalPontos && originalPontos.length > 0 ? (
                                    allPontos.map((p: any) => (
                                        <Circle
                                            center={[p.latLng[0], p.latLng[1]]}
                                            radius={Number(p.radius)}
                                        />
                                    ))
                                ) : (
                                    <div className="loading__map">
                                        <Lottie
                                            options={{
                                                loop: true,
                                                animationData: LOADING,
                                            }}
                                            height={200}
                                            width={200}
                                        />
                                        <h3>Carregando mapa</h3>
                                    </div>
                                )}
                            </FeatureGroup>
                            <TileLayer
                                attribution="google"
                                url="http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                            />
                        </Map>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Delimitar;
