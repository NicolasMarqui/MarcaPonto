import { createContext } from "react";

const MainContext = createContext({
    token: null,
    setToken: (token) => {},
    removeToken: (token) => {},
});

export default MainContext;
