import express from "express"
import { getStockInfo, getStockQuote } from "../controller/user.controller";

export function registerRoutes(){
    let router = express.Router();

    router.get("/getStockQuote",getStockQuote)
    router.get("/getStockInfo",getStockInfo)

    return router
}