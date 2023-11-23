import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LinkEntity } from "./link.entity";
import { Repository } from "typeorm";
import { CreateLinkDto } from "./dto/create-link.dto";

@Injectable()
export class LinkService {
    constructor(@InjectRepository(LinkEntity) private readonly linkRepository: Repository<LinkEntity>) {}

    getAll = async (userId: string, loginedId: number) => {
        if(+userId !== loginedId) {
            throw new HttpException('Получать ссылки может только владелец', HttpStatus.FORBIDDEN);
        }

        return this.linkRepository.find();
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
}