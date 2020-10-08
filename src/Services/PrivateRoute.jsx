import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import MainContext from "../Contexts/MainContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { token } = useContext(MainContext);

    return (
        <Route
            {...rest}
            render={() =>
                token ? (
                    <Component {...rest} />
                ) : (
                    <Redirect to="/?status=Faça o Login para acessar" />
                )
            }
        />
    );
};

export default PrivateRoute;
