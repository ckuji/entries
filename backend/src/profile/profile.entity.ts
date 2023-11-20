import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile')
export class ProfileEntity extends Base {
    @Column()
    description: string

    @OneToOne(() => UserEntity, user => user.profile)
    @JoinColumn()
    user: UserEntity
}