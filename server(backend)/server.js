require('dotenv').config()
const { config } = require("dotenv")
const express=require("express")
const app=express()

app.get("/",(req,res)=>{
    res.send("server running")
})

app.listen(process.env.PORT,()=>{
    console.log(`Your server is running on PORT ${process.env.PORT}`);
})



