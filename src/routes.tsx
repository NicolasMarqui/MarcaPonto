import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { IntlProvider } from "react-intl";

import NotFound from "./Pages/404";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import PrivateRoute from "./Services/PrivateRoute";
import MainContext from "./Contexts/MainContext";
import Landing from "./Pages/Landing";

const messagesInEnglish = {
    helloDashboard: "Welcome ",
};

const messagesInPortuguese = {
    helloDashboard: "Bem Vindo ",
};

const Routes = () => {
    const { browserLanguage } = useContext(MainContext);

    const messages =
        browserLanguage === "pt-BR" ? messagesInPortuguese : messagesInEnglish;

    return (
        <IntlProvider
            messages={messages}
            locale={browserLanguage}
            defaultLocale="pt-BR"
        >
            <BrowserRouter>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    pauseOnHover={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                />
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route
                        path="/login"
                        exact
                        render={(props) => <Login {...props} />}
                    />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </IntlProvider>
    );
};

export default Routes;
