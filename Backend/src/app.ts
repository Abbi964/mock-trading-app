import "dotenv/config"
import cors from "cors"
import express from "express";
import yahooFinance from "yahoo-finance2";
import bodyParser from "body-parser";
import userRouter from "./router/user.router";
import DBModule from "./db";


const app = express()
const PORT = process.env.PORT;

(async()=>{
    await DBModule.register()

})()

app.use(cors())
app.use(bodyParser.json())
app.use("/user",userRouter)


app.listen(PORT,()=>{
    console.log("server is running on Port ",PORT)
})