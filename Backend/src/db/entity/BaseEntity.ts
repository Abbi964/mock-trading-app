import {CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

export class BaseGeneratedEntity {
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

export class BaseEntity {
    @PrimaryColumn()
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