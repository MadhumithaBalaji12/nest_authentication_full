import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import  * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(signupDto: SignupDto): Promise<any> {
    const { username, email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser(username, email, hashedPassword);
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, role: user.roleName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
