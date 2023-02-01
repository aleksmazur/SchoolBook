import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLE_KEY } from "./role-auth.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {} 

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "User not authorized"
        })
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.role.some((role: { value: string; }) => requiredRoles.includes(role.value));
    } catch (e) {
      throw new HttpException("No access", HttpStatus.FORBIDDEN);
    }
  }
}