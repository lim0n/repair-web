// seo.service.ts
import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private meta = inject(Meta);

  initMetaListener(): void {
    this.router.events.pipe(
      // Only trigger updates when a navigation cycle completes successfully
      filter(event => event instanceof NavigationEnd),
      // Traverse down to the deepest active child route
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      // Pull the data object from the active route
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data)
    ).subscribe(data => {
      const desc = data['description'] || 'Ремонт бытовой техники';
      const ogScope:any = {};
      
      if (data['ogDescription']) {
        ogScope['og:description'] = data['ogDescription']
      }

      if (data['ogImage']) {
        ogScope['og:description'] = data['ogImage']
      }

      this.updateMetaDescription(desc);
    });
  }

  private updateMetaDescription(description: string): void {
    // Replaces the existing tag or adds it if missing
    this.meta.updateTag({ name: 'description', content: description });
  }
}
