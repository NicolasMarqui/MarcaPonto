import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

interface HomeProps {
    match: any;
}

const Home: React.FC<HomeProps> = () => {
    useEffect(() => {
        document.title = "Marca Ponto - Dashboard";
    }, []);

    return <Link to={`/dashboard/settings`}>Go to Settings</Link>;
};
export default Home;
