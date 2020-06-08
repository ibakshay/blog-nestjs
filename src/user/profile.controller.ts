import { Controller, Get, Param, NotFoundException, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('profiles')
export class ProfileController {

    constructor(private userService: UserService) { }

    @Get('/:username')
    async findProfile(@Param() {username}: any) {
        Logger.log(username)
        const user = await this.userService.findByUsername(username)

        if (!user) { throw new NotFoundException() }
        return user
    }
}
