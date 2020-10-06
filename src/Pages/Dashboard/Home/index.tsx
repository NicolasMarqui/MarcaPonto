import React, { useEffect } from "react";
import "./styles.scss";
import UserRender from "../../../Components/UserRender";
import { usePosition } from "use-position";
import { checkIfAdmin, checkIfGestor } from "../../../Functions";
import GestorRender from "../../../Components/GestorRender";
import AdminRender from "../../../Components/AdminRender";

interface HomeProps {
    data: any;
}

const Home: React.FC<HomeProps> = ({ data }) => {
    const isAdmin = checkIfAdmin(data.perfis);
    const isGestor = checkIfGestor(data.perfis);

    useEffect(() => {
        document.title = "Marca Ponto - Dashboard";
    }, []);

    let watch = false;
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        errorMessage,
    } = usePosition(watch);

    return (
        <div className="home__wrapper">
            {isAdmin ? (
                <AdminRender />
            ) : isGestor ? (
                <GestorRender />
            ) : (
                <UserRender />
            )}
        </div>
    );
};
export default Home;
