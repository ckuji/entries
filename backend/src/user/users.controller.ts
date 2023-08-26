import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.usersService.getOneById(id);
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.usersService.createOne(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.updateOne(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usersService.deleteOne(id);
    }
}