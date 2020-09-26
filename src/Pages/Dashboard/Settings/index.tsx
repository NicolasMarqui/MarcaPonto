import React, { useEffect } from "react";
import "./styles.scss";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
    useEffect(() => {
        document.title = "Marca Ponto - Settings";
    }, []);

    return <h1>Settings</h1>;
};
export default Settings;
