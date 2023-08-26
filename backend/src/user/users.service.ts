import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

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

    createOne = async (dto: CreateUserDto) : Promise<User> => {
        const newUser = this.usersRepository.create({
            login: dto.login,
            password: dto.password,
            email: dto.email
        });
        return await this.usersRepository.save(newUser);
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