import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LinkEntity } from "./link.entity";
import { LinkController } from "./link.controller";
import { LinkService } from "./link.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([LinkEntity])],
    controllers: [LinkController],
    providers: [LinkService, JwtService],
})
export class LinkModule {}