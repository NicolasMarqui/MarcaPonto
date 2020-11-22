import jsPDF from "jspdf";
import "jspdf-autotable";
import { useContext } from 'react';
import MainContext from "../../Contexts/MainContext";

const LOGO = require('../../Assets/images/logo_vertical.png');

const GeneratePDF = (headers, data,  title, text) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(20);

    let content = {
        startY: 210,
        head: [headers],
        body: data,
    };

    doc.addImage(LOGO, 'png',  10 , 20, 180, 100);
    doc.text(title, marginLeft, 140);

    doc.setLineWidth(0.1);
    doc.setDrawColor(220,220,220)
    doc.line(marginLeft, 150, 500, 150);

    doc.setFontSize(12)

    if(text) doc.text(text,marginLeft, 170);

    doc.autoTable(content);

    doc.save(`${title}.pdf`);

    return doc.output('datauristring');
};

export default GeneratePDF;
