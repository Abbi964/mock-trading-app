import { DataSourceOptions } from "typeorm";
import { User } from "./entity/User";
import { Stock } from "./entity/Stock";
import { Stock_data } from "./entity/Stock_data";
import { Holding } from "./entity/Holding";
import { stocks_x_holdings } from "./entity/Stock_x_Holding";
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_POOLSIZE, DB_CONNECTION_LIMIT, DB_CONNECTION_LIMIT_MAX} = process.env;

export const DB_CONFIG: DataSourceOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: [
        User,
        Stock,
        Stock_data,
        Holding,
        stocks_x_holdings
    ],
    synchronize: true,
    logging: false,
    poolSize: +DB_POOLSIZE,
    // ssl: false
}