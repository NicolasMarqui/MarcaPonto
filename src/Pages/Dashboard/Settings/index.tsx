import React, { useEffect } from "react";
import "./styles.scss";
import { checkIfAdmin, checkIfGestor } from "../../../Functions";

interface SettingsProps {
    data: any;
}

const Settings: React.FC<SettingsProps> = ({ data }) => {
    useEffect(() => {
        document.title = "Marca Ponto - Settings";
    }, []);

    const isAdmin = checkIfAdmin(data.perfis);
    const isGestor = checkIfGestor(data.perfis);

    return (
        <div className="settings__wrapper">
            <h2>Suas configurações</h2>

            <div className="sw__cont">
                
            </div>
        </div>
    );
};
export default Settings;
