import { DayUnitEntity } from "src/day_unit/dayUnit.entity";
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class DayEntity extends Base {
    @Column()
    date: string

    @Column()
    description: string

    @Column({type: 'decimal'})
    hours: number

    @OneToMany(() => DayUnitEntity, dayUnit => dayUnit.day)
    dayUnits: DayUnitEntity

    @ManyToOne(() => UserEntity, user => user.days)
    @JoinColumn()
    user: UserEntity
}