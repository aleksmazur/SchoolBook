import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLE_KEY } from "./role-auth.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException({
        error: HttpStatus.UNAUTHORIZED,
        message: "User not authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const user = this.jwtService.verify(token);
      req.user = user;
      if (
        user &&
        user.role &&
        !user.role.some((role: { value: string }) =>
          requiredRoles.includes(role.value),
        )
      ) {
        throw new UnauthorizedException({
          error: HttpStatus.FORBIDDEN,
          message: "No access!",
        });
      } else {
        return true;
      }
    } catch (error) {
      throw new HttpException(`Auth error`, HttpStatus.FORBIDDEN);
    }
  }
}
