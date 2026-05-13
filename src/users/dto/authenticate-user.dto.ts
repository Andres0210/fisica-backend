import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthenticateUserDto {
  @IsEmail()
  @MaxLength(180)
  email!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(120)
  password!: string;
}
