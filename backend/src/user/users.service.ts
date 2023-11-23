import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

    getAll = async () : Promise<UserEntity[]> => {
        return await this.usersRepository.find({
            relations: {
                profile: true,
                links: true
            }
        });
    }

    getOneById = async (id: string) : Promise<UserEntity | null> => {
        return await this.usersRepository.findOne({
            where: {
                id: +id
            }
        });
    }

    getOneByIdWithProfile = async (id: string, req: any) : Promise<UserEntity | null> => {
        const user = await this.usersRepository.findOne({
            where: {
                id: +id
            },
            relations: {
                profile: true,
                links: true
            },
            select: {
                id: true,
                login: true,
                profile: {
                    id: true,
                    description: true
                },
            }
        });

        if(!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        let newUser: any = {...user}
        if(req.user.sub === +id) {
            newUser.owner = true 
        } else {
            newUser.owner = false 
        }

        return newUser;
    }

    getOneByLogin = async (login: string) : Promise<UserEntity | null> => {
        return await this.usersRepository.findOne({
            where: {
                login
            }
        });
    }

    getOneByEmail = async (email: string) : Promise<UserEntity | null> => {
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

    updateOne = async (id: string, dto: UpdateUserDto, loginedId: number) : Promise<UserEntity | null> => {
        if(+id !== loginedId) {
            throw new HttpException('Изменять профиль может только владелец', HttpStatus.FORBIDDEN);
        }

        const user: UserEntity | null = await this.getOneById(id);
        if(user) {
            user.login = dto.login;
            user.password = dto.password;
            user.email = dto.email;
            
            return await this.usersRepository.save(user);
        }
        return null;
    }
    
    deleteOne = async (id: string, loginedId: number) => {
        if(+id !== loginedId) {
            throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
        }

        return await this.usersRepository.delete(id);
    }
}