import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { Kysely } from 'kysely';
import type { Database, UserRow, NewUserRow, UserUpdate } from '../database/database.types';
import { KYSELY_DB } from '../database/database.constants';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(KYSELY_DB) private readonly db: Kysely<Database>) {}

  async create(createUserDto: CreateUserDto): Promise<UserRow> {
    const now = new Date();
    const newUser: NewUserRow = {
      email: createUserDto.email,
      name: createUserDto.name,
      created_at: now,
      updated_at: now,
    };

    const [user] = await this.db
      .insertInto('users')
      .values(newUser)
      .returningAll()
      .execute();

    return user;
  }

  async findAll(): Promise<UserRow[]> {
    return await this.db.selectFrom('users').selectAll().execute();
  }

  async findOne(id: number): Promise<UserRow> {
    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .where('user_id', '=', id)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserRow> {
    const update: UserUpdate = {
      ...updateUserDto,
      updated_at: new Date(),
    };

    const [updatedUser] = await this.db
      .updateTable('users')
      .set(update)
      .where('user_id', '=', id)
      .returningAll()
      .execute();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.db.deleteFrom('users').where('user_id', '=', id).execute();
  }
}
