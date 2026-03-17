import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IRouteEntry } from '@interfaces/route-entry.interface';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  // breadcrumbs: IRouteEntry[] = [];
  private bs = signal<IRouteEntry[]>([]);
  breadcrumbs = this.bs.asReadonly();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.bs.set(this.dedup(this.createBreadcrumbs(this._activatedRoute.root)));
      // this.breadcrumbs = this.createBreadcrumbs(this._activatedRoute.root);
    });
  }

  private dedup(array: IRouteEntry[]): IRouteEntry[] {
    const ids = new Set();
    return array.filter(({ url }) => !ids.has(url) && ids.add(url));
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

      // breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url });
      breadcrumbs.push({ label: child.snapshot.title || 'Untitled', url });
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
