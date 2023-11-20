import { Body, Controller, Post, Get, UseGuards, Param } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    getProfile(@Param('id') id: string) {
        return this.profileService.getOneByUserId(+id)
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() dto: CreateProfileDto) {
        return this.profileService.createOne(dto.text, dto.userId);
    }
}