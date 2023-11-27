import { Controller, Post, UseGuards, Body, Req, Get, Param, Put, Delete } from "@nestjs/common";
import { ExperienceService } from "./experience.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { UpdateExperienceDto } from "./dto/update-experience.dto";

@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    async getAll(@Param('id') id: string, @Req() req: any) {
        return this.experienceService.getAll(id, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() dto: CreateExperienceDto, @Req() req: any) {
        return this.experienceService.createOne(dto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Put()
    async update(@Body() dto: UpdateExperienceDto, @Req() req: any) {
        return this.experienceService.updateOne(dto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.experienceService.deleteOne(id);
    }
}