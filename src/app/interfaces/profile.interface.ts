import { IRole } from "./role.interface";
import { IUser } from "./user.interface";

export interface IProfile {
  sub: number;
  roles: IRole[];
  iat: number;
  exp: number;
  profile: IUser;
}