const express = require("express");
const app = express();
const db = require('./config/database');
require('dotenv').config()



const bodyParser = require("body-parser")
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000;




const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')
app.use('/User',userRoutes)
app.use('/Candidate',candidateRoutes)




app.listen(PORT,()=>{
    console.log(`App live in port ${PORT}`)
});