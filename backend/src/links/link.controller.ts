import { Controller, Post, UseGuards, Body, Req, Get, Param } from "@nestjs/common";
import { LinkService } from "./link.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateLinkDto } from "./dto/create-link.dto";

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
}