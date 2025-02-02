import { LookupsDto } from './shared-models';

export interface UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  roles: LookupsDto[];
  createAt: string;
  updateAt: string;
}

export interface CreateSystemUserOutputDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UpdateSystemUserOutputDto {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  roles: string[];
  currentUserId?: string;
}
