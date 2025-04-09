import { Column, Entity, ManyToOne } from "typeorm";
import { Stock } from "./Stock";
import { BaseEntity, BaseGeneratedEntity } from "./BaseEntity";

enum CurrencyEnum {
    USD = 'USD',
    INR = 'INR',
}

@Entity()
export class Stock_data extends BaseGeneratedEntity {

    @Column({type:'varchar',nullable:false})
    name: string
    
    @Column({type:'varchar',nullable:false})
    symbol: string

    @Column({type: 'enum',enum: CurrencyEnum,nullable: true,})
    currency: CurrencyEnum;

    @Column({type: "decimal", nullable: false})
    marketPrice: number

    @Column({type: "decimal", nullable: false})
    todayLow: number

    @Column({type: "decimal", nullable: false})
    todayHigh: number

    @Column({type: "decimal", nullable: false})
    fiftyTwoWeekLow: number

    @Column({type: "decimal", nullable: false})
    fiftyTwoWeekHigh: number

    @Column({type: "decimal", nullable: false})
    forwardPE: number

    @Column({type: "decimal", nullable: false})
    trailingPE: number

    @Column({type: "decimal", nullable: false})
    priceToBook: number

    @Column({type: "float", nullable: false})
    marketCap: number

    @ManyToOne(()=>Stock, (stock)=>stock.stock_data)
    stock: number
}