import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

interface NavBarInternaProps {}

const NavBarInterna: React.FC<NavBarInternaProps> = ({}) => {
    return (
        <header>
            <div className="nav__interna">
                <div className="nav__bemvindo">
                    <h2 className="tt-title">
                        Bem vindo <span>Nicolas</span>
                    </h2>
                    <p className="nav__curentDate">
                        Quarta Feira, 23 de Setembro de 2020
                    </p>
                </div>

                <div className="nav__opcoes">
                    <div className="opcoes__avatar">
                        <Link to="/dashboard/settings">
                            <img
                                src="https://api.adorable.io/avatars/285/abott@adorable.png"
                                alt=""
                            />
                        </Link>
                    </div>

                    <div className="opcoes__logout">
                        <a href="#logout" className="bt">
                            Sair
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default NavBarInterna;
