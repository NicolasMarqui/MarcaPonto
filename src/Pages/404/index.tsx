import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";

const NOT_FOUND = require("../../Assets/animations/404.json");

const NotFound: React.FC = () => {
    return (
        <div className="nt__wrapper">
            <div className="nt__info">
                <Lottie
                    options={{
                        loop: true,
                        animationData: NOT_FOUND,
                    }}
                    height={400}
                    width={400}
                />
                <p>A página que vc busca não está disponivel :(</p>
                <Link to="/dashboard">Acesse sua conta</Link>
            </div>
        </div>
    );
};
export default NotFound;
