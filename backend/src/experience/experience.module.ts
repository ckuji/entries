import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExperienceEntity } from "./experience.entity";
import { ExperienceController } from "./experience.controller";
import { ExperienceService } from "./experience.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([ExperienceEntity])],
    controllers: [ExperienceController],
    providers: [ExperienceService, JwtService],
})
export class ExperienceModule {}