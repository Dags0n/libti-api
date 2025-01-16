import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (user && password) {
      const passwordMatch = await bcrypt.compare(password, user.password);      
      if (passwordMatch) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  
  async login(user: any) {
    const payload = { sub: user.id, email: user.email };  
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
