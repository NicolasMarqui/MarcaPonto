import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import DataTable from "react-data-table-component";
import HeaderInside from "../../../Components/HeaderInside";
import MainContext from "../../../Contexts/MainContext";
import { checkIfGestor, showToast } from "../../../Functions";
import api from "../../../Services/api";
import { ALL_PONTO_COLABORADOR } from "../../../Services/Endpoints";
import { ColumsTablePontos } from "../../../Services/TableColumns";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { GetAllPontosAprovar } from "../../../Services/ApiCalls";
import Lottie from "react-lottie";
import { AiOutlineCloseCircle } from "react-icons/ai";
import EmptyData from "../../../Components/EmptyData";
import Tip from "../../../Components/Tip";
import Q from "query-string";
import ModalCrud from "../../../Components/ModalCrud";
import SelectedPontos from "../../../Components/RenderSelectedRow/Pontos/SelectedPonto";
import AprovarPonto from "../../../Components/RenderSelectedRow/Pontos/AprovarPonto";

interface PontosProps {
    dataPonto: any;
}

const Pontos: React.FC<PontosProps> = ({ dataPonto }) => {
    const { token, setOpenMoreInfo, openMoreInfo } = useContext(MainContext);

    const LOADING = require("../../../Assets/animations/loading.json");

    // ID do colaborador
    const { colaboradorId, perfis } = dataPonto;

    const pontoStatus = [
        {
            id: 0,
            nome: "Aguardando Aprovação",
        },
        {
            id: 1,
            nome: "Aprovado",
        },
        {
            id: 2,
            nome: "Retornado",
        },
    ];

    // State geral
    const [isGestor, setIsGestor] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedPonto, setSelectedPonto] = useState({});
    const [aprovarPontoOpen, setAprovarPontoOpen] = useState(false);
    const {
        statusCodeAllPontosAprovar,
        dataAllPontosAprovar,
    } = GetAllPontosAprovar(
        token,
        colaboradorId,
        pontoStatus[0].id,
        openMoreInfo
    );

    // State filtros
    const [data, setData] = useState<any[]>([]);
    const [horario, setHorario] = useState<any[]>([]);
    const [tipoPonto, setTipoPonto] = useState<any[]>([]);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedHorario, setSelectedHorario] = useState("");
    const [selectedTipo, setSelectedTipo] = useState("");

    //State tabela de pontos
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [allPontos, setAllPontos] = useState<any[]>([]);
    const [originalData, setOriginalData] = useState<any[]>([]);

    useEffect(() => {
        setIsGestor(checkIfGestor(perfis));
        setOpenMoreInfo(false);
    }, []);

    useEffect(() => {
        getColaboradorPonto();
    }, [openMoreInfo]);

    const getColaboradorPonto = async () => {
        setIsFetchingData(true);
        await api
            .get(
                `${ALL_PONTO_COLABORADOR}/${colaboradorId}?statusDoPonto=${pontoStatus[1].id}`,
                {
                    headers: { Authorization: token },
                }
            )
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllPontos(data);
                    setOriginalData(data);

                    const notDupDate: any = [];
                    const notDupHorario: any = [];
                    const notDupTipo: any = [];

                    data.map((pnt: any) => {
                        if (!notDupDate.includes(pnt.data)) {
                            notDupDate.push(pnt.data);
                        }

                        if (!notDupHorario.includes(pnt.horario)) {
                            notDupHorario.push(pnt.horario);
                        }

                        if (!notDupTipo.includes(pnt.tipoDoRegistro)) {
                            notDupTipo.push(pnt.tipoDoRegistro);
                        }

                        setData(notDupDate);
                        setHorario(notDupHorario);
                        setTipoPonto(notDupTipo);
                    });
                }

                setIsFetchingData(false);
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    const handleClosingFilter = (type: string) => {
        switch (type) {
            case "DATA":
                setSelectedDate("");

                if (selectedHorario) {
                    setAllPontos(
                        originalData.filter(
                            (p: any) => p.horario === selectedHorario
                        )
                    );
                } else if (selectedTipo) {
                    setAllPontos(
                        originalData.filter(
                            (p: any) => p.tipoDoRegistro === selectedTipo
                        )
                    );
                } else {
                    setAllPontos(originalData);
                }

                break;
            case "HORARIO":
                setSelectedHorario("");

                if (selectedDate) {
                    setAllPontos(
                        originalData.filter((p: any) => p.data === selectedDate)
                    );
                } else if (selectedTipo) {
                    setAllPontos(
                        originalData.filter(
                            (p: any) => p.tipoDoRegistro === selectedTipo
                        )
                    );
                } else {
                    setAllPontos(originalData);
                }

                break;
            case "TIPO":
                setSelectedTipo("");

                if (selectedHorario) {
                    setAllPontos(
                        originalData.filter(
                            (p: any) => p.horario === selectedHorario
                        )
                    );
                } else if (selectedDate) {
                    setAllPontos(
                        originalData.filter((p: any) => p.data === selectedDate)
                    );
                } else {
                    setAllPontos(originalData);
                }

                break;
        }
    };

    const showMoreInfo = async (dataFromRow: any) => {
        setOpenMoreInfo(true);
        setSelectedPonto(dataFromRow);
    };

    const showPontoAprovar = async (dataFromRow: any) => {
        setAprovarPontoOpen(true);
        setSelectedPonto(dataFromRow);
    };

    const closeModalMoreInfo = () => {
        setOpenMoreInfo(false);
        return true;
    };

    const closeModalAprovar = () => {
        setAprovarPontoOpen(false);
        return true;
    };

    return (
        <>
            <Tip content={"Isso é uma dica"} />
            <div className="pontos__wrapper">
                <div className="pontos__header">
                    <HeaderInside isHome={false} nome={"Seus pontos"} />

                    <div className="page__title-info">
                        <div className="tinf__name">
                            <h2 className="tt-title title-blue title-bold">
                                Pontos
                            </h2>
                        </div>
                    </div>
                </div>

                <Tabs defaultIndex={currentTab}>
                    <TabList>
                        <Tab>Todos os pontos</Tab>
                        {isGestor && (
                            <Tab>
                                {`( ${dataAllPontosAprovar.length} )`} Pontos
                                para aprovar
                            </Tab>
                        )}
                    </TabList>

                    <TabPanel>
                        <div className="filter__pontos">
                            <div className="active__filters">
                                <ul>
                                    <li>
                                        <p>Filtros: </p>
                                    </li>
                                    {selectedDate && (
                                        <li>
                                            <div className="current__filter">
                                                <p>{selectedDate}</p>
                                                <AiOutlineCloseCircle
                                                    size={14}
                                                    onClick={() =>
                                                        handleClosingFilter(
                                                            "DATA"
                                                        )
                                                    }
                                                />
                                            </div>
                                        </li>
                                    )}
                                    {selectedHorario && (
                                        <li>
                                            <div className="current__filter">
                                                <p>{selectedHorario}</p>
                                                <AiOutlineCloseCircle
                                                    size={14}
                                                    onClick={() =>
                                                        handleClosingFilter(
                                                            "HORARIO"
                                                        )
                                                    }
                                                />
                                            </div>
                                        </li>
                                    )}
                                    {selectedTipo && (
                                        <li>
                                            <div className="current__filter">
                                                <p>{selectedTipo}</p>
                                                <AiOutlineCloseCircle
                                                    size={14}
                                                    onClick={() =>
                                                        handleClosingFilter(
                                                            "TIPO"
                                                        )
                                                    }
                                                />
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="all__filters">
                                <ul className="pontos__filter">
                                    <li>
                                        <div className="form__group">
                                            <select
                                                defaultValue="Data"
                                                onChange={(e: any) => {
                                                    setSelectedDate(
                                                        e.target.value
                                                    );

                                                    setAllPontos(
                                                        allPontos.filter(
                                                            (p: any) =>
                                                                p.data ===
                                                                e.target.value
                                                        )
                                                    );
                                                }}
                                            >
                                                <option
                                                    disabled
                                                    selected={
                                                        selectedDate === ""
                                                    }
                                                >
                                                    Data
                                                </option>
                                                {data ? (
                                                    data.map((dt: any) => (
                                                        <option value={dt}>
                                                            {dt}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>
                                                        Carregando
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form__group">
                                            <select
                                                defaultValue="Horário"
                                                onChange={(e: any) => {
                                                    setSelectedHorario(
                                                        e.target.value
                                                    );

                                                    setAllPontos(
                                                        allPontos.filter(
                                                            (p: any) =>
                                                                p.horario ===
                                                                e.target.value
                                                        )
                                                    );
                                                }}
                                            >
                                                <option
                                                    disabled
                                                    selected={
                                                        selectedHorario === ""
                                                    }
                                                >
                                                    Horário
                                                </option>
                                                {horario ? (
                                                    horario.map((dt: any) => (
                                                        <option value={dt}>
                                                            {dt}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>
                                                        Carregando
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form__group">
                                            <select
                                                defaultValue="Tipo de ponto"
                                                onChange={(e: any) => {
                                                    setSelectedTipo(
                                                        e.target.value
                                                    );

                                                    setAllPontos(
                                                        allPontos.filter(
                                                            (p: any) =>
                                                                p.tipoDoRegistro ===
                                                                e.target.value
                                                        )
                                                    );
                                                }}
                                            >
                                                <option
                                                    disabled
                                                    selected={
                                                        selectedTipo === ""
                                                    }
                                                >
                                                    Tipo de ponto
                                                </option>
                                                {tipoPonto ? (
                                                    tipoPonto.map((dt: any) => (
                                                        <option value={dt}>
                                                            {dt}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>
                                                        Carregando
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="pontos__table">
                            {!isFetchingData ? (
                                <DataTable
                                    data={allPontos}
                                    noHeader={true}
                                    columns={ColumsTablePontos}
                                    striped={true}
                                    pagination={true}
                                    onRowClicked={showMoreInfo}
                                    pointerOnHover={true}
                                    highlightOnHover={true}
                                    noDataComponent={
                                        <EmptyData hasMargin={true} />
                                    }
                                />
                            ) : (
                                <div className="animation__wrapper">
                                    <Lottie
                                        options={{
                                            loop: true,
                                            animationData: LOADING,
                                        }}
                                        height={150}
                                        width={150}
                                    />
                                    <h2>
                                        Estamos carregando seus dados
                                        <span role="img" aria-label="Whoops">
                                            🧐
                                        </span>{" "}
                                    </h2>
                                </div>
                            )}
                        </div>
                    </TabPanel>

                    {isGestor && (
                        <TabPanel>
                            {statusCodeAllPontosAprovar === 200 ? (
                                <DataTable
                                    data={dataAllPontosAprovar}
                                    noHeader={true}
                                    columns={ColumsTablePontos}
                                    striped={true}
                                    pagination={true}
                                    onRowClicked={showPontoAprovar}
                                    pointerOnHover={true}
                                    highlightOnHover={true}
                                    noDataComponent={
                                        <EmptyData hasMargin={true} />
                                    }
                                />
                            ) : (
                                <div className="animation__wrapper">
                                    <Lottie
                                        options={{
                                            loop: true,
                                            animationData: LOADING,
                                        }}
                                        height={150}
                                        width={150}
                                    />
                                </div>
                            )}
                        </TabPanel>
                    )}
                </Tabs>
            </div>

            {openMoreInfo && (
                <ModalCrud onClose={closeModalMoreInfo}>
                    {selectedPonto ? (
                        <SelectedPontos dataPonto={selectedPonto} />
                    ) : (
                        ""
                    )}
                </ModalCrud>
            )}

            {aprovarPontoOpen && (
                <ModalCrud onClose={closeModalAprovar}>
                    {selectedPonto ? (
                        <AprovarPonto dataPonto={selectedPonto} />
                    ) : (
                        ""
                    )}
                </ModalCrud>
            )}
        </>
    );
};
export default Pontos;
