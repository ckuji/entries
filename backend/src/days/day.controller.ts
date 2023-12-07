import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { DayService } from "./day.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CommonDayDto } from "./dto/common-day.dto";

@Controller('day')
export class DayController {
    constructor (private readonly dayService: DayService) {}

    @UseGuards(AuthGuard)
    @Post()
    async changeDay(@Body() dto: CommonDayDto, @Req() req: any) {
        return this.dayService.changeDay(dto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getDay(@Param('id') id: string) {
        return this.dayService.getOneById(id);
    }
}