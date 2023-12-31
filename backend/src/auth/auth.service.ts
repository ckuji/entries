import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcryptjs');
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(login: string, pass: string, res: Response) : Promise<any> {
        const user = await this.usersService.getOneByLogin(login);

        if(user) {
            const isMatch = await bcrypt.compare(pass, user?.password);
            if (!isMatch) {
                throw new UnauthorizedException();
            }

            const payload = { sub: user.id, login: user.login };
            const accesToken = await this.jwtService.signAsync(payload);

            res.cookie('accesToken', accesToken, {httpOnly: true, secure: false});

            return {
                message: 'success',
            };
        } else {
            throw new UnauthorizedException();
        }
    }

    async logout(res: Response) : Promise<any> {
        res.cookie('accesToken', '', {httpOnly: true, secure: false, maxAge: 0});

        return {
            message: 'logout success',
        };
    }
}