import React, { useEffect, useContext } from "react";
import "./styles.scss";
import UserRender from "../../../Components/UserRender";
import { usePosition } from "use-position";
import { checkIfAdmin, checkIfGestor } from "../../../Functions";
import GestorRender from "../../../Components/GestorRender";
import AdminRender from "../../../Components/AdminRender";
import MainContext from "../../../Contexts/MainContext";

interface HomeProps {
    data: any;
}

const Home: React.FC<HomeProps> = ({ data }) => {
    const { setUserLocalization } = useContext(MainContext);

    const isAdmin = checkIfAdmin(data.perfis);
    const isGestor = checkIfGestor(data.perfis);

    useEffect(() => {
        document.title = "Marca Ponto - Dashboard";
    }, []);

    let watch = false;
    const { latitude, longitude } = usePosition(watch);

    useEffect(() => {
        if (latitude && longitude) {
            setUserLocalization(`[${latitude}, ${longitude}]`);
        }
    }, [latitude, longitude]);

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
