import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import DataTable from "react-data-table-component";
import HeaderInside from "../../../Components/HeaderInside";
import MainContext from "../../../Contexts/MainContext";
import { getMonth, previousMonths, showToast } from "../../../Functions";
import api from "../../../Services/api";
import { ALL_PONTO_COLABORADOR } from "../../../Services/Endpoints";
import { ColumsTablePontos } from "../../../Services/TableColumns";
import { BsChevronDown } from "react-icons/bs";
import EmptyData from "../../../Components/EmptyData";
import Lottie from "react-lottie";
import GeneratePDF from "../../../Components/GeneratePDF";
import { insertNewLog } from "../../../Services/ApiCalls";

interface EspelhoProps {
    dataPonto: any;
}

const Espelho: React.FC<EspelhoProps> = ({ dataPonto }) => {
    const { token, setNotificationCount, notificationCount } = useContext(
        MainContext
    );

    const LOADING = require("../../../Assets/animations/loading.json");

    // ID do colaborador
    const { colaboradorId, username } = dataPonto;

    // State filtros
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const [isOpenMonthDropdown, setIsOpenMonthDropdown] = useState(false);

    //State tabela de pontos
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [allPontos, setAllPontos] = useState<any[]>([]);
    const [originalPontos, setOriginalPontos] = useState<any[]>([]);

    useEffect(() => {
        document.title = "Marca Ponto - Espelho";
        getColaboradorPonto();
    }, []);

    const getColaboradorPonto = async () => {
        setIsFetchingData(true);
        await api
            .get(`${ALL_PONTO_COLABORADOR}/${colaboradorId}`, {
                headers: { Authorization: token },
            })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    if (data) {
                        setAllPontos(
                            data.filter(
                                (p: any) => p.data.split("-")[1] === "11"
                            )
                        );
                    }
                    setOriginalPontos(data);
                }

                setIsFetchingData(false);
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    const handleMonthChange = (m: any, i: any) => {
        setCurrentMonth(m);
        setIsOpenMonthDropdown(false);

        const currentMonthSelector = `${i <= 8 ? "0" : ""}${i + 1}`;

        if (allPontos) {
            setAllPontos(
                allPontos.filter(
                    (pnt: any) =>
                        pnt.data.split("-")[1] === currentMonthSelector
                )
            );
        }
    };

    return (
        <div className="pontos__wrapper">
            <div className="pontos__header">
                <HeaderInside isHome={false} nome={"Espelho"} />

                <div className="page__title-info info__espelho">
                    <div className="tinf__wrapper">
                        <div className="tinf__name">
                            <h2 className="tt-title title-blue title-bold">
                                Espelho
                            </h2>
                        </div>
                        <div className="tinf__month">
                            <p>
                                Marcação de ponto no mês de {""}
                                <strong
                                    onClick={() => {
                                        setIsOpenMonthDropdown(
                                            !isOpenMonthDropdown
                                        );
                                        setAllPontos(originalPontos);
                                    }}
                                >
                                    {currentMonth}
                                </strong>
                                <BsChevronDown size={14} />
                            </p>
                            <div
                                className={`month_dropdown ${
                                    isOpenMonthDropdown ? "drop__shown" : ""
                                }`}
                            >
                                <ul>
                                    {previousMonths.map((m: any, i: any) => (
                                        <li
                                            key={i}
                                            onClick={() =>
                                                handleMonthChange(m, i)
                                            }
                                        >
                                            <p>{m}</p>
                                            <span>2020</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`page__download ${
                            isOpenMonthDropdown ? "is__dropdown" : ""
                        }`}
                    >
                        <a
                            href="#pdf"
                            className={`bt ${
                                allPontos.length === 0 ? "not__available" : ""
                            }`}
                            onClick={() => {
                                const PDFOutput = GeneratePDF(
                                    [
                                        "ID",
                                        "Data",
                                        "Horário",
                                        "Localização",
                                        "Tempo Variável",
                                        "Tipo de Registro",
                                        "Observação",
                                    ],
                                    allPontos.map((p: any) => [
                                        p.id,
                                        p.data,
                                        p.horario,
                                        p.localizacao,
                                        p.tempoVariavel,
                                        p.tipoDoRegistro,
                                        p.obs,
                                    ]),
                                    `Espelho do mês de ${currentMonth}`,
                                    `Pontos do #${colaboradorId}-${username}`
                                );

                                console.log(PDFOutput);

                                insertNewLog(
                                    colaboradorId,
                                    `Download do espelho do mês de ${currentMonth}`
                                );

                                setNotificationCount(notificationCount + 1);
                            }}
                        >
                            Download
                        </a>
                    </div>
                </div>
            </div>

            <div className="pontos__table">
                {!isFetchingData ? (
                    <DataTable
                        data={allPontos}
                        noHeader={true}
                        noDataComponent={<EmptyData hasMargin={true} />}
                        columns={ColumsTablePontos}
                        striped={true}
                        pagination={true}
                        // onRowClicked={showMoreInfo}
                        pointerOnHover={true}
                        highlightOnHover={true}
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
        </div>
    );
};
export default Espelho;
