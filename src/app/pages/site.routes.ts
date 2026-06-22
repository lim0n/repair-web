import { Routes } from '@angular/router';

export const SITE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@components/site-template/site-template.component').then((m) => m.SiteTemplateComponent),
    children: [
      { 
        path: '',
        loadComponent: () => import('@pages/home/home').then(m => m.Home),
      },
      { 
        path: 'soglasie',
        loadComponent: () => import('@pages/soglasie/soglasie-page-component').then(m => m.SoglasiePageComponent),
        title: 'Согласие на обработку персональных данных'
      },
      { 
        path: 'privacy-policy',
        loadComponent: () => import('@pages/privacy-policy/privacy-policy-page-component').then(m => m.PrivacyPolicyPageComponent),
        title: 'Политика обработки персональных данных'
      },
      { 
        path: 'washing-machine',
        loadComponent: () => import('@pages/washing-machine/washing-machine-page-component').then(m => m.WashingMachinePageComponent),
        title: 'Ремонт стиральных машин'
      },
      { 
        path: 'dishwasher',
        loadComponent: () => import('@pages/dishwasher/dishwasher-page.component').then(m => m.DishwasherPageComponent),
        title: 'Ремонт посудомоечных машин'
      },
      {
        path: 'dryer',
        loadComponent: () => import('@pages/dryer/dryer-page.component').then(m => m.DryerPageComponent),
        title: 'Ремонт сушильных машин'
      },
      {
        path: 'stove',
        loadComponent: () => import('@pages/stove/stove-page.component').then(m => m.StovePageComponent),
        title: 'Ремонт электрических кухонных плит'
      },
      {
        path: 'oven',
        loadComponent: () => import('@pages/oven/oven-page.component').then(m => m.OvenPageComponent),
        title: 'Ремонт духовок'
      },
      {
        path: 'refrigerator',
        loadComponent: () => import('@pages/refrigerator/refrigerator-page.component').then(m => m.RefrigeratorPageComponent),
        title: 'Ремонт холодильников'
      },
    ]
  }
];
