import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ValidationPipe } from "./pipes/validation.pipe";
import { AuthGuard } from "src/auth/auth.guard";
import { OwnerGuard } from "src/auth/owner.guard";

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return this.usersService.getAll();
    }

    @UseGuards(OwnerGuard)
    @Get(':id')
    async getByIdWithProfile(@Param('id') id: string, @Request() req: any) {
        return this.usersService.getOneByIdWithProfile(id, req);
    }

    @Post()
    async create(@Body(new ValidationPipe()) dto: CreateUserDto) {
        return this.usersService.createOne(dto);
    }

    @UseGuards(AuthGuard)
    @Put()
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: any) {
        return this.usersService.updateOne(id, dto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: any) {
        return this.usersService.deleteOne(id, req.user.sub);
    }
}