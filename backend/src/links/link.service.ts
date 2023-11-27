import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LinkEntity } from "./link.entity";
import { Repository } from "typeorm";
import { CreateLinkDto } from "./dto/create-link.dto";
import { UpdateLinkDto } from "./dto/update-link.dto";

@Injectable()
export class LinkService {
    constructor(@InjectRepository(LinkEntity) private readonly linkRepository: Repository<LinkEntity>) {}

    getAll = async (userId: string, loginedId: number) => {
        if(+userId !== loginedId) {
            throw new HttpException('Получать ссылки может только владелец', HttpStatus.FORBIDDEN);
        }

        return this.linkRepository.find({
            where: {
                user: {id: +userId}
            },
            order: {
                id: 'ASC'
            }
        });
    }

    createOne = async (linkData: CreateLinkDto, loginedId: number) => {
        if(+linkData.userId !== loginedId) {
            throw new HttpException('Создавать ссылки может только владелец', HttpStatus.FORBIDDEN);
        }

        const newLink = this.linkRepository.create({
            linkBase: linkData.linkBase,
            description: linkData.description,
            user: {id: +linkData.userId}
        });

        await this.linkRepository.save(newLink);
        return null;
    }

    updateOne = async (linkData: UpdateLinkDto, loginedId: number) => {
        if(+linkData.userId !== loginedId) {
            throw new HttpException('Обновлять ссылки может только владелец', HttpStatus.FORBIDDEN);
        }

        const link = await this.linkRepository.findOne({
            where: {
                id: linkData.id
            }
        });
        if(!link) {
            throw new HttpException('Ссылка не найдена', HttpStatus.NOT_FOUND);
        }

        link.linkBase = linkData.linkBase;
        link.description = linkData.description;

        return await this.linkRepository.save(link);
    }

    deleteOne = async (id: number) => {
        return await this.linkRepository.delete(id);
    }
}