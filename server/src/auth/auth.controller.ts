import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LogiUserDto } from "../users/dto/login-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Authorize")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Succsess login" })
  @Post("/login")
  login(@Body() userDto: LogiUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "User register" })
  @ApiResponse({ status: 200, description: "Succsess register" })
  @Post("/register")
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
