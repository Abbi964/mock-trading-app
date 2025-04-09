import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, BaseGeneratedEntity } from "./BaseEntity";
import { Holding } from "./Holding";

@Entity()
export class User extends BaseGeneratedEntity {
    @Column({type:"varchar",nullable:false})
    name: string;

    @Column({type:"varchar",nullable:false})
    email: string;

    @Column({type:"varchar",nullable:false})
    password: string

    @OneToMany(()=>Holding,(holding)=>holding.user)
    holdings: Holding[]
}