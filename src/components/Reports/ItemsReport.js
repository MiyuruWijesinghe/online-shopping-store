import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";
import { SizePerPageDropdownStandalone } from "react-bootstrap-table2-paginator";

// define a generatePDF function that accepts a tickets argument
const generatePDF = items => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = ["Id", "Category Name", "Brand Name", "Items name", "Item code", "Description", "Price", "Discount"];
    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array
    items.forEach(item => {
        const itemsData = [
            item.id,
            item.categoryName,
            item.brandName,
            item.name,
            item.code,
            item.description,
            item.price,
            item.discount
            // item.status,
            // called date-fns to format the date on the ticket
            //format(new Date(ticket.updated_at), "yyyy-MM-dd")
        ];
        // push each tickcet's info into a row
        tableRows.push(itemsData);
    });

    doc.beginFormObject(100, 1000, 1000, 1000);
    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text("All items." + date[0] + "-" + date[1] + "-" + date[2] + "-" + date[3] + "-" + date[4], 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;