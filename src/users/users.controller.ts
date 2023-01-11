import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../commun/dto/pagination.dto';
import { CurrentUser } from '../commun/decorators/current-decorator/current-decorator.decorator';
import { HttpCode } from '@nestjs/common/decorators';
import { DeleteManyUserDto } from './dto/delete-many-user-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  logger: Logger = new Logger('UsersController');
  constructor(private readonly usersService: UsersService) {}

  /**Create Plusieur User Méthode */
  @Post('bulk')
  createBulk(
    @CurrentUser() currentUser: string,
    @Body() createUserDto: CreateUserDto[],
  ) {
    this.logger.log(
      `${UsersController.name}-${this.create.name}-${JSON.stringify(
        createUserDto,
      )}-Request ${currentUser}`,
    );
    try {
      const user = this.usersService.createBulk(createUserDto);
      this.logger.log(
        `${UsersController.name}-${this.create.name}-${JSON.stringify(
          user,
        )}-Response`,
      );
      return user;
    } catch (e) {
      this.logger.log(
        `${UsersController.name}-${this.create.name}-${JSON.stringify(
          e,
        )}-Response`,
      );
      return new HttpException('', 404);
    }
  }

  /**Create one User Méthode */
  @Post()
  create(
    @CurrentUser() currentUser: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    this.logger.log(
      `${UsersController.name}-${this.create.name}-${JSON.stringify(
        createUserDto,
      )}-Request ${currentUser}`,
    );
    try {
      const user = this.usersService.create(createUserDto);
      this.logger.log(
        `${UsersController.name}-${this.create.name}-${JSON.stringify(
          user,
        )}-Response`,
      );
      return user;
    } catch (e) {
      this.logger.log(
        `${UsersController.name}-${this.create.name}-${JSON.stringify(
          e,
        )}-Response`,
      );
      return new HttpException('', 404);
    }
  }

  /**Get All Users Méthode */
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(
      'Pagination DTO is :: ',
      paginationDto instanceof PaginationDto,
    );
    console.log(paginationDto);
    this.logger.log(`${UsersController.name}-${this.findAll.name}-Request`);
    try {
      const user = this.usersService.findAll();
      this.logger.log(
        `${UsersController.name}-${this.findAll.name}-${JSON.stringify(
          user,
        )}-Response`,
      );
      return user;
    } catch (e) {
      this.logger.log(
        `${UsersController.name}-${this.findAll.name}-${JSON.stringify(
          e,
        )}-Response`,
      );
      console.log(e);
      return new HttpException('', 404);
    }
  }

  /**Get one User Méthode */
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }
  /**Delete Plusieur User Méthode */
  @Delete(':bulk')
  removeBulk(@Body() deleted: DeleteManyUserDto) {
    try {
      return this.usersService.removeBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }
  /**Delete one User Méthode */
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }

  // @Get('pipe/:id')
  // pipe(@Param('id', CustomPipePipe) id) {
  //   console.log(id);
  //   return id;
  // }

  @Post(':recover/bulk')
  @HttpCode(200)
  recoverBulk(@Body() deleted: DeleteManyUserDto) {
    try {
      return this.usersService.recoverBulk(deleted);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }
  @Post(':id')
  @HttpCode(200)
  recover(@Param('id') id: string) {
    try {
      return this.usersService.recover(id);
    } catch (e) {
      console.log(e);
      return new HttpException('', 404);
    }
  }
}
