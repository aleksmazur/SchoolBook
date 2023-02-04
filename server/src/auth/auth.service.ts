import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
import { LogiUserDto } from "../users/dto/login-user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LogiUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByUsername(
      userDto.username,
    );
    if (candidate) {
      throw new HttpException(
        `User with username '${userDto.username}' is already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, id: user.id, role: user.role, fullName: user.fullName };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LogiUserDto) {
    const user = await this.userService.getUserByUsername(userDto.username);
    if (!user) {
      throw new HttpException(`User with username '${userDto.username}' not found!`, HttpStatus.FORBIDDEN);
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException(`Incorrect password for user '${userDto.username}'`, HttpStatus.UNAUTHORIZED);
  }
}
