import {CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        name:"createdAt",
        type:"timestamp",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name:"updatedAt",
        type:"timestamp"
    })
    updatedAt: Date
}