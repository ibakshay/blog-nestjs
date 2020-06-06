import { Entity, BaseEntity, Column, BeforeInsert } from 'typeorm';
import * as brypt from 'bcryptjs'
import { Exclude, classToPlain } from 'class-transformer'
import { isEmail, IsEmail } from 'class-validator'
import { AbstractEntity } from './abstract-entity'

@Entity('users')
export class UserEntity extends AbstractEntity {

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


}