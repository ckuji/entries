import { DayEntity } from "src/days/day.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class DayUnitEntity extends Base {
    @Column()
    name: string

    @Column({type: 'decimal'})
    percent: number

    @ManyToOne(() => DayEntity, day => day.dayUnits)
    @JoinColumn()
    day: DayEntity
}