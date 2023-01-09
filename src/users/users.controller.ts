import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../commun/dto/pagination.dto';
import { CurrentUser } from '../commun/decorators/current-decorator/current-decorator.decorator';

@Controller('users')
export class UsersController {
  logger: Logger = new Logger('UsersController');
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @CurrentUser() currentUser: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log('instanceOf', createUserDto instanceof CreateUserDto);
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
      console.log(e);
      return new HttpException('', 404);
    }
  }

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
}
