import { useState, useEffect, useContext } from "react";
import Axios from "axios";

import api from "./api";
import {
    ALL_COLABORADORES,
    INSERT_COLABORADORES,
    ALL_COLABORADORES_BY_GESTOR,
    ALL_COLABORADORES_BY_STATUS,
    ALL_DIAS_DA_SEMANA,
    ALL_EXPEDIENTE,
    INSERT_EXPEDIENTE,
    ALL_EXPEDIENTE_BY_GESTOR,
    ALL_EXPEDIENTE_BY_STATUS,
    ALL_FUNCAO,
    ALL_FUNCAO_BY_SETOR_ATIVO,
    INSERT_FUNCAO,
    ALL_FUNCAO_BY_STATUS,
    ALL_HORARIOS,
    INSERT_HORARIOS,
    ALL_PONTO,
    ALL_PONTO_APROVAR_GESTOR,
    ALL_PONTO_COLABORADOR,
    INSERT_PONTO,
    ALL_SETOR,
    ALL_SETOR_BY_STATUS,
    INSERT_SETOR,
    ALL_REGISTRO,
    STATUS_PONTO,
} from "./Endpoints";
import { stat } from "fs";
import { getLogDate, showToast } from "../Functions";
import MainContext from "../Contexts/MainContext";

// COLABORADORES ==================================================================
export const GetAllColaboradores = (
    token: string | null,
    closedModal?: boolean | undefined
) => {
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
    }, [closedModal]);

    // if (!token) return false;

    return {
        dataAllColaboradores: apiData as any,
        statusCodeAllColaboradores: statusCode,
    };
};

export async function insertNewColaborador(token: string | null, data: any) {
    if (!token) return false;

    return await api
        .post(INSERT_COLABORADORES, data, { headers: { Authorization: token } })
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
}

export async function getColaboradorById(token: string, id: number) {
    if (!token) return false;

    await api
        .get(`${ALL_COLABORADORES}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function updateColaboradorById(
    token: string | null,
    id: number,
    data: any
) {
    if (!token) return false;

    return await api
        .put(`${ALL_COLABORADORES}/${id}`, data, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function deleteColaboradorById(token: string | null, id: number) {
    if (!token) return false;

    return await api
        .delete(`${ALL_COLABORADORES}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function showAllColaboradoresFromGestor(
    token: string,
    gestorID: number
) {
    if (!token) return false;

    await api
        .get(`${ALL_COLABORADORES_BY_GESTOR}/${gestorID}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getColaboradoresByStatus(token: string, status: boolean) {
    if (!token) return false;

    await api
        .get(`${ALL_COLABORADORES_BY_STATUS}?status=${status}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

// DIA DA SEMANA ==========================================================
export async function allDiasDaSemana(token: string) {
    if (!token) return false;

    await api
        .get(ALL_DIAS_DA_SEMANA, { headers: { Authorization: token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

// EXPEDIENTE =============================================================
export function GetAllExpediente(
    token: string | null,
    closedModal?: boolean | undefined
) {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(ALL_EXPEDIENTE, { headers: { Authorization: token } })
            .then((response) => {
                const { status, data } = response;
                setApiData(data);
                setStatusCode(status);
            })
            .catch((err) => {
                return err;
            });
    }, [closedModal]);

    return {
        dataAllExpedientes: apiData as any,
        statusCodeAllExpedientes: statusCode,
    };
}

export async function getAllExpediente(token: string | null) {
    if (!token) return false;

    return await api
        .get(ALL_EXPEDIENTE, { headers: { Authorization: token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function insertNewExpediente(token: string | null, data: any) {
    if (!token) return false;

    return await api
        .post(INSERT_EXPEDIENTE, data, { headers: { Authorization: token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getExpedienteById(token: string | null, id: number) {
    if (!token) return false;

    return await api
        .get(`${ALL_EXPEDIENTE}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function updateExpedienteById(
    token: string | null,
    id: number,
    data: any
) {
    if (!token) return false;

    return await api
        .put(`${ALL_EXPEDIENTE}/${id}`, data, {
            headers: { Authorization: token },
        })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => {
            console.log(`FROM FILE ${err.message}`);
            return err;
        });
}

export async function deleteExpedienteById(token: string | null, id: number) {
    if (!token) return false;

    return await api
        .delete(`${ALL_EXPEDIENTE}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function showAllExpedientesFromGestor(
    token: string,
    gestorID: number
) {
    if (!token) return false;

    await api
        .get(`${ALL_EXPEDIENTE_BY_GESTOR}/${gestorID}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getExpedientesByStatus(token: string, status: boolean) {
    if (!token) return false;

    await api
        .get(`${ALL_EXPEDIENTE_BY_STATUS}?status=${status}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

// FUNÇAO ==========================================================================
export function GetAllFuncoes(
    token: string | null,
    closedModal?: boolean | undefined
) {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(ALL_FUNCAO, { headers: { Authorization: token } })
            .then((response) => {
                const { status, data } = response;
                setApiData(data);
                setStatusCode(status);
            })
            .catch((err) => {
                return err;
            });
    }, [closedModal]);

    return {
        dataAllFuncoes: apiData as any,
        statusCodeAllFuncoes: statusCode,
    };
}

export async function getAllFuncoes(token: string | null) {
    if (!token) return false;

    return await api
        .get(ALL_FUNCAO, { headers: { Authorization: token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function insertNewFuncao(token: string, data: any) {
    if (!token) return false;

    await api
        .post(INSERT_FUNCAO, { headers: { Authorization: token } }, data)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getFuncaoById(token: string | null, id: number) {
    if (!token) return false;

    return await api
        .get(`${ALL_FUNCAO}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function updateFuncaoById(token: string, id: number) {
    if (!token) return false;

    await api
        .put(`${ALL_FUNCAO}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function deleteFuncaoById(token: string, id: number) {
    if (!token) return false;

    await api
        .delete(`${ALL_EXPEDIENTE}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function showAllFuncoesFromSetorAtivo(
    token: string,
    setorID: number,
    setorAtivo: boolean
) {
    if (!token) return false;

    await api
        .get(
            `${ALL_FUNCAO_BY_SETOR_ATIVO}?ativo=${setorAtivo}&setorId=${setorID}`,
            {
                headers: { Authorization: token },
            }
        )
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function showAllFuncoesFromSetorID(
    token: string,
    setorID: number
) {
    if (!token) return false;

    await api
        .get(`${ALL_FUNCAO_BY_SETOR_ATIVO}/${setorID}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getFuncoesByStatus(token: string, status: boolean) {
    if (!token) return false;

    await api
        .get(`${ALL_FUNCAO_BY_STATUS}?status=${status}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

//HORARIO ====================================================================
export function GetAllHorarios(
    token: string | null,
    closedModal?: boolean | undefined
) {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(ALL_HORARIOS, { headers: { Authorization: token } })
            .then((response) => {
                const { status, data } = response;
                setApiData(data);
                setStatusCode(status);
            })
            .catch((err) => {
                return err;
            });
    }, [closedModal]);

    return {
        dataAllHorarios: apiData as any,
        statusCodeAllHorarios: statusCode,
    };
}
export async function getAllHorarios(token: string) {
    if (!token) return false;

    await api
        .get(ALL_HORARIOS, { headers: { Authorization: token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function insertNewHorario(token: string, data: any) {
    if (!token) return false;

    await api
        .post(INSERT_HORARIOS, { headers: { Authorization: token } }, data)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getHorarioById(token: string, id: number) {
    if (!token) return false;

    await api
        .get(`${ALL_HORARIOS}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function updateHorarioById(token: string, id: number) {
    if (!token) return false;

    await api
        .put(`${ALL_HORARIOS}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function deleteHorarioById(token: string, id: number) {
    if (!token) return false;

    await api
        .delete(`${ALL_HORARIOS}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

// PONTO =============================================================
export const GetAllPontos = (token: string | null) => {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(ALL_PONTO, { headers: { Authorization: token } })
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
        dataAllPontos: apiData as any,
        statusCodeAllPontos: statusCode,
    };
};

export const GetAllPontosID = (token: string | null, id: number | null) => {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(`${ALL_PONTO}/${id}`, { headers: { Authorization: token } })
            .then((response) => {
                const { status, data } = response;
                setApiData(data);
                console.log(data);
                setStatusCode(status);
            })
            .catch((err) => {
                return err;
            });
    }, []);

    return {
        dataAllPontos: apiData as any,
        statusCodeAllPontos: statusCode,
    };
};

export const GetAllPontosAprovar = (
    token: string | null,
    id: Number | null,
    statusID: Number | null
) => {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(`${ALL_PONTO_COLABORADOR}/${id}?statusDoPonto=${statusID}`, {
            headers: { Authorization: token },
        })
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
        dataAllPontosAprovar: apiData as any,
        statusCodeAllPontosAprovar: statusCode,
    };
};

export async function insertNewPonto(token: string, data: any) {
    if (!token) return false;

    await api
        .post(INSERT_PONTO, { headers: { Authorization: token } }, data)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getAllPontosFromColaborador(token: string, id: number) {
    if (!token) return false;

    await api
        .get(`${ALL_PONTO_COLABORADOR}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getAllPontosToApprove(token: string, id: number) {
    if (!token) return false;

    await api
        .get(`${ALL_PONTO_APROVAR_GESTOR}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

// SETOR ===================================================================
export function GetAllSetores(
    token: string | null,
    closedModal?: boolean | undefined
) {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(ALL_SETOR, { headers: { Authorization: token } })
            .then((response) => {
                const { status, data } = response;
                setApiData(data);
                setStatusCode(status);
            })
            .catch((err) => {
                return err;
            });
    }, [closedModal]);

    return {
        dataAllSetores: apiData as any,
        statusCodeAllSetores: statusCode,
    };
}

export async function getAllSetores(token: string) {
    if (!token) return false;

    await api
        .get(ALL_SETOR, { headers: { Authorization: token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function insertNewSetor(token: string, data: any) {
    if (!token) return false;

    await api
        .post(INSERT_SETOR, { headers: { Authorization: token } }, data)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getSetorById(token: string, id: number) {
    if (!token) return false;

    await api
        .get(`${ALL_SETOR}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function updateSetorById(token: string, id: number) {
    if (!token) return false;

    await api
        .put(`${ALL_SETOR}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function deleteSetorById(token: string, id: number) {
    if (!token) return false;

    await api
        .delete(`${ALL_SETOR}/${id}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export async function getSetoresByStatus(token: string, status: boolean) {
    if (!token) return false;

    await api
        .get(`${ALL_SETOR_BY_STATUS}?status=${status}`, {
            headers: { Authorization: token },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

// TIPO DE REGISTRO
export const GetAllTiposRegistro = (token: string | null) => {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(`${ALL_REGISTRO}`, {
            headers: { Authorization: token },
        })
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
        dataAllTiposRegistro: apiData as any,
        statusCodeAllTiposRegistro: statusCode,
    };
};

export async function getAllTiposDeRegistro(token: string) {
    if (!token) return false;

    await api
        .get(ALL_REGISTRO, { headers: { Authorization: token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

// STATUS DO PONTO
export function GetAllStatus(token: string | null) {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        api.get(STATUS_PONTO, { headers: { Authorization: token } })
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
        dataAllStatus: apiData as any,
        statusCodeAllStatus: statusCode,
    };
}

//NOTIFICAÇÕES E LOGS
//Novo logs
export const insertNewLog = (id: Number | null, content: String) => {
    if (!id) return false;

    Axios.post(`http://localhost:3333/api/logs/${id}`, { content })
        .then((response: any) => {
            return {
                status: "SUCCESS",
                message: "Log adicionado com sucesso",
            };
        })
        .catch((err: any) => {
            return err;
        });
};

export const GetAllLogs = (id: Number | null) => {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    useEffect(() => {
        Axios.get(`http://localhost:3333/api/logs/${id}`)
            .then((response: any) => {
                const { status, data } = response;

                const withDateFormat = [];

                for (let i = 0; i < data.data.length; i++) {
                    let newElement = {
                        isRead: data.data[i].isRead,
                        _id: data.data[i]._id,
                        idUser: data.data[i].idUser,
                        content: data.data[i].content,
                        date: getLogDate(new Date(data.data[i].date)),
                    };

                    withDateFormat.push(newElement);
                }

                setApiData(withDateFormat);
                setStatusCode(status);
            })
            .catch((err: any) => {
                return err;
            });
    }, []);

    return {
        dataAllLogs: apiData as any,
        statusCodeAllLogs: statusCode,
    };
};

export const GetAllNotifications = (id: Number | null, hasRead?: boolean) => {
    const [statusCode, setStatusCode] = useState(0);
    const [apiData, setApiData] = useState<any[]>([]);

    const { setNotificationCount, notificationCount } = useContext(MainContext);

    useEffect(() => {
        Axios.get(`http://localhost:3333/api/notifications/${id}`)
            .then((response: any) => {
                const { status, data } = response;
                setApiData(data.data);
                setNotificationCount(data.data.length);
                setStatusCode(status);
            })
            .catch((err: any) => {
                return err;
            });
    }, [notificationCount]);

    return {
        dataAllNotifications: apiData as any,
        statusCodeAllNotifications: statusCode,
    };
};

export const makeOneNotificationRead = (id: Number | null) => {
    if (!id) return false;

    Axios.put(`http://localhost:3333/api/notification/${id}`)
        .then((response: any) => {
            const { status } = response;

            if (status === 200) {
                showToast("SUCCESS", "Notificação lida 😊", {});
            } else {
                showToast("ERROR", "😕", {});
            }
        })
        .catch((err: any) => {
            return err;
        });
};

export const makeAllNotificationRead = (id: Number | null) => {
    if (!id) return false;

    Axios.put(`http://localhost:3333/api/notification/all/${id}`)
        .then((response: any) => {
            const { status } = response;

            if (status === 200) {
                showToast("SUCCESS", "Todas notificações lidas 😊", {});
            } else {
                showToast("ERROR", "😕", {});
            }
        })
        .catch((err: any) => {
            return err;
        });
};
