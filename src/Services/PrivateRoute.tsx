import React from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
    isAuth: Boolean;
    component: any;
}

// TODO -> Colocar Token no localStorage e checar com um Hook se está autenticado

const PrivateRoute = ({ isAuth, component: Component, ...rest }: any) => (
    <Route
        {...rest}
        component={(props: any) =>
            isAuth ? <Component {...props} /> : <Redirect to="/" />
        }
    />
);

export default PrivateRoute;
