import React, { useState, useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { AiFillBell } from "react-icons/ai";
import {
    getCurrentFlag,
    getTodayInfo,
    handleUndefined,
    showToast,
} from "../../Functions";
import MainContext from "../../Contexts/MainContext";
import { FormattedMessage } from "react-intl";
import { AllLanguages } from "../../Services/AllLanguages";
import { AiOutlineSearch } from "react-icons/ai";

interface NavBarInternaProps {
    data: any;
}

const NavBarInterna: React.FC<NavBarInternaProps> = ({ data }) => {
    const { removeToken, setBrowserLanguage, browserLanguage } = useContext(
        MainContext
    );
    // const [dropdownNotificationOpen, setdropdownNotificationOpen] = useState(
    //     false
    // );

    const handleLogout = () => {
        showToast("SUCCESS", "Você foi deslogado com sucesso", {});
        removeToken("token");
    };

    const changeBrowserLanguage = (value: string, title: string) => {
        let toastSuccessMessage = `Idioma alterado para ${title}`;

        showToast("SUCCESS", toastSuccessMessage, {});
        setBrowserLanguage(value);
    };

    return (
        <header className="header__nav-interna">
            <div className="nav__interna">
                <div className="nav__search">
                    <input type="text" placeholder="Pesquisa" />
                    <div className="s__go">
                        <AiOutlineSearch color="#fff" size={18} />
                    </div>
                </div>

                <div className="nav__opcoes">
                    <div className="opcoes__language">
                        <div className="lang__current">
                            <img
                                src={`https://www.countryflags.io/${getCurrentFlag(
                                    browserLanguage
                                )}/flat/64.png`}
                                alt="Portuguese"
                            />
                            <BiChevronDown size={20} color="#fff" />
                        </div>
                        <div className="lang__more-options">
                            {AllLanguages.filter(
                                (all) => all.locale !== browserLanguage
                            ).map((lang) => (
                                <div
                                    className="mo__wrapper"
                                    onClick={() =>
                                        changeBrowserLanguage(
                                            lang.locale,
                                            lang.title
                                        )
                                    }
                                >
                                    <img
                                        src={`https://www.countryflags.io/${lang.flag}/flat/64.png`}
                                        alt={lang.title}
                                    />
                                    <p>{lang.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="opcoes__avatar">
                        <Link to="/dashboard/settings">
                            <img
                                src={`https://ui-avatars.com/api/?name=${data.username}&background=0D8ABC&color=fff`}
                                alt=""
                            />
                        </Link>
                    </div>

                    <div className="opcoes__notifications">
                        <AiFillBell size={30} color="#fff" />

                        <div className="notifications__hasNot">
                            <span>1</span>
                        </div>

                        <div className={`notifications__dropdown`}>
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
