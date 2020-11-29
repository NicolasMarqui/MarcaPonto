import React, { useState, useContext } from "react";
import "./styles.scss";
import Clock from "../../Hooks/useClock";
import { getTodayDate, getTodayInfo, showToast } from "../../Functions";
import Lottie from "react-lottie";
import api from "../../Services/api";
import { MARCAR_PONTO } from "../../Services/Endpoints";
import MainContext from "../../Contexts/MainContext";

//Images
const LOGO_VERTICAL = require("../../Assets/images/logo_vertical.png");

//Animations
const LOADING = require("../../Assets/animations/loading.json");

interface MarcarPontoProps {
    colaboradorId: Number | null;
}

const MarcarPonto: React.FC<MarcarPontoProps> = ({ colaboradorId }) => {
    const {
        token,
        setIsModalPontoOpen,
        setPontoStatus,
        userLocalization,
    } = useContext(MainContext);

    const [isLoadingPonto, setIsLoadingPonto] = useState(false);

    const handlePonto = async () => {
        const datePonto = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        setIsLoadingPonto(true);

        const newPontoData = {
            manual: false,
            colaboradorId: colaboradorId,
            data: getTodayDate(),
            horario: datePonto.toString(),
            localizacao: userLocalization.toString(),
        };

        // setPontoStatus("ERROR");

        // setIsLoadingPonto(false);

        // setIsModalPontoOpen(true);

        await api
            .post(MARCAR_PONTO, newPontoData, {
                headers: {
                    Authorization: token,
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((response) => {
                setPontoStatus("SUCCESS");

                setIsModalPontoOpen(true);

                showToast(
                    "SUCCESS",
                    `Ponto batido com sucesso ás ${datePonto} do dia ${getTodayDate()}`,
                    { onClose: () => setIsModalPontoOpen(false) }
                );

                setIsLoadingPonto(false);
            })
            .catch((err) => {
                setPontoStatus("ERROR");

                setIsModalPontoOpen(true);

                //TODO Fix error message

                console.log(err.response.data);

                // const { errors } = err.response.data;

                // errors.map((err: any) =>
                //     showToast("ERROR", err.message, {
                //         onClose: () => setIsModalPontoOpen(false),
                //     })
                // );

                setIsLoadingPonto(false);
            });
    };

    return (
        <div className="marcar-ponto__wrapper">
            <div className="marca-ponto__logo">
                <img
                    src={LOGO_VERTICAL}
                    alt="Marca Ponto"
                    className="form__logo"
                />
            </div>
            <Clock />

            {!isLoadingPonto ? (
                <a href="#marcar" className="bt" onClick={handlePonto}>
                    Marcar Ponto
                </a>
            ) : (
                <Lottie
                    options={{
                        loop: true,
                        animationData: LOADING,
                    }}
                    height={150}
                    width={150}
                />
            )}
        </div>
    );
};
export default MarcarPonto;
