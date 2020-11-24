import { showToast } from "./../Functions/index";
import axios from "axios";

const api = axios.create({
    baseURL: "https://ws-marcaponto.herokuapp.com",
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const access_token = localStorage.getItem("token");
        if (
            (error.response.status === 401 || error.response.status === 403) &&
            access_token
        ) {
            const response = await refreshToken(error);
            return response;
        }
        return Promise.reject(error);
    }
);

async function refreshToken(error: any) {
    return new Promise((resolve, reject) => {
        try {
            const refresh_token = localStorage.getItem("token");

            const header = {
                "Content-Type": "application/json",
                Authorization: refresh_token,
            };
            axios
                .post(
                    "https://ws-marcaponto.herokuapp.com/api/v1/auth/refresh_token",
                    {
                        grant_type: "refresh_token",
                        refresh_token,
                    },
                    {
                        method: "POST",
                        headers: header,
                    }
                )
                .then(async (res) => {
                    console.log(res);
                    // Fazer algo caso seja feito o refresh token
                    return resolve(res);
                })
                .catch((err) => {
                    // Fazer algo caso não seja feito o refresh token
                    localStorage.removeItem("token");
                    window.location.reload();
                    showToast("WARNING", "Faça o Login novamente", {});
                    return reject(error);
                });
        } catch (err) {
            return reject(err);
        }
    });
}

export default api;
