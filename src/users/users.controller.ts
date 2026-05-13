import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Post("authenticate")
  authenticate(@Body() dto: AuthenticateUserDto) {
    return this.usersService.authenticateAdmin(dto);
  }
}
