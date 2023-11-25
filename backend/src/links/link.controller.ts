import { Controller, Post, UseGuards, Body, Req, Get, Param, Put, Delete } from "@nestjs/common";
import { LinkService } from "./link.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateLinkDto } from "./dto/create-link.dto";
import { UpdateLinkDto } from "./dto/update-link.dto";

@Controller('link')
export class LinkController {
    constructor(private readonly linkService: LinkService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    async getAll(@Param('id') id: string, @Req() req: any) {
        return this.linkService.getAll(id, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() dto: CreateLinkDto, @Req() req: any) {
        return this.linkService.createOne(dto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Put()
    async update(@Body() dto: UpdateLinkDto, @Req() req: any) {
        return this.linkService.updateOne(dto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.linkService.deleteOne(id);
    }
}