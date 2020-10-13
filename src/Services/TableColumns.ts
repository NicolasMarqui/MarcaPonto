export const ColumsTableUser = [
    {
        name: "ID",
        selector: "id",
        sortable: true,
        center: true,
    },
    {
        name: "Nome",
        selector: "nome",
        sortable: true,
        center: true,
    },
    {
        name: "Email",
        selector: "email",
        center: true,
    },
    {
        name: "Função",
        selector: "funcaoId",
        center: true,
    },
    {
        name: "Expediente",
        selector: "expedienteId",
        center: true,
    },
    {
        name: "Ativo",
        selector: "ativo",
        center: true,
    },
];

export const ColumsTableExpediente = [
    {
        name: "ID",
        selector: "id",
        sortable: true,
        center: true,
    },
    {
        name: "Nome",
        selector: "nome",
        sortable: true,
        center: true,
    },
    {
        name: "Descrição",
        selector: "descricao",
        center: true,
    },
    {
        name: "Ativo",
        selector: "ativo",
        center: true,
    },
];

export const ColumsTableFuncoes = [
    {
        name: "ID",
        selector: "id",
        sortable: true,
        center: true,
    },
    {
        name: "Nome",
        selector: "nome",
        sortable: true,
        center: true,
    },
    {
        name: "ID - Responsável",
        selector: "funcaoResponsavelId",
        center: true,
    },
    {
        name: "Responsável",
        selector: "responsavel",
        center: true,
    },
    {
        name: "ID - Setor",
        selector: "setorId",
        center: true,
    },
];

export const ColumsTableSetores = [
    {
        name: "ID",
        selector: "id",
        sortable: true,
        center: true,
    },
    {
        name: "Nome",
        selector: "nome",
        sortable: true,
        center: true,
    },
    {
        name: "Ativo",
        selector: "ativo",
        center: true,
    },
];

export const ColumsTableHorarios = [
    {
        name: "ID",
        selector: "id",
        sortable: true,
        center: true,
    },
    {
        name: "Dia da Semana",
        selector: "diaDaSemana",
        sortable: true,
        center: true,
    },
    {
        name: "ID - Expediente",
        selector: "expedienteId",
        center: true,
    },
    {
        name: "Horário",
        selector: "horario",
        sortable: true,
        center: true,
    },
    {
        name: "Tipo de Registro",
        selector: "tipoRegistro",
        center: true,
    },
    {
        name: "Tolerância Atraso",
        selector: "toleranciaAtraso",
        center: true,
    },
    {
        name: "Tolerância Extra",
        selector: "toleranciaExtra",
        center: true,
    },
];
