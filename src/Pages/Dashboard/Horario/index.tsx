import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Lottie from "react-lottie";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component";
import ModalCrud from "../../../Components/ModalCrud";
import { ColumsTableHorarios } from "../../../Services/TableColumns";
import MainContext from "../../../Contexts/MainContext";
import api from "../../../Services/api";
import { ALL_HORARIOS } from "../../../Services/Endpoints";
import { showToast } from "../../../Functions";
import AddSelectedHorario from "../../../Components/RenderSelectedRow/Horarios/AddSelectedHorario";
import SelectedHorario from "../../../Components/RenderSelectedRow/Horarios/SelectedHorario";
import HeaderInside from "../../../Components/HeaderInside";

const LOADING = require("../../../Assets/animations/loading.json");

const Horario: React.FC = () => {
    const {
        token,
        openMoreInfo,
        setOpenMoreInfo,
        hasCloseEditModal,
        addModalOpen,
        setaddModalOpen,
    } = useContext(MainContext);

    const [isLoading, setIsLoading] = useState(false);
    const [allHorarios, setAllHorarios] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState({});

    useEffect(() => {
        document.title = "Marca Ponto - Horários";
        setOpenMoreInfo(false);
        getAllHorários();
    }, []);

    useEffect(() => {
        getAllHorários();
    }, [hasCloseEditModal]);

    const getAllHorários = async () => {
        setIsLoading(true);
        await api
            .get(ALL_HORARIOS, { headers: { Authorization: token } })
            .then((resp) => {
                const { status, data } = resp;
                if (status === 200) {
                    setAllHorarios(data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                showToast("ERROR", "Algo deu errado 🤨", {});
            });
    };

    const closeModal = () => {
        setaddModalOpen(false);
        return true;
    };

    const closeModalMoreInfo = () => {
        setOpenMoreInfo(false);
        return true;
    };

    // const handleRowChange = (state: any) => {
    //     console.log("Selected Rows: ", state.selectedRows);
    // };

    const showMoreInfo = async (dataFromRow: any) => {
        setOpenMoreInfo(true);
        setSelectedHorario(dataFromRow);
    };

    return (
        <>
            <div className="usuarios__wrapper">
                <div className="usuarios__header">
                    <HeaderInside isHome={false} nome={"Horários"} />
                </div>
                <div className="page__title-info">
                    <div className="tinf__name">
                        <h2 className="tt-title title-blue title-bold">
                            Horários
                        </h2>
                        <p>
                            Você possui{" "}
                            <span>
                                {allHorarios ? allHorarios.length : "-"}
                            </span>{" "}
                            horário(s) cadastrados
                        </p>
                    </div>
                    <a
                        href="#new"
                        className="bt"
                        onClick={() => setaddModalOpen(true)}
                    >
                        + Novo Horário
                    </a>
                </div>
                {!isLoading ? (
                    <div className="table__wrapper">
                        <DataTable
                            noHeader={true}
                            data={allHorarios.map((c: any) =>
                                c.ativo
                                    ? { ...c, ativo: "true" }
                                    : { ...c, ativo: "false" }
                            )}
                            columns={ColumsTableHorarios}
                            striped={true}
                            pagination={true}
                            onRowClicked={showMoreInfo}
                            pointerOnHover={true}
                            highlightOnHover={true}
                            paginationPerPage={30}
                        />
                    </div>
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

            {addModalOpen && (
                <ModalCrud onClose={closeModal}>
                    <AddSelectedHorario />
                </ModalCrud>
            )}

            {openMoreInfo && (
                <ModalCrud onClose={closeModalMoreInfo}>
                    {selectedHorario ? (
                        <SelectedHorario data={selectedHorario} />
                    ) : (
                        ""
                    )}
                </ModalCrud>
            )}
        </>
    );
};
export default Horario;
