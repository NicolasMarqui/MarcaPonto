import React from "react";
import CustomTable from "../../../Components/CustomTable";
import {
    LatestPointsColums,
    LatestPointsData,
} from "../../../Services/MockData";

interface EspelhoProps {}

const Espelho: React.FC<EspelhoProps> = ({}) => {
    return (
        <div className="espelho__wrapper">
            {/* <CustomTable
                tableTitle="Seus pontos"
                tableData={LatestPointsData}
                tableColumns={LatestPointsColums}
                searchData={false}
                exportData={true}
            /> */}
            <h1>Espelho</h1>
        </div>
    );
};
export default Espelho;
