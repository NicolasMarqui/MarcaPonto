import React, { useState, useEffect, useContext, useRef } from "react";
import "./styles.scss";
import HeaderInside from "../../../Components/HeaderInside";
import MainContext from "../../../Contexts/MainContext";
import Card from "../../../Components/Card";
import MarcarPonto from "../../../Components/MarcarPonto";
import L from "leaflet";
// @ts-ignore
import { FeatureGroup, Map, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { GetAllDelimitadorPontoByUser } from "../../../Services/ApiCalls";
import { in_circle, isInCircle } from "../../../Functions";
import { Circle } from "react-leaflet";

interface MarcarProps {}

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const Marcar: React.FC<MarcarProps> = () => {
    const {
        userLocalization,
        currentLoggedUserId,
        setHasAskedForGeo,
        hasAskedForGeo,
    } = useContext(MainContext);

    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const {
        statusCodeAllDelimitadorPontosUser,
        dataAllDelimitadorPontosUser,
    } = GetAllDelimitadorPontoByUser(currentLoggedUserId);

    const circleRef = useRef<any>();
    const mapRef = useRef<any>(null);

    useEffect(() => {
        document.title = "Marca Ponto - Marcar Ponto";

        // console.log(
        //     in_circle(
        //         -23.065825176837958,
        //         -47.22270010036451,
        //         76.94547035938591,
        //         userLocalization[0],
        //         userLocalization[1]
        //     )
        // );

        const map = mapRef; //get native Map instance
        console.log(map);

        var isInside =
            Math.pow(-23.065825176837958 - -47.22270010036451, 2) +
                Math.pow(
                    (userLocalization[0] as any) - Number(userLocalization[1]),
                    2
                ) >=
            76.94547035938591 * 76.94547035938591;
        console.log(isInside);

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
                {userLocalization &&
                    userLocalization.length > 0 &&
                    statusCodeAllDelimitadorPontosUser === 200 && (
                        <div className="m__map">
                            <Map
                                center={[
                                    Number(userLocalization[0]),
                                    Number(userLocalization[1]),
                                ]}
                                ref={mapRef}
                                zoom={17}
                                scrollWheelZoom={true}
                            >
                                <FeatureGroup>
                                    {dataAllDelimitadorPontosUser.map(
                                        (crl: any) => (
                                            <Circle
                                                center={[
                                                    crl.latLng[0],
                                                    crl.latLng[1],
                                                ]}
                                                // ref={(elem: any) =>
                                                //     console.log(elem)
                                                // }
                                                radius={Number(crl.radius)}
                                            />
                                        )
                                    )}
                                </FeatureGroup>
                                <TileLayer
                                    attribution="google"
                                    url="http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                />
                                <Marker position={[lat, long]}>
                                    <Popup>Sua localização</Popup>
                                </Marker>
                            </Map>
                        </div>
                    )}
            </div>
        </div>
    );
};
export default Marcar;
