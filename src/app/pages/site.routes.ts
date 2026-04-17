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
        title: 'Согласие на обработку персональных данных'
      },
      { 
        path: 'washing-machine',
        loadComponent: () => import('@pages/washing-machine/washing-machine-page-component').then(m => m.WashingMachinePageComponent),
        title: 'Ремонт стиральных машин'
      },
    ]
  }
];
