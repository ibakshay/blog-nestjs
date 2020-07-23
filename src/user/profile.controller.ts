import { Controller, Get, Param, NotFoundException, Logger, Post, UseGuards, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from 'src/auth/optionalauth.guard';

@Controller('profiles')
export class ProfileController {

    constructor(private userService: UserService) { }

    @Get('/:username')
    @UseGuards(new OptionalAuthGuard())
    async findProfile(@Param() username: string, @User() user: UserEntity) {

        const profile = await this.userService.findByUsername(username, user)

        if (!profile) { throw new NotFoundException() }
        return { profile }
    }

    @Post('/:username/follow')
    @HttpCode(200)
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
