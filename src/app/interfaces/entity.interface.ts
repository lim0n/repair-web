import { UrlTree } from "@angular/router";

export interface IEntity {
  title?: string;
  description?: string;
  icon?: string;
  route?: any[] | string | UrlTree | null | undefined;
}