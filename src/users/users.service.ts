import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { hashPassword, verifyPassword } from "./password.util";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(dto: CreateUserDto) {
    const email = dto.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException("Ya existe un usuario registrado con este correo.");
    }

    const user = await this.prisma.user.create({
      data: {
        name: dto.name.trim(),
        email,
        passwordHash: hashPassword(dto.password),
        role: dto.role ?? UserRole.ASSISTANT,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  async authenticateAdmin(dto: AuthenticateUserDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        passwordHash: true,
      },
    });

    const canAccessAdmin = user?.role === UserRole.TEACHER || user?.role === UserRole.ASSISTANT;

    if (!user || !canAccessAdmin || !verifyPassword(dto.password, user.passwordHash)) {
      throw new UnauthorizedException("Credenciales invalidas.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
