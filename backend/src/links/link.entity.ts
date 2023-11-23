import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class LinkEntity extends Base {
    @Column()
    linkBase: string

    @Column()
    description: string

    @ManyToOne(() => UserEntity, user => user.links)
    @JoinColumn()
    user: UserEntity
}