import { DayEntity } from 'src/days/day.entity';
import { ExperienceEntity } from 'src/experience/experience.entity';
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

  @OneToMany(() => ExperienceEntity, experience => experience.user)
  experience: ExperienceEntity

  @OneToMany(() => DayEntity, day => day.user)
  days: DayEntity
}