import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileEntity } from "./profile.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([ProfileEntity])],
    controllers: [ProfileController],
    providers: [ProfileService, JwtService],
})
export class ProfileModule {}