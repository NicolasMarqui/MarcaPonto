import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import HeaderInside from "../../../Components/HeaderInside";
import MainContext from "../../../Contexts/MainContext";
import { AllRelatorios, getTodayInfo, showToast } from "../../../Functions";
import GeneratePDF from "../../../Components/GeneratePDF";
import { insertNewLog } from "../../../Services/ApiCalls";

interface RelatoriosProps {}

const Relatorios: React.FC<RelatoriosProps> = () => {
    const {
        token,
        setNotificationCount,
        notificationCount,
        currentLoggedUserId,
    } = useContext(MainContext);

    const [currentPDF, setCurrentPDF] = useState("");
    const [activeRelatorio, setActiveRelatorio] = useState("");

    useEffect(() => {
        document.title = "Marca Ponto - Relatórios";
    }, []);

    return (
        <div className="pontos__wrapper">
            <div className="pontos__header">
                <HeaderInside isHome={false} nome={"Relatórios"} />

                <div className="page__title-info info__espelho">
                    <div className="tinf__wrapper">
                        <div className="tinf__name">
                            <h2 className="tt-title title-blue title-bold">
                                Relatórios
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relatorios__wrapper">
                <div className="rel__todos">
                    {AllRelatorios().relatorioData.map((r: any) => (
                        <div
                            key={r.id}
                            className={`curr__rel ${
                                r.id === activeRelatorio ? "has__bridge" : ""
                            }`}
                            onClick={() => {
                                const newPDF = GeneratePDF(
                                    r.headers,
                                    r.data,
                                    `Relatório - ${r.nome}`,
                                    `${getTodayInfo()}`
                                );
                                setCurrentPDF(newPDF);
                                setActiveRelatorio(r.id);

                                insertNewLog(
                                    currentLoggedUserId,
                                    `Gerado relatório de ${r.nome}`
                                );

                                setNotificationCount(notificationCount + 1);
                            }}
                        >
                            <h3 className="tt-sub">{r.nome}</h3>
                            <p>Clique para gerar o relatório</p>
                        </div>
                    ))}
                </div>

                <div className="rel__preview">
                    {currentPDF ? (
                        <iframe
                            src={`${currentPDF}#zoom=150`}
                            title="Relatório"
                            frameBorder="0"
                        ></iframe>
                    ) : (
                        <div className="noPDF__selected">
                            <p>Selecione um PDF ao lado</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Relatorios;
