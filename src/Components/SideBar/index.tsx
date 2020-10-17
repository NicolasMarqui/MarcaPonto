import React from "react";
import {
    FaHome,
    FaCog,
    FaClipboardCheck,
    FaUserAlt,
    FaUserClock,
    FaHammer,
} from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { MdWork } from "react-icons/md";
import {
    checkIfAdmin,
    checkIfColaborador,
    checkIfGestor,
} from "../../Functions";
import { ImBooks } from "react-icons/im";
import MenuLink from "../MenuLink";

interface SideBarProps {
    type: any | null;
}

const SideBar: React.FC<SideBarProps> = ({ type }) => {
    const isAdmin = checkIfAdmin(type.perfis);
    const isGestor = checkIfGestor(type.perfis);
    const isColaborador = checkIfColaborador(type.perfis);

    return (
        <ul>
            <li>
                <MenuLink
                    icon={<FaHome color="white" size={24} />}
                    text="Home"
                    from="dashboard"
                    link="/"
                />
            </li>
            {(isGestor || isColaborador) && (
                <li>
                    <MenuLink
                        icon={<ImBook color="white" size={24} />}
                        text="Espelho"
                        from="dashboard"
                        link="/espelho"
                    />
                </li>
            )}
            {(isAdmin || isGestor) && (
                <li>
                    <MenuLink
                        icon={<FaUserAlt color="white" size={24} />}
                        text="Usuários"
                        from="dashboard"
                        link="/usuarios"
                    />
                </li>
            )}
            {(isAdmin || isGestor) && (
                <li>
                    <MenuLink
                        icon={<FaClipboardCheck color="white" size={24} />}
                        text="Expedientes"
                        from="dashboard"
                        link="/expedientes"
                    />
                </li>
            )}
            {(isAdmin || isGestor) && (
                <li>
                    <MenuLink
                        icon={<FaHammer color="white" size={24} />}
                        text="Função"
                        from="dashboard"
                        link="/funcoes"
                    />
                </li>
            )}
            {(isAdmin || isGestor) && (
                <li>
                    <MenuLink
                        icon={<MdWork color="white" size={24} />}
                        text="Setor"
                        from="dashboard"
                        link="/setores"
                    />
                </li>
            )}
            {(isAdmin || isGestor) && (
                <li>
                    <MenuLink
                        icon={<FaUserClock color="white" size={24} />}
                        text="Horários"
                        from="dashboard"
                        link="/horarios"
                    />
                </li>
            )}
            {(isAdmin || isGestor) && (
                <li>
                    <MenuLink
                        icon={<ImBooks color="white" size={24} />}
                        text="Relatórios"
                        from="dashboard"
                        link="/relatorios"
                    />
                </li>
            )}
            <li>
                <MenuLink
                    icon={<FaCog color="white" size={24} />}
                    text="Configurações"
                    from="dashboard"
                    link="/settings"
                />
            </li>
        </ul>
    );
};
export default SideBar;
