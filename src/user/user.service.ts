import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from 'src/models/user.model';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name)
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    ) {

    }

    async findByUsername(username: string, user?: UserEntity): Promise<UserEntity> {
        return (await this.userRepo.findOne({ where: { username }, relations: ['followers'] })).toProfile(user)
    }

    async followUser(currentUser: UserEntity, username: string) {
        const user = await this.userRepo.findOne({ where: { username }, relations: ['followers'] })
        user.followers.push(currentUser)
        this.logger.log(user.followers)
        await user.save()
        return user.toProfile(currentUser)
    }

    async unFollowUser(currentUser: UserEntity, username: string) {
        const user = await this.userRepo.findOne({ where: { username }, relations: ['followers'] })
        user.followers = user.followers.filter(follower => follower !== currentUser)
        await user.save()
        return user.toProfile(currentUser)
    }
}