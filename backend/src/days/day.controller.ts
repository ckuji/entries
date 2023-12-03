import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
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
}