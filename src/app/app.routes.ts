import { Routes } from '@angular/router';
import { authGuard } from './helpers/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('@pages/site.routes').then(m => m.SITE_ROUTES),
        title: 'Эксперт-сервис"'
    },
    {
        path: 'articles/:name',
        loadComponent: () => import('@pages/articles/article/article').then(m => m.Article),
        title: 'Article details',
    },
    {
        path: '404',
        loadComponent: () => import('@pages/service-pages/not-found-page/not-found-page').then(m => m.NotFoundPage),
        title: 'Неверный адрес страницы'
    },
    { 
        path: 'login',
        loadComponent: () => import('@pages/service-pages/login-page/login-page').then(m => m.LoginPage),
        title: 'Login'
    },
    {
        path: 'crud',
        loadChildren: () => import('@pages/crud/crud-page.routes').then(m => m.CRUD_PAGE_ROUTES),
        canActivate: [ authGuard ],
        title: 'API CRUD',
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];
