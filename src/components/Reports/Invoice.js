import jsPDF from "jspdf";
import "jspdf-autotable";

const Invoice = records => {

    const doc = new jsPDF();

    const tableColumn = ["Item", "Quantity", "Price", "Discount", "Net Amount", "Sub Total", "Ordered Date"];

    const tableRows = [];

    records.forEach(record => {
        const recordData = [
            record.items.name,
            record.quantity,
            (Math.round(record.price * 100) / 100).toFixed(2),
            (Math.round(record.discount * 100) / 100).toFixed(2),
            (Math.round(record.netAmount * 100) / 100).toFixed(2),
            (Math.round(record.subTotal * 100) / 100).toFixed(2),
            record.createdDate
        ];

        tableRows.push(recordData);
    });

    doc.beginFormObject(100, 1000, 1000, 1000);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text("Invoice " + date[0] + "-" + date[1] + "-" + date[2] + "-" + date[3] + "-" + date[4], 14, 15);
    doc.save(`invoice_${dateStr}.pdf`);
};

export default Invoice;
