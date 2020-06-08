import { Controller, Get, Logger, UseGuards, Put, Body, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthPayload, UpdateUserDTO } from 'src/models/user.model';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get()
    @UseGuards(AuthGuard())
    findCurrentUser(@User() { username }: AuthPayload) {
        Logger.log("Akshayyyyy")
        Logger.log(username)
        return this.userService.findByUsername(username)
    }

    @Put()
    @UseGuards(AuthGuard())
    updateCurrentUser(@User() { username }: AuthPayload, @Body(new ValidationPipe({ transform: true, whitelist: true })) data: UpdateUserDTO) {
        return this.userService.updateCurrentUser(username, data)
    }
}
