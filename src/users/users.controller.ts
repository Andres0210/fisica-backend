import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AdminApiGuard } from "../auth/admin-api.guard";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminApiGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(AdminApiGuard)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Post("authenticate")
  authenticate(@Body() dto: AuthenticateUserDto) {
    return this.usersService.authenticateAdmin(dto);
  }
}
