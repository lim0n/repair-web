import { IOrderDetails } from "./order-details.interface";
import { IUser } from "./user.interface";

export interface IOrder {
  id?: number;
  /** Заказчик */
  user?: IUser;
  /** id заказчика */
  user_id?: number;
  /** Электропочта, указанная в заказе */
  email?: string;
  /** Имя, указанное в заказ */
  name?: string;
  /** Номер телефона, указанный в заказе */
  phone?: string;
  /** Подробности/комментарии к заказу */
  order_details?: IOrderDetails[];
  isDraft?: boolean;
  /** Заголовок заявки */
  order_name?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}