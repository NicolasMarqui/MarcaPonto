import React, { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import HeaderInside from "../../../Components/HeaderInside";
import MainContext from "../../../Contexts/MainContext";
import { showToast } from "../../../Functions";
import api from "../../../Services/api";
import { ALL_PONTO_COLABORADOR } from "../../../Services/Endpoints";
import { ColumsTablePontos } from "../../../Services/TableColumns";
import "./styles.scss";

interface PontosProps {
    dataPonto: any;
}

const Pontos: React.FC<PontosProps> = ({ dataPonto }) => {
    const { token } = useContext(MainContext);

    // ID do colaborador
    const { colaboradorId } = dataPonto;

    // State filtros
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [tipoPonto, setTipoPonto] = useState("");

    //State tabela de pontos
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [allPontos, setAllPontos] = useState<any[]>([]);

    useEffect(() => {
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
                    setAllPontos(data);
                }

                setIsFetchingData(false);
            })
            .catch((err) => {
                showToast("ERROR", err.message, {});
            });
    };

    return (
        <div className="pontos__wrapper">
            <div className="pontos__header">
                <HeaderInside isHome={false} nome={"Seus pontos"} />

                <ul className="pontos__filter">
                    <li>
                        <p>Filtrar por: </p>
                    </li>
                    <li>
                        <div className="form__group">
                            <select
                                defaultValue="Dia da semana"
                                onChange={(e) => setData(e.target.value)}
                            >
                                <option disabled>Data</option>
                                <option value="Segunda">2020-06-11</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="form__group">
                            <select defaultValue="Horário">
                                <option disabled>Horário</option>
                                <option value="08:00">08:00</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="form__group">
                            <select defaultValue="Tipo de ponto">
                                <option disabled>Tipo de ponto</option>
                                <option value="Entrada">Entrada</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="pontos__table">
                {!isFetchingData ? (
                    <DataTable
                        data={allPontos}
                        noHeader={true}
                        columns={ColumsTablePontos}
                        striped={true}
                        pagination={true}
                        // onRowClicked={showMoreInfo}
                        pointerOnHover={true}
                        highlightOnHover={true}
                    />
                ) : (
                    "loading"
                )}
            </div>
        </div>
    );
};
export default Pontos;
