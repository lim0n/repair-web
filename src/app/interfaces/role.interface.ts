import { IUser } from "./user.interface";

export interface IRole {
  id?: number;
  name: string;
  description?: string;
  users?: IUser[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
