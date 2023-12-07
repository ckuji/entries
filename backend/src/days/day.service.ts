import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DayEntity } from "./day.entity";
import { Repository } from "typeorm";
import { CommonDayDto } from "./dto/common-day.dto";
import { DayUnitEntity } from "src/day_unit/dayUnit.entity";

@Injectable()
export class DayService {
    constructor (
        @InjectRepository(DayEntity) private readonly dayRepository: Repository<DayEntity>,
        @InjectRepository(DayUnitEntity) private readonly dayUnitRepository: Repository<DayUnitEntity>
    ) {}

    changeDay = async (dto: CommonDayDto, loginedId: number) => {
        if(+dto.userId !== loginedId) {
            throw new HttpException('Получать значения может только владелец', HttpStatus.FORBIDDEN);
        }

        let day = await this.dayRepository.findOne({
            where: {
                date: dto.date
            }
        })
        if(!day) {
            let newDay = {
                date: dto.date,
                description: '',
                hours: 0,
                dayUnits: undefined,
                user: {id: +dto.userId}
            }
            day = this.dayRepository.create(newDay);
            await this.dayRepository.save(day);
        }

        if(dto.description !== null && dto.description !== undefined && dto.description !== day.description) {
            day.description = dto.description;
        }

        if(dto.hours !== null && dto.hours !== undefined && dto.hours !== +day.hours) {
            day.hours = dto.hours;
        }

        if(dto.dayUnits?.length) {
            dto.dayUnits.map( async(item) => {
                const unitExist = await this.dayUnitRepository.findOne({
                    where: {
                        name: item.name,
                        day: {id: day?.id}
                    }
                });

                if(unitExist && item.percent !== 0) {
                    let changed = false;
                    if(unitExist.name !== item.name) {
                        unitExist.name = item.name;
                        if(!changed) changed = true;
                    }
                    if(+unitExist.percent !== item.percent) {
                        unitExist.percent = item.percent;
                        if(!changed) changed = true;
                    }

                    if(changed) {
                        await this.dayUnitRepository.save(unitExist);
                    }
                } else if(unitExist && item.percent === 0) {
                    await this.dayUnitRepository.delete({name: item.name});
                } else if(item.percent !== 0) {
                    const newUnit = this.dayUnitRepository.create({
                        name: item.name,
                        percent: item.percent,
                        day: {
                            id: day?.id
                        }
                    });
                    await this.dayUnitRepository.save(newUnit);
                }
            });
        }
        
        return await this.dayRepository.save(day);
    }

    getOneById = async (id: string) => {
        const day = await this.dayRepository.findOne({
            where: {id: +id},
            relations: {
                dayUnits: true
            }
        });

        if(!day) {
            throw new HttpException('Значение не найдено', HttpStatus.NOT_FOUND);
        }

        return day;
    }
}