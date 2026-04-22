import { IAgreement } from "./agreement.interface";
import { IOrder } from "./order.interface";
import { IRole } from "./role.interface";

export interface IUser {
  id?: number;
  /** Имя пользователя */
  username?: string;
  /** Пароль */
  password?: string;
  /** ФИО */
  name?: string;
  /** Электропочта */
  email?: string;
  /** Номер телефона */
  phone?: string;
  /** Роль */
  user_role?: 'admin' | 'manager' | 'editor' | 'viewer';
  /** Роли */
  roles: IRole[];
  /** JWT-токены */
  access_token: string;
  refresh_token: string;
  /** Заказы пользователя */
  orders?: IOrder[];
  agreements: IAgreement[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
