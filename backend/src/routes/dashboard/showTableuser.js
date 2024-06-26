const express = require("express")
const router = express.Router();

const user = require("../../models/user")

router.get("/show-table-user", async(req, res) => {
    try{
        const data = await user.find()
     res.send(data)
     console.log("table users rendered")
        
    }catch(error) {
        console.log(error)
    }
})

module.exports = router;