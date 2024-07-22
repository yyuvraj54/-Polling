const express = require("express");
const app = express();
require('dotenv').config()

const bodyParser = require("body-parser")
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{
    console.log(`App live in port ${PORT}`)
});