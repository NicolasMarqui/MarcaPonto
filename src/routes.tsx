import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./Services/PrivateRoute";

import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
