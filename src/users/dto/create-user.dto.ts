import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(6, { message: 'username.minLength' })
  @MaxLength(20, { message: 'username.maxLength' })
  username: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'password.minLength' })
  @MaxLength(25, { message: 'password.maxLength' })
  password: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'email.minLength' })
  @MaxLength(20, { message: 'email.maxLength' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'firstName.minLength' })
  @MaxLength(30, { message: 'firstName.maxLength' })
  firstName: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'lastName.minLength' })
  @MaxLength(30, { message: 'lastName.maxLength' })
  lastName: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'salt.minLength' })
  @MaxLength(30, { message: 'salt.maxLength' })
  salt: string;

  // @IsString({message:"username.isString"})
  // @MinLength(6,{message:"username.minLength"})
  // username:string;
  // @IsString({message:"password.isString"})
  // @MinLength(6,{message:"password.minLength"})
  // @MaxLength(20,{message:"password.maxLength"})
  // password:string;
}
