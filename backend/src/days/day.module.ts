import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DayEntity } from "./day.entity";
import { DayService } from "./day.service";
import { JwtService } from "@nestjs/jwt";
import { DayController } from "./day.controller";
import { DayUnitEntity } from "src/day_unit/dayUnit.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DayEntity, DayUnitEntity])],
    controllers: [DayController],
    providers: [DayService, JwtService],
})
export class DayModule {}