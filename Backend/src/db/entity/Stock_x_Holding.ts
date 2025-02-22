import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Stock } from "./Stock";
import { Holding } from "./Holding";

@Entity()
export class stocks_x_holdings {
    @PrimaryGeneratedColumn()
    public stockHoldingId: number

    @Column()
    public stockId: number

    @Column()
    public holdingId: number

    @Column({type:"int",nullable:false})
    amount: number

    @Column({type:'decimal',nullable:false})
    buyPrice: number

    @ManyToOne(()=>Stock,(stock => stock.stock_x_holdings))
    stock: Stock

    @ManyToOne(()=>Holding,(Holding => Holding.stock_x_holdings))
    holding: Holding
}