import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {

    }


    async register(credentials: RegisterDTO) {
        try {
            const user = this.userRepository.create(credentials)
            await user.save()
            return user
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async login({ email, password }: LoginDTO) {
        try {
            const user = await this.userRepository.findOne({ where: { email } })
            const isValidPassword = await user.comparePassword(password)

            if (!isValidPassword) {
                throw new UnauthorizedException('Invalid credentials and ')
            }

            return user

        } catch (error) {
            throw new UnauthorizedException(error)
        }


    }


}
