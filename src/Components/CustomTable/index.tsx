import React from "react";
import "./styles.scss";
import Table from "rc-table";

interface CustomTableProps {
    tableData: any;
    tableColumns: any;
    tableLayout?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
    tableData,
    tableColumns,
    tableLayout = "auto",
}) => {
    return <Table data={tableData} columns={tableColumns} />;
};

export default CustomTable;
