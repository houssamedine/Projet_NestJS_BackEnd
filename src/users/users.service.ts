import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteManyUserDto } from './dto/delete-many-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  logger: Logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private repositoryUSer: Repository<User>,
  ) {}

  /**Create Plusieur User Méthode */
  async createBulk(createUserDto: CreateUserDto[]): Promise<User[]> {
    this.logger.log(
      `${UsersService.name}-${this.create.name}-${JSON.stringify(
        createUserDto,
      )}-Request`,
    );
    try {
      const user = await this.repositoryUSer.save(createUserDto);
      this.logger.log(
        `${UsersService.name}-${this.create.name}-${JSON.stringify(
          user,
        )}-Response`,
      );
      return user;
    } catch (e) {
      this.logger.log(`${UsersService.name}-${this.create.name}-${e}-Response`);
      throw new NotFoundException();
    }
  }
  /**Create One Méthode */
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(
      `${UsersService.name}-${this.create.name}-${JSON.stringify(
        createUserDto,
      )}-Request`,
    );
    try {
      const user = await this.repositoryUSer.save(createUserDto);
      this.logger.log(
        `${UsersService.name}-${this.create.name}-${JSON.stringify(
          user,
        )}-Response`,
      );
      return user;
    } catch (e) {
      this.logger.log(`${UsersService.name}-${this.create.name}-${e}-Response`);
      throw new NotFoundException();
    }
  }

  /**Find All Users Méthode */
  async findAll(): Promise<User[]> {
    this.logger.log(`${UsersService.name}-${this.findAll.name}-Request`);

    try {
      const user = await this.repositoryUSer.find();
      this.logger.log(
        `${UsersService.name}-${this.findAll.name}-${JSON.stringify(
          user,
        )}-Response`,
      );
      return user;
    } catch (e) {
      this.logger.log(
        `${UsersService.name}-${this.findAll.name}-${JSON.stringify(
          e,
        )}-Response`,
      );
      throw new NotFoundException();
    }
  }

  /**Find One User Méthode */
  async findOne(id: string): Promise<User> {
    this.logger.log(`${UsersService.name}-${this.findOne.name}-Request`);

    try {
      const user = await this.repositoryUSer.findOne({
        where: { id },
        // select: ['emial'],
        // relations: [''],
      });

      if (user)
        this.logger.log(
          `${UsersService.name}-${this.findOne.name}-${user}-Response`,
        );
      return user;
      throw new NotFoundException();
    } catch (e) {
      this.logger.log(
        `${UsersService.name}-${this.findOne.name}-${e}-Response`,
      );
      throw new NotFoundException();
    }
  }

  /**Update One User Méthode */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(
      `${UsersService.name}-${this.update.name}-${updateUserDto}-Request`,
    );

    try {
      await this.findOne(id);

      const result = await this.repositoryUSer.update({ id }, updateUserDto);
      if (result.affected > 0) return await this.findOne(id);
      else throw new InternalServerErrorException();

      this.logger.log(
        `${UsersService.name}-${this.update.name}-${result}-Response`,
      );
    } catch (e) {
      this.logger.log(`${UsersService.name}-${this.update.name}-${e}-Response`);
      throw new NotFoundException();
    }
  }

  /**Delete One User Méthode */
  /*
  // Suppession Physique:

  async remove(id: string): Promise<boolean> {
    this.logger.log(`${UsersService.name}-${this.remove.name}-Request`);

    //Remove
    let user = await this.findOne(id);
    user = await this.repositoryUSer.remove(user);
    return user ? true : false;

    //Delete
    // const res = await this.repositoryUSer.delete({ id });
    // return res.affected > 0 ? true : false;
  }
  catch(e) {
    this.logger.log(`${UsersService.name}-${this.remove.name}-${e}-Response`);
    throw new NotFoundException();
  }
*/

  /**Delete Plusieur User Méthode */
  async removeBulk(deleted: DeleteManyUserDto): Promise<boolean> {
    try {
      //Remove
      const users = await this.repositoryUSer.find({
        where: { id: In(deleted.ids) },
      });

      await this.repositoryUSer.softRemove(users);
      return users.length > 0 ? true : false;

      //Delete
      // const res = await this.repositoryUSer.delete({ id });
      // return res.affected > 0 ? true : false;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  /**Delete One User Méthode */
  // Suppession Logique: ==> Soft Remove
  async remove(id: string): Promise<boolean> {
    try {
      const user = await this.findOne(id);
      await this.repositoryUSer.softRemove(user);
      return user ? true : false;
    } catch (e) {
      this.logger.log(`${UsersService.name}-${this.remove.name}-${e}-Response`);
      throw new NotFoundException();
    }
  }

  /**Rcovrer Plusieur User Méthode */
  async recoverBulk(deleted: DeleteManyUserDto): Promise<User[]> {
    try {
      let users = await this.repositoryUSer.find({
        where: { id: In(deleted.ids) },
        withDeleted: true,
      });
      users = await this.repositoryUSer.recover(users);
      return users;
    } catch (e) {
      this.logger.log(`${UsersService.name}-${this.remove.name}-${e}-Response`);
      throw new NotFoundException();
    }
  }
  /**Rcovrer One User Méthode */
  async recover(id: string): Promise<User> {
    try {
      const user = await this.repositoryUSer.findOne({
        where: { id },
        withDeleted: true,
      });
      await this.repositoryUSer.recover(user);
      return user;
    } catch (e) {
      this.logger.log(`${UsersService.name}-${this.remove.name}-${e}-Response`);
      throw new NotFoundException();
    }
  }
}
