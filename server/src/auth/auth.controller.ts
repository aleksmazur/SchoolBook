import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";

@ApiTags("Authorize")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Succsess login" })
  @Public()
  @Post("/login")
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }
  @ApiOperation({ summary: "User register" })
  @ApiResponse({ status: 200, description: "Succsess register" })
  @Public()
  @Post("/register")
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
