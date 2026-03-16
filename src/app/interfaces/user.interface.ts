import { IOrder } from "./order.interface";

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
  /** JWT-токен */
  access_token?: string;
  /** Заказы пользователя */
  orders?: IOrder[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
