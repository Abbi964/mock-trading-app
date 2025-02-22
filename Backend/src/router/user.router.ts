import express from "express"
import { getStockInfo } from "../controller/user.controller";
const userRouter = express.Router();

userRouter.get("/getStockInfo",getStockInfo)

export default userRouter;