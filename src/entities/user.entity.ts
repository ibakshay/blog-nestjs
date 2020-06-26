import { Entity, BaseEntity, Column, BeforeInsert, JoinTable, ManyToMany } from 'typeorm';
import * as brypt from 'bcryptjs'
import { Exclude, classToPlain } from 'class-transformer'
import { isEmail, IsEmail } from 'class-validator'
import { AbstractEntity } from './abstract-entity'
import { type } from 'os';
import { Logger } from '@nestjs/common';

@Entity('users')
export class UserEntity extends AbstractEntity {
    private readonly logger: Logger = new Logger(UserEntity.name)

    @Column()
    @IsEmail()
    email: string

    @Column({ unique: true })
    username: string

    @Column({ default: '' })
    bio: string

    @Column({ default: null, nullable: true })
    image: string | null

    @Column()
    @Exclude()
    password: string

    @ManyToMany(
        type => UserEntity,
        user => user.following)
    @JoinTable()
    followers: UserEntity[]

    @ManyToMany(
        type => UserEntity,
        user => user.followers)
    @JoinTable()
    following: UserEntity[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await brypt.hash(this.password, 10)
    }

    async comparePassword(enteredPassword: string) {
        const comparePassword = await brypt.compare(enteredPassword, this.password)
        return comparePassword
    }
    toJSON() {
        return classToPlain(this)
    }
    toProfile(user: UserEntity) {
        const following = this.followers.includes(user)
        const profile: any = this.toJSON()
        delete profile.followers
        return { ...profile, following }
    }

}