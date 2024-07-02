const mongoose = require("mongoose");

const paySlipSchema = new mongoose.Schema({
    data: [{
        year: String,       // Year as a string
        month: String,      // Month as a string
        pdf: Buffer         // Binary data of the PDF file
    }]
});

const PaySlip = mongoose.model("PaySlip", paySlipSchema);

module.exports = PaySlip;
