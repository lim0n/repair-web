import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@pages/home/home').then(m => m.Home),
        title: 'Home page'
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
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];
