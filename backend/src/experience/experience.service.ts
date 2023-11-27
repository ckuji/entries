import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExperienceEntity } from "./experience.entity";
import { Repository } from "typeorm";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { UpdateExperienceDto } from "./dto/update-experience.dto";

@Injectable()
export class ExperienceService {
    constructor(@InjectRepository(ExperienceEntity) private readonly experienceRepository: Repository<ExperienceEntity>) {}

    getAll = async (userId: string, loginedId: number) => {
        if(+userId !== loginedId) {
            throw new HttpException('Получать значения может только владелец', HttpStatus.FORBIDDEN);
        }

        return this.experienceRepository.find({
            where: {
                user: {id: +userId}
            },
            order: {
                id: 'ASC'
            }
        });
    }

    createOne = async (experienceData: CreateExperienceDto, loginedId: number) => {
        if(+experienceData.userId !== loginedId) {
            throw new HttpException('Создавать значения может только владелец', HttpStatus.FORBIDDEN);
        }

        const newExperience = this.experienceRepository.create({
            name: experienceData.name,
            percent: experienceData.percent,
            user: {id: +experienceData.userId}
        });

        await this.experienceRepository.save(newExperience);
        return null;
    }

    updateOne = async (experienceData: UpdateExperienceDto, loginedId: number) => {
        if(+experienceData.userId !== loginedId) {
            throw new HttpException('Обновлять значения может только владелец', HttpStatus.FORBIDDEN);
        }

        const exp = await this.experienceRepository.findOne({
            where: {
                id: experienceData.id
            }
        });
        if(!exp) {
            throw new HttpException('Значение не найдено', HttpStatus.NOT_FOUND);
        }

        exp.name = experienceData.name;
        exp.percent = experienceData.percent;

        return await this.experienceRepository.save(exp);
    }

    deleteOne = async (id: number) => {
        return await this.experienceRepository.delete(id);
    }
}