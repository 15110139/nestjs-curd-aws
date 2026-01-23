import type { Insertable, Selectable, Updateable } from 'kysely';

export type UsersTable = {
  user_id: number;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Database = {
  users: UsersTable;
};

export type UserRow = Selectable<UsersTable>;
export type NewUserRow = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;
