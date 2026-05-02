import { IEntity } from "./entity.interface";

export interface IOrderBanner<T> extends IEntity<T> {
  longTitle?: string;
  orderName?: string;
}