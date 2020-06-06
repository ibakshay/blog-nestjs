import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator'


export class LoginDTO {
    @IsEmail()
    @IsString()
    @MinLength(4)
    email: string

    @IsString()
    @MinLength(4)
    password: string
}

export class RegisterDTO extends LoginDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(23)
    username: string
}
