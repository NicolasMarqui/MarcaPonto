import React from "react";
import "./styles.scss";
import {
    FaCog,
    FaClipboardCheck,
    FaUserAlt,
    FaUserClock,
    FaHammer,
} from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { MdWork } from "react-icons/md";
import { SiAnalogue } from "react-icons/si";
import {
    checkIfAdmin,
    checkIfColaborador,
    checkIfGestor,
} from "../../Functions";
import { ImBooks } from "react-icons/im";
import MenuLink from "../MenuLink";
import { GoPrimitiveDot } from "react-icons/go";

interface SideBarProps {
    type: any | null;
}

const SideBar: React.FC<SideBarProps> = ({ type }) => {
    const isAdmin = checkIfAdmin(type.perfis);
    const isGestor = checkIfGestor(type.perfis);
    const isColaborador = checkIfColaborador(type.perfis);

    return (
        <>
            {(isGestor || isColaborador) && (
                <div className="side__block">
                    <span>Ponto</span>
                    <ul>
                        <li>
                            <MenuLink
                                icon={
                                    <GoPrimitiveDot color="#5850EC" size={18} />
                                }
                                text="Marcar ponto"
                                from="dashboard"
                                link="/marcar"
                                hasKids={true}
                            />
                        </li>
                        <li>
                            <MenuLink
                                icon={
                                    <GoPrimitiveDot color="#5850EC" size={18} />
                                }
                                text="Pontos"
                                from="dashboard"
                                link="/pontos"
                                hasKids={true}
                            />
                        </li>

                        <li>
                            <MenuLink
                                icon={<ImBook color="#222" size={18} />}
                                text="Espelho"
                                from="dashboard"
                                link="/espelho"
                            />
                        </li>
                    </ul>
                </div>
            )}

            {(isGestor || isAdmin) && (
                <div className="side__block">
                    <span>Cadastro e consulta</span>
                    <ul>
                        <li>
                            <MenuLink
                                icon={<FaUserAlt color="#222" size={18} />}
                                text="Usuários"
                                from="dashboard"
                                link="/usuarios"
                            />
                        </li>
                        <li>
                            <MenuLink
                                icon={
                                    <FaClipboardCheck color="#222" size={18} />
                                }
                                text="Expedientes"
                                from="dashboard"
                                link="/expedientes"
                            />
                        </li>
                        <li>
                            <MenuLink
                                icon={<FaHammer color="#222" size={18} />}
                                text="Função"
                                from="dashboard"
                                link="/funcoes"
                            />
                        </li>
                        <li>
                            <MenuLink
                                icon={<MdWork color="#222" size={18} />}
                                text="Setor"
                                from="dashboard"
                                link="/setores"
                            />
                        </li>
                        <li>
                            <MenuLink
                                icon={<FaUserClock color="#222" size={18} />}
                                text="Horários"
                                from="dashboard"
                                link="/horarios"
                            />
                        </li>
                    </ul>
                </div>
            )}
            {(isGestor || isAdmin) && (
                <div className="side__block">
                    <span>Relatórios</span>
                    <ul>
                        <li>
                            <MenuLink
                                icon={<ImBooks color="#222" size={18} />}
                                text="Relatórios"
                                from="dashboard"
                                link="/relatorios"
                            />
                        </li>
                        <li>
                            <MenuLink
                                icon={<SiAnalogue color="#222" size={18} />}
                                text="Logs"
                                from="dashboard"
                                link="/logs"
                            />
                        </li>
                    </ul>
                </div>
            )}
            {(isGestor || isAdmin || isColaborador) && (
                <div className="side__block">
                    <span>Configurações</span>
                    <ul>
                        <li>
                            <MenuLink
                                icon={<FaCog color="#222" size={18} />}
                                text="Configurações"
                                from="dashboard"
                                link="/settings"
                            />
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};
export default SideBar;
