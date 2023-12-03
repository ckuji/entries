import { Injectable } from "@nestjs/common";
import { DayUnitEntity } from "./dayUnit.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DayUnitService {
    constructor(@InjectRepository(DayUnitEntity) private readonly dayUnitRepository: Repository<DayUnitEntity>) {}

}