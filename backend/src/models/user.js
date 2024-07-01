const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    select : String,
    empId : String,
    inTime: [String],
    outTime: [String],
    assets : {
        name : String,
        model : String,
    }
})

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;



