import React from "react";
import "./styles.scss";
import Lottie from "react-lottie";

const LOGO = require("../../Assets/images/logo_vertical.png");
const LOADING = require("../../Assets/animations/loading.json");

const LoadingMarcaPonto: React.FC = () => {
    return (
        <div className="full-loading__wrapper">
            <div className="loading__logo">
                <img src={LOGO} alt="Marca Ponto" />
            </div>
            <div className="loading__content">
                <Lottie
                    options={{
                        loop: true,
                        animationData: LOADING,
                    }}
                    height={150}
                    width={150}
                />

                <h2>
                    Carregando sua dashboard
                    <span role="img" aria-label="Blink">
                        😉
                    </span>
                </h2>

                <h3>Aguarde um instante</h3>
            </div>
        </div>
    );
};
export default LoadingMarcaPonto;
