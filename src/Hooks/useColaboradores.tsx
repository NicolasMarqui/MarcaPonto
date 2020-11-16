import { useState, useEffect } from "react";
import api from "../Services/api";
import { ALL_COLABORADORES, INSERT_COLABORADORES } from "../Services/Endpoints";

export const GetAllColaboradores = (token: string | null) => {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(ALL_COLABORADORES, { headers: { Authorization: token } })
            .then((response) => {
                const { status, data } = response;
                setApiData(data);
                setStatusCode(status);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    return {
        dataAllColaboradores: apiData as any,
        statusCodeAllColaboradores: statusCode,
    };
};

export const InsertNewColaborador = (token: string | null, data: any) => {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.post(INSERT_COLABORADORES, data, {
            headers: { Authorization: token },
        })
            .then((response) => {
                return {
                    statusType: "SUCCESS",
                    text: "Colaborador adicionado com sucesso 😁",
                    response,
                };
            })
            .catch((err) => {
                return err;
            });
    }, []);
};
