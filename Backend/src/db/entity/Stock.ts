import { Column, Entity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Stock_data } from "./Stock_data";
import { BaseEntity, BaseGeneratedEntity } from "./BaseEntity";
import { Holding } from "./Holding";
import { stocks_x_holdings } from "./Stock_x_Holding";

@Entity()
export class Stock extends BaseGeneratedEntity {
    @Column({type:"varchar",nullable:false})
    name: string

    @Column({type:"varchar",nullable:false})
    symbol: string

    @Column({type:"varchar",nullable:false})
    logo: string

    @Column({type:"varchar",nullable:false})
    description: string

    @OneToMany(()=>Stock_data,(stock_data)=>stock_data.stock)
    stock_data: Stock_data[]

    @OneToMany(()=>stocks_x_holdings,(stocks_x_holdings=>stocks_x_holdings.stock))
    stock_x_holdings: stocks_x_holdings[]

}