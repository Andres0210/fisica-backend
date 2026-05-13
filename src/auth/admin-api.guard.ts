import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { timingSafeEqual } from "node:crypto";

function safeCompare(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);

  return first.length === second.length && timingSafeEqual(first, second);
}

@Injectable()
export class AdminApiGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const expectedToken = process.env.ADMIN_API_TOKEN;

    if (!expectedToken) {
      throw new UnauthorizedException("ADMIN_API_TOKEN no esta configurado en el backend.");
    }

    const request = context.switchToHttp().getRequest();
    const authorization = String(request.headers.authorization ?? "");
    const token = authorization.startsWith("Bearer ")
      ? authorization.slice("Bearer ".length).trim()
      : "";

    if (!token || !safeCompare(token, expectedToken)) {
      throw new UnauthorizedException("No tienes permisos para modificar este recurso.");
    }

    return true;
  }
}
