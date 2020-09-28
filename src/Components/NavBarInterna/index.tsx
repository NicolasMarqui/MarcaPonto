import React, { useState, useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { getTodayInfo } from "../../Functions";
import MainContext from "../../Contexts/MainContext";

interface NavBarInternaProps {}

const NavBarInterna: React.FC<NavBarInternaProps> = () => {
    const { removeToken } = useContext(MainContext);
    const [dropdownNotificationOpen, setdropdownNotificationOpen] = useState(
        false
    );

    const handleLogout = () => {};

    return (
        <header className="header__nav-interna">
            <div className="nav__interna">
                <div className="nav__bemvindo">
                    <h2 className="tt-title">
                        Bem vindo <span>Nicolas</span>
                    </h2>
                    <p className="nav__curentDate">{getTodayInfo()}</p>
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

                    <div
                        className="opcoes__notifications"
                        onClick={() =>
                            setdropdownNotificationOpen(
                                !dropdownNotificationOpen
                            )
                        }
                    >
                        <BiBell size={30} />

                        <div className="notifications__hasNot">
                            <span>1</span>
                        </div>

                        <div
                            className={`notifications__dropdown ${
                                dropdownNotificationOpen ? "show" : ""
                            }`}
                        >
                            <p>Nenhuma notificação ainda</p>
                        </div>
                    </div>

                    <div className="opcoes__logout">
                        <a
                            href="#logout"
                            className="bt"
                            onClick={() => removeToken("token")}
                        >
                            Sair
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default NavBarInterna;
