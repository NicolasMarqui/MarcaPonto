import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NotFound from "./Pages/404";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import PrivateRoute from "./Services/PrivateRoute";

const Routes = () => (
    <BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
        />
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
