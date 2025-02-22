import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Stock } from "./Stock";
import { stocks_x_holdings } from "./Stock_x_Holding";

@Entity()
export class Holding extends BaseEntity {

    @Column({type:"boolean",nullable:false})
    isMain: boolean

    @ManyToOne(()=>User, (user)=>user.holdings)
    user: User

    @OneToMany(()=>stocks_x_holdings,(stocks_x_holdings=>stocks_x_holdings.holding))
    stock_x_holdings: stocks_x_holdings[]
}