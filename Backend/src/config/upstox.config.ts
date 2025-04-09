import axios, { AxiosRequestConfig } from "axios";
import { LoggerConstant, UpstoxConstants } from "../helper/constants";
import WinstonLogger from "../helper/winston.helper";
const {SERVICE_NAME,COMBINE_LOG_FILE,ERROR_LOG_FILE} = LoggerConstant

const logger = WinstonLogger.getInstance(SERVICE_NAME, ERROR_LOG_FILE, COMBINE_LOG_FILE)

class Upstox {

    private static async getRequest(endpoint:string,params?:Record<string,string>){
        try {
            let config:AxiosRequestConfig = {
              method: 'get',
              maxBodyLength: Infinity,
              url: `${UpstoxConstants.BASE_URL}${endpoint}`,
              headers: { 
                'Accept': 'application/json'
              },
              params
            };

            let response = await axios.request(config)
            console.log(response)
        } catch (error) {
            logger.error(error.message)
        }
    }

    static async getMarketQuote(instrument_key?:string){
      try {
        await this.getRequest('/market-quote/quotes',{
          instrument_key : instrument_key
        })
      } catch (error) {
        logger.error(error)
      }
    }
}

export default Upstox