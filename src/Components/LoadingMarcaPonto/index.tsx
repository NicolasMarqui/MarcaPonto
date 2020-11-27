import React from "react";
import "./styles.scss";
import Lottie from "react-lottie";

const LOADING = require("../../Assets/animations/loading.json");
const LOADING_GUY = require("../../Assets/animations/loading-guy.json");

const LoadingMarcaPonto: React.FC = () => {
    return (
        <div className="full-loading__wrapper">
            <div className="loading__content">
                <Lottie
                    options={{
                        loop: true,
                        animationData: LOADING_GUY,
                    }}
                    height={400}
                    width={400}
                />

                <div className="content__info">
                    <h2>
                        Carregando sua dashboard {""}
                        <span role="img" aria-label="Blink">
                            😉
                        </span>
                    </h2>
                    <Lottie
                        options={{
                            loop: true,
                            animationData: LOADING,
                        }}
                        height={150}
                        width={150}
                    />
                </div>

                <h3>Aguarde um instante</h3>
            </div>
        </div>
    );
};
export default LoadingMarcaPonto;
