import { GetAllLogs } from "./../Services/ApiCalls";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainContext from "../Contexts/MainContext";
import {
    GetAllColaboradores,
    GetAllExpediente,
    GetAllFuncoes,
    GetAllHorarios,
    GetAllSetores,
} from "../Services/ApiCalls";

export const showToast = (type = "SUCCESS", text = "-", { ...options }) => {
    if (type === "SUCCESS") {
        return toast.success(text, { ...options });
    } else if (type === "ERROR") {
        return toast.error(text);
    } else if (type === "WARNING") {
        return toast.warn(text);
    } else {
        return toast(text);
    }
};

export const getTodayInfo = () => {
    let now = new Date();

    const dayName = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ];
    const monName = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    return (
        dayName[now.getDay()] +
        "," +
        now.getDate() +
        " de " +
        monName[now.getMonth()] +
        " de " +
        now.getFullYear()
    );
};

export const getTodayDate = () => {
    let now = new Date();
    return `${now.getDate() < 10 ? "0" + now.getDate() : now.getDate()}/${
        now.getMonth() + 1 < 10
            ? "0" + (now.getMonth() + 1)
            : now.getMonth() + 1
    }/${now.getFullYear()}`;
};

export const getHour = (date: any) => {
    let hour = date.getHours();
    let min = date.getMinutes();

    return `${hour}:${min}`;
};

export const getLogDate = (data: any) => {
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let year = data.getFullYear();
    let month = months[data.getMonth()];
    let date = data.getDate();
    let hour = data.getHours();
    let min = data.getMinutes();
    let sec = data.getSeconds();
    let time =
        date +
        " de " +
        month +
        " " +
        year +
        " - " +
        hour +
        ":" +
        min +
        ":" +
        sec;

    return time;
};

export const getMonth = () => {
    const monName = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];
    return monName[new Date().getMonth()];
};

export const getTodayDateConsulta = () => {
    let now = new Date();
    return `${now.getFullYear()}-${
        now.getMonth() + 1 < 10
            ? "0" + (now.getMonth() + 1)
            : now.getMonth() + 1
    }-${now.getDate() < 10 ? "0" + now.getDate() : now.getDate()}`;
};

export const handleUndefined = (item: any) => {
    return item === undefined || item === null || !item ? "Tester" : item;
};

export const CapitalizeString = (s: string) => {
    return s.toString().charAt(0).toUpperCase() + s.slice(1);
};

export const checkIfAdmin = (arr: [string]) => {
    return arr.includes("ADMIN") || arr.includes("admin") ? true : false;
};

export const checkIfGestor = (arr: [string]) => {
    return arr.includes("RESPONSAVEL") || arr.includes("GESTOR") ? true : false;
};

export const checkIfColaborador = (arr: [string]) => {
    return arr.includes("COLABORADOR") || arr.includes("colaborador")
        ? true
        : false;
};

export const getOnlyAmount = (arr: any, amount: number) => {
    return arr.splice(0, amount);
};

export function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const getCurrentFlag = (locale: string) => {
    switch (locale) {
        case "pt-BR":
            return "br";
        case "en-US":
            return "us";
        case "es-ES":
            return "es";
        case "de-DE":
            return "de";
        case "fr-FR":
            return "fr";
        default:
            return "br";
    }
};

export const previousMonths = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

export const AllRelatorios = () => {
    const { token, currentLoggedUserId } = useContext(MainContext);

    const {
        dataAllColaboradores,
        statusCodeAllColaboradores,
    } = GetAllColaboradores(token);

    const { dataAllExpedientes, statusCodeAllExpedientes } = GetAllExpediente(
        token
    );
    const { dataAllFuncoes, statusCodeAllFuncoes } = GetAllFuncoes(token);
    const { dataAllSetores, statusCodeAllSetores } = GetAllSetores(token);
    const { dataAllHorarios, statusCodeAllHorarios } = GetAllHorarios(token);
    const { dataAllLogs, statusCodeAllLogs } = GetAllLogs(currentLoggedUserId);

    const arrayRelatorios = [
        {
            id: 1,
            nome: "Usuários",
            can: ["GESTOR"],
            headers: ["ID", "Nome", "Email", "Função", "Expediente", "Ativo"],
            data:
                statusCodeAllColaboradores === 200
                    ? dataAllColaboradores.map((c: any) => [
                          c.id,
                          c.nome,
                          c.email,
                          c.funcaoId,
                          c.expedienteId,
                          c.ativo ? "Sim" : "Não",
                      ])
                    : [],
        },
        {
            id: 2,
            nome: "Expedientes",
            can: ["GESTOR"],
            headers: ["ID", "Nome", "Descrição", "Ativo"],
            data:
                statusCodeAllExpedientes === 200
                    ? dataAllExpedientes.map((c: any) => [
                          c.id,
                          c.nome,
                          c.descricao,
                          c.ativo ? "Sim" : "Não",
                      ])
                    : [],
        },
        {
            id: 3,
            nome: "Função",
            can: ["GESTOR"],
            headers: [
                "ID",
                "Nome",
                "ID - Responsável",
                "Responsável",
                "ID - Setor",
            ],
            data:
                statusCodeAllFuncoes === 200
                    ? dataAllFuncoes.map((c: any) => [
                          c.id,
                          c.nome,
                          c.funcaoResponsavelId,
                          c.responsavel ? "Sim" : "Não",
                          c.setorId,
                      ])
                    : [],
        },
        {
            id: 4,
            nome: "Setor",
            can: ["GESTOR"],
            headers: ["ID", "Nome", "Ativo"],
            data:
                statusCodeAllSetores === 200
                    ? dataAllSetores.map((c: any) => [
                          c.id,
                          c.nome,
                          c.ativo ? "Sim" : "Não",
                      ])
                    : [],
        },
        {
            id: 5,
            nome: "Horários",
            can: ["GESTOR"],
            headers: [
                "ID",
                "Dia da Semana",
                "ID - Expediente",
                "Horário",
                "Tipo de Registro",
                "Tolerância Atraso",
                "Tolerância Extra",
            ],
            data:
                statusCodeAllHorarios === 200
                    ? dataAllHorarios.map((c: any) => [
                          c.id,
                          c.diaDaSemana,
                          c.expedienteId,
                          c.horario,
                          c.tipoRegistro,
                          c.toleranciaAtraso,
                          c.toleranciaExtra,
                      ])
                    : [],
        },
        {
            id: 6,
            nome: "Logs",
            can: ["GESTOR", "COLABORADOR"],
            headers: ["Conteúdo", "Data"],
            data:
                statusCodeAllLogs === 200
                    ? dataAllLogs.map((c: any) => [c.content, c.date])
                    : [],
        },
    ];

    return {
        relatorioData: arrayRelatorios as any,
    };
};
