import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const LOGO_VERTICAL = require("../../Assets/images/logo_vertical.png");

const NotFound: React.FC = () => {
    return (
        <div className="nt__wrapper">
            <img src={LOGO_VERTICAL} alt="Marca Ponto" />
            <div className="nt__info">
                <h2>404</h2>
                <p>A página que vc busca não está disponivel :(</p>
                <Link to="/dashboard">Acesse sua conta</Link>
            </div>
        </div>
    );
};
export default NotFound;
