import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class ExperienceEntity extends Base {
    @Column()
    name: string

    @Column({type: 'decimal'})
    percent: number

    @ManyToOne(() => UserEntity, user => user.experience)
    @JoinColumn()
    user: UserEntity
}