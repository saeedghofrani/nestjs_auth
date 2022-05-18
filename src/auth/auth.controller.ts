
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDTO } from 'src/user/rigester.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginDTO } from '../auth/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,

    ) { }

    @Post('register')
    async register(@Body() RegisterDTO: RegisterDTO) {
        const user = await this.userService.create(RegisterDTO);
        const payload = {

            email: user.email,
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
    @Post('login')
    async login(@Body() UserDTO: LoginDTO) {
        const user = await this.userService.findByLogin(UserDTO);
        const payload = {
            email: user.email,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

}