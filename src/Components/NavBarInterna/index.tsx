import React, { useState, useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { getTodayInfo, handleUndefined, showToast } from "../../Functions";
import MainContext from "../../Contexts/MainContext";

interface NavBarInternaProps {
    data: any;
}

const NavBarInterna: React.FC<NavBarInternaProps> = ({ data }) => {
    const { removeToken } = useContext(MainContext);
    const [dropdownNotificationOpen, setdropdownNotificationOpen] = useState(
        false
    );

    const handleLogout = () => {
        showToast("SUCCESS", "Você foi deslogado com sucesso");
        removeToken("token");
    };

    return (
        <header className="header__nav-interna">
            <div className="nav__interna">
                <div className="nav__bemvindo">
                    <h2 className="tt-title">
                        Bem vindo <span>{handleUndefined(data.username)}</span>
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
                        <a href="#logout" className="bt" onClick={handleLogout}>
                            Sair
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default NavBarInterna;
