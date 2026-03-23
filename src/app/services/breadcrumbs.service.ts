import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IRouteEntry } from '@interfaces/route-entry.interface';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private bs = signal<IRouteEntry[]>([]);
  breadcrumbs = this.bs.asReadonly();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.bs.set(this.deduplicateBreadcrumbs(this.createBreadcrumbs(this._activatedRoute.root)));
    });
  }

  changeLastTitle(title: string): void {
    this.bs.update(bc => bc.map((item, index) => {
      if (index === bc.length-1) {
        item.title = title;
      }
      return item
    }))
  }

  private deduplicateBreadcrumbs(array: IRouteEntry[]): IRouteEntry[] {
    const entries = new Set();
    return array.filter(({ url }) => !entries.has(url) && entries.add(url));
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IRouteEntry[] = []): IRouteEntry[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if ( child.snapshot.title ) {
        breadcrumbs.push({ title: child.snapshot.title, url });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
