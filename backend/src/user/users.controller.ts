import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ValidationPipe } from "./pipes/validation.pipe";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return this.usersService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getByIdWithProfile(@Param('id') id: string, @Request() req: any) {
        return this.usersService.getOneByIdWithProfile(id, req);
    }

    @Post()
    async create(@Body(new ValidationPipe()) dto: CreateUserDto) {
        return this.usersService.createOne(dto);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.updateOne(id, dto)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usersService.deleteOne(id);
    }
}