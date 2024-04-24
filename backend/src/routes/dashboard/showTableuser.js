const express = require("express")
const router = express.Router();

const tableModel = require("../../models/Table")

router.get("/show-table-user", async(req, res) => {
    try{
        const data = await tableModel.find()
     res.send(data)
     console.log("data sent to frontend")
        
    }catch(error) {
        console.log(error)
    }
})

module.exports = router;