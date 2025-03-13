import { LoggerConstant } from "./constants";
import WinstonLogger from "./winston.helper"
import jwt from "jsonwebtoken"

const {JWT_SECRET_KEY} = process.env
const logger = WinstonLogger.getInstance(LoggerConstant.SERVICE_NAME,LoggerConstant.ERROR_LOG_FILE,LoggerConstant.COMBINE_LOG_FILE);


export const encode = (payload:object):string=>{
    try {
        return jwt.sign(payload,JWT_SECRET_KEY)
    } catch (error) {
        logger.error(error)
    }
}

export const decodeToken = (token:string) =>{
    try {
        let decoded =  jwt.verify(token,JWT_SECRET_KEY);
        return JSON.parse(JSON.stringify(decoded))
    } catch (error) {
        logger.error(error)
    }
}