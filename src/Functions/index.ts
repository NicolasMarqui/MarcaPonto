import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
