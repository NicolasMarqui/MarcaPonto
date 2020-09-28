import axios from "axios";

const api = axios.create({
    baseURL: "https://ws-marcaponto.herokuapp.com",
});

export default api;
