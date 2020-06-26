import { Controller, Get, Param, NotFoundException, Logger, Post, UseGuards, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('profiles')
export class ProfileController {

    constructor(private userService: UserService) { }

    @Get('/:username')
    async findProfile(@Param() { username }: any) {
        Logger.log(username)
        const user = await this.userService.findByUsername(username)

        if (!user) { throw new NotFoundException() }
        return { profile: user }
    }

    @Post('/:username/follow')
    @UseGuards(AuthGuard())
    async followUser(@User() user: UserEntity, @Param('username') username: string) {
        return this.userService.followUser(user, username)
    }

    @Delete('/:username/unfollow')
    @UseGuards(AuthGuard())
    async unFollowUser(@User() user: UserEntity, @Param('username') username: string) {
        const profile = await this.userService.unFollowUser(user, username)
        return { profile: user }
    }
}
