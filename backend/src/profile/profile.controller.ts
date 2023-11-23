import { Body, Controller, Post, UseGuards, Req, Put } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() dto: CreateProfileDto, @Req() req: any) {
        return this.profileService.createOne(dto.text, +dto.userId, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Put()
    async update(@Body() dto: CreateProfileDto, @Req() req: any) {
        return this.profileService.updateOne(dto.text, +dto.userId, req.user.sub);
    }
}