import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(ProfileEntity) private readonly profileRepository: Repository<ProfileEntity>) {}

    getOneByUserId = async (userId: number) => {
        const profile = await this.profileRepository.findOne({
            where: {
                user: {id: userId}
            },
        })
        return profile;
    }

    createOne = async (text: string, userId: number) => {
        const existProfile = await this.profileRepository.findOne({
            where: {
                user: {id: userId}
            }
        })
        if(existProfile) {
            throw new HttpException('У пользователя уже создан профиль', HttpStatus.CONFLICT);
        }
        const newProfile = this.profileRepository.create({
            description: text,
            user: {id: userId}
        });
        const profile = await this.profileRepository.save(newProfile);
        return profile;
    }
}