import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = orders => {

    const doc = new jsPDF();

    const tableColumn = ["Order Reference Code", "Item Name", "Quantity", "Price", "Discount", "Amount"];

    const tableRows = [];

    orders.forEach(order => {
        const orderData = [
            order.referenceCode,
            order.brandName + ' ' + order.itemName,
            order.quantity,
            order.itemPrice,
            order.itemDiscount,
            order.itemPrice - order.itemDiscount,
        ];
        tableRows.push(orderData);
    });
    console.log()

    doc.beginFormObject(100, 1000, 1000, 1000);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Order Details" + date[0] + "-" + date[1] + "-" + date[2] + "-" + date[3] + "-" + date[4], 14, 15);
    doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;