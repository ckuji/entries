import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DayUnitEntity } from "./dayUnit.entity";
import { DayUnitController } from "./dayUnit.controller";
import { DayUnitService } from "./dayUnit.service";

@Module({
    imports: [TypeOrmModule.forFeature([DayUnitEntity])],
    controllers: [DayUnitController],
    providers: [DayUnitService]
})
export class DayUnitModule {}