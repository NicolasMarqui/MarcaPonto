import React, { useEffect } from "react";
import "./styles.scss";
import UserRender from "../../../Components/UserRender";
import { usePosition } from "use-position";

interface HomeProps {
    match: any;
}

const role = "USER";

const Home: React.FC<HomeProps> = () => {
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
            {role === "USER" ? <UserRender /> : ""}
        </div>
    );
};
export default Home;
