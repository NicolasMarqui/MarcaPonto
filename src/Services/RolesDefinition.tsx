import React from "react";
import MarcarPonto from "../Components/MarcarPonto";
import Types from "./RolesTypes";
import { FaCog } from "react-icons/fa";
import IconLink from "../Components/IconLink";

export default [
    {
        id: 1,
        title: Types.MARCAR_PONTO,
        canAccess: [Types.USER, Types.ADMIN],
        config: {
            height: "full",
            size: 2,
        },
        content: <MarcarPonto colaboradorId={0} />,
    },
    {
        id: 2,
        title: Types.VER_ESPELHO,
        link: "/dashboard/espelho",
        canAccess: [Types.USER, Types.ADMIN],
        config: {
            height: "auto",
            size: 1,
        },
        content: <h1>Espelho</h1>,
    },
    {
        id: 3,
        title: Types.CONFIGURACOES,
        link: "/dashboard/settings",
        canAccess: [Types.USER, Types.ADMIN],
        config: {
            height: "auto",
            size: 1,
        },
        content: <h1>Espelho</h1>,
    },
    {
        id: 4,
        title: Types.CADASTRO_SETOR,
        link: "/dashboard/cadastro/setor",
        canAccess: [Types.ADMIN],
        config: {
            height: "auto",
            size: 1,
        },
        content: <h1>Cadastro setor</h1>,
    },
];
