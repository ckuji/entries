import { LinkEntity } from 'src/links/link.entity';
import { ProfileEntity } from 'src/profile/profile.entity';
import { Base } from 'src/utils/base';
import { Entity, Column, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class UserEntity extends Base {
  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToOne(() => ProfileEntity, profile => profile.user)
  profile: ProfileEntity

  @OneToMany(() => LinkEntity, link => link.user)
  links: LinkEntity
}