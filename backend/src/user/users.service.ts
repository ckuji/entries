import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getAll = async () : Promise<User[]> => {
        return await this.usersRepository.find();
    }

    getOneById = async (id: string) : Promise<User | null> => {
        return await this.usersRepository.findOne({
            where: {
                id: +id
            }
        });
    }

    getOneByLogin = async (login: string) : Promise<User | null> => {
        return await this.usersRepository.findOne({
            where: {
                login
            }
        });
    }

    getOneByEmail = async (email: string) : Promise<User | null> => {
        return await this.usersRepository.findOne({
            where: {
                email
            }
        });
    }

    createOne = async (dto: CreateUserDto) : Promise<any> => {
        const loginExist = await this.getOneByLogin(dto.login);
        if(loginExist) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.CONFLICT);
        };
        const emailExist = await this.getOneByEmail(dto.email);
        if(emailExist) {
            throw new HttpException('Пользователь с такой почтой уже существует', HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);
        const newUser = this.usersRepository.create({...dto, password: hashedPassword});
        await this.usersRepository.save(newUser);
        const newUserWithoutPassword = {...newUser, password: 'some password'}
        return newUserWithoutPassword;
    }

    updateOne = async (id: string, dto: UpdateUserDto) : Promise<User | null> => {
        const user: User | null = await this.getOneById(id);
        if(user) {
            user.login = dto.login;
            user.password = dto.password;
            user.email = dto.email;
            
            return await this.usersRepository.save(user);
        }
        return null;
    }
    
    deleteOne = async (id: string) => {
        return await this.usersRepository.delete(id);
    }
}