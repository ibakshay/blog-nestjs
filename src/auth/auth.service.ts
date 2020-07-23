import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

import { LoginDTO, RegisterDTO, UpdateUserDTO } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, private jwtService: JwtService) {

    }


    async register(credentials: RegisterDTO) {
        try {
            const user = this.userRepository.create(credentials)
            await user.save()
            const payload = { username: user.username }
            const token = this.jwtService.sign(payload)
            return { user: { ...user, token } }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async login({ email, password }: LoginDTO) {
        try {
            const user = await this.userRepository.findOne({ where: { email } })
            const isValid = await user.comparePassword(password);
            if (!isValid) {
                throw new UnauthorizedException('Invalid credentials')
            }
            const payload = { username: user.username }
            const token = this.jwtService.sign(payload)
            return { user: { ...user, token } };
        } catch (err) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async findCurrentUser(username: string) {
        const user = await this.userRepository.findOne({ where: { username } });
        const payload = { username };
        const token = this.jwtService.sign(payload);
        return { user: { ...user.toJSON(), token } };
    }

    async updateUser(username: string, data: UpdateUserDTO) {
        const user = await this.userRepository.update({ username }, data)
        return { user }

    }


}
