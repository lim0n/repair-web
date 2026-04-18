import { UrlTree } from "@angular/router";
import { IIcon } from "./icon.interface";

export interface IEntity<T = any> {
  id?: string;
  title?: string;
  description?: string;
  icon?: string | IIcon;
  route?: any[] | string | UrlTree | null | undefined;
  content?: T;
}
