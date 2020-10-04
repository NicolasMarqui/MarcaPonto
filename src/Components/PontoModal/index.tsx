import React, { useContext, useEffect } from "react";
import "./styles.scss";
import { IoMdCloseCircle } from "react-icons/io";
import MainContext from "../../Contexts/MainContext";
import Lottie from "react-lottie";
import { ERROR } from "../../Services/Constants";

const ANIMATION_SUCCESS = require("../../Assets/animations/confetti.json");
const ANIMATION_ERROR = require("../../Assets/animations/error.json");

interface PontoModalProps {}

const PontoModal: React.FC<PontoModalProps> = ({}) => {
    const { isModalPontoOpen, setIsModalPontoOpen, pontoStatus } = useContext(
        MainContext
    );

    useEffect(() => {
        // closeOnInterval();
    }, []);

    const closeOnInterval = () => {
        window.setInterval(() => setIsModalPontoOpen(!isModalPontoOpen), 5000);
    };

    return (
        <div className="modal__wrapper">
            <div
                className="modal__close"
                onClick={() => setIsModalPontoOpen(!isModalPontoOpen)}
            >
                <IoMdCloseCircle color="#fff" size={54} />
            </div>
            <div className="modal__content">
                {pontoStatus === ERROR ? (
                    <div className="content__type type__error">
                        <h4>Ops, algo deu errado </h4>

                        <Lottie
                            options={{
                                loop: true,
                                animationData: ANIMATION_ERROR,
                            }}
                            height={150}
                            width={150}
                        />
                    </div>
                ) : (
                    <div className="content__type type__success">
                        <h4>
                            Ponto marcado <br /> com sucesso{" "}
                        </h4>
                        <Lottie
                            options={{
                                loop: true,
                                animationData: ANIMATION_SUCCESS,
                            }}
                            height={450}
                            width={450}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default PontoModal;
