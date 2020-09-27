import React, { useRef } from "react";
import "./styles.scss";
import Clock from "../../Hooks/useClock";
import { getTodayDate, getTodayInfo, showToast } from "../../Functions";

const LOGO_VERTICAL = require("../../Assets/images/logo_vertical.png");

interface MarcarPontoProps {}

const MarcarPonto: React.FC<MarcarPontoProps> = ({}) => {
    const handlePonto = () => {
        const datePonto = new Date().toLocaleTimeString();
        showToast(
            "SUCCESS",
            `Ponto batido com sucesso ás ${datePonto} do dia ${getTodayDate()}`
        );
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
            <p>{getTodayInfo()}</p>

            <a href="#marcar" className="bt" onClick={handlePonto}>
                Marcar Ponto
            </a>
        </div>
    );
};
export default MarcarPonto;
