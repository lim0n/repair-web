export interface IOrderDetails {
  id?: number;
  /** Заказ */
  order_id?: number;
  /** Комментарий */
  details?: string;
  /** id пользователя - автора комментария */
  author?: number;
  /** Скрытй для обычного пользователя комментарий */
  hidden?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}