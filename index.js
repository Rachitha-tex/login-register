const express=require('express');
const mongoose=require("mongoose")
const app=express();
const dotenv=require('dotenv');

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log("Connected to db!!");
})


const authRoute=require('./routes/auth')

//Middleware
app.use(express.json());
//Route Middleware
app.use('/api/user',authRoute)



Port=process.env.PORT||3000
app.listen(Port,()=>{console.log(`Servere is loaded in ${Port}`)});