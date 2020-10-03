import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (type = "SUCCESS", text = "-") => {
    if (type === "SUCCESS") {
        return toast.success(text);
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
    return `${now.getDate() < 1}/${
        now.getMonth() + 1 < 10
            ? "0" + (now.getMonth() + 1)
            : now.getMonth() + 1
    }/${now.getFullYear()}`;
};

export const handleUndefined = (item: any) => {
    return item === undefined || item === null || !item
        ? "Tester"
        : CapitalizeString(item);
};

export const CapitalizeString = (s: string) => {
    return s.toString().charAt(0).toUpperCase() + s.slice(1);
};

export const checkIfAdmin = (arr: [string]) => {
    return arr.includes("ADMIN") || arr.includes("admin") ? true : false;
};
