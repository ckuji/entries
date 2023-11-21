import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(ProfileEntity) private readonly profileRepository: Repository<ProfileEntity>) {}

    createOne = async (text: string, userId: number, loginedId: number) => {
        if(userId !== loginedId) {
            throw new HttpException('Создавать профиль может только владелец', HttpStatus.FORBIDDEN);
        }

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

    updateOne = async (text: string, userId: number, loginedId: number) => {
        if(userId !== loginedId) {
            throw new HttpException('Создавать профиль может только владелец', HttpStatus.FORBIDDEN);
        }

        const profile = await this.profileRepository.findOne({
            where: {
                user: {id: userId}
            }
        })
        if(!profile) {
            throw new HttpException('Профиль не найден', HttpStatus.NOT_FOUND);
        }

        profile.description = text;
        await this.profileRepository.save(profile);
        return null;
    }
}