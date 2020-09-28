import React from "react";
import { FaHome, FaCog } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import MenuLink from "../MenuLink";

interface SideBarProps {
    type: string;
}

const SideBar: React.FC<SideBarProps> = ({ type }) => {
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
            <li>
                <MenuLink
                    icon={<ImBook color="white" size={24} />}
                    text="Espelho"
                    from="dashboard"
                    link="/espelho"
                />
            </li>
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
