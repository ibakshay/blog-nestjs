import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from 'src/models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    ) {

    }

    async findByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepo.findOne({ where: { username } })

        return user

    }
    async updateCurrentUser(username: string, data: UpdateUserDTO) {
        await this.userRepo.update({ username }, data)
        return this.findByUsername(username)

    }
}