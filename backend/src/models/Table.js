const mongoose = require("mongoose")


const tableSchema = new mongoose.Schema({
    name : String,
    email : String,
    select : String,
    empId : String,
    inTime: String,
    outTime: String
})

const tableModel = new mongoose.model("table", tableSchema);

module.exports = tableModel;



