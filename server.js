const express = require("express");
const app = express();
const db = require('./config/database');
require('dotenv').config()



const bodyParser = require("body-parser")
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;




const userRoutes = require('./routes/userRoutes')
app.use('/User',userRoutes)


app.listen(PORT,()=>{
    console.log(`App live in port ${PORT}`)
});