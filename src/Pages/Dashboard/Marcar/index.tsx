import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import HeaderInside from "../../../Components/HeaderInside";
import MainContext from "../../../Contexts/MainContext";
import Card from "../../../Components/Card";
import MarcarPonto from "../../../Components/MarcarPonto";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MarcarProps {}

const Marcar: React.FC<MarcarProps> = () => {
    const {
        userLocalization,
        currentLoggedUserId,
        setHasAskedForGeo,
        hasAskedForGeo,
    } = useContext(MainContext);

    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    useEffect(() => {
        document.title = "Marca Ponto - Marcar Ponto";

        if (userLocalization && userLocalization.length > 0) {
            setLat(Number(userLocalization[0]));
            setLong(Number(userLocalization[1]));
        }
    }, []);

    return (
        <div className="pontos__wrapper">
            <div className="pontos__header">
                <HeaderInside isHome={false} nome={"Marcar Ponto"} />

                <div className="page__title-info info__espelho">
                    <div className="tinf__wrapper">
                        <div className="tinf__name">
                            <h2 className="tt-title title-blue title-bold">
                                Marcar Ponto
                            </h2>
                            {(!userLocalization ||
                                userLocalization.length === 0) &&
                                lat === 0 &&
                                long === 0 && (
                                    <p
                                        onClick={() =>
                                            setHasAskedForGeo(!hasAskedForGeo)
                                        }
                                    >
                                        Saber minha localizacao
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="marcar__wrapper">
                <div className="m__clock">
                    <Card>
                        <MarcarPonto colaboradorId={currentLoggedUserId} />
                    </Card>
                </div>
                {userLocalization && userLocalization.length > 0 && (
                    <div className="m__map">
                        <MapContainer
                            center={[
                                Number(userLocalization[0]),
                                Number(userLocalization[1]),
                            ]}
                            zoom={17}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[lat, long]}>
                                <Popup>Sua localização</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Marcar;
