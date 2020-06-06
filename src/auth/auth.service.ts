import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';

@Injectable()
export class AuthService {

    private mockUser = {
        email: "ibakshay96@gmail.com",
        token: "jwt.token.here",
        username: "jake",
        bio: "I work at statefarm",
        image: null
    }


    register(credentials: RegisterDTO) {
        return this.mockUser
    }

    login(credentials: LoginDTO) {
        if (credentials.email === this.mockUser.email) {
            return this.mockUser
        }
        throw new InternalServerErrorException()
    }


}
