import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(login: string, pass: string) : Promise<any> {
        const user = await this.usersService.getOneByLogin(login);
        const isMatch = await bcrypt.compare(pass, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException();
        }

        if(user) {
            const payload = { sub: user.id, login: user.login };
            return {
              access_token: await this.jwtService.signAsync(payload),
            };
        }

    }
}