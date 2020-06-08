import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller';
import { ProfileController } from './profile.controller';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController, ProfileController],
  providers: [UserService]
})
export class UserModule { }
