import { Routes } from '@angular/router';

export const MANAGER_PAGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@components/site-template/site-template.component').then((m) => m.SiteTemplateComponent),
    children: [
      { 
        path: '',
        loadComponent: () => import('@pages/home/home').then(m => m.Home),
      },
    ]
  }
];
