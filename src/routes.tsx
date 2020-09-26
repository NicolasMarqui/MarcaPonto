import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
