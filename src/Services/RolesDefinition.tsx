import Types from "./RolesTypes";

export default {
    roles: [
        {
            type: "comum",
            canDo: [
                Types.MARCAR_PONTO,
                Types.VER_ESPELHO,
                Types.DOWNLOAD_ESPELHO,
            ],
        },
        {
            type: "admin",
            canDo: [
                Types.MARCAR_PONTO,
                Types.VER_ESPELHO,
                Types.DOWNLOAD_ESPELHO,
            ],
        },
    ],
};
