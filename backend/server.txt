const express =  require("express")
const app = express();
const cors = require("cors");

const port = 4000;
const indexRoute = require("./src/routes/index");
const  mongoose  = require("mongoose");

// connection to database
 const connectionToDatabase = () => {
    try{
        mongoose.connect("mongodb://localhost:27017/login")
        console.log("db connected")

    }catch(err){
        console.log("error connecting to db" , err)
    }
}
connectionToDatabase();


// Middleware to parse JSON bodies
app.use(cors())
app.use(express.json());
app.use(indexRoute)

app.listen(port, () => {
    console.log(`The server is running on the port ${port}`)
})