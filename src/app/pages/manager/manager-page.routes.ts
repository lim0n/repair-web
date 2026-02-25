import { Routes } from '@angular/router';

export const MANAGER_PAGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/manager/manager-page').then(m => m.ManagerPage),
    title: 'Manager page'
  },
  {
    path: 'users',
    loadComponent: () => import('@pages/manager/users/users-page').then(m => m.UsersPage),
    title: 'Users page'
  },
  {
    path: 'users/create-user',
    loadComponent: () => import('@pages/manager/users/create-user/create-user-page').then(m => m.CreateUserPage),
    title: 'Users page'
  },
  {
    path: 'users/id/:userid',
    loadComponent: () => import('@pages/manager/users/user/user-page').then(m => m.UserPage),
    title: 'Users page'
  },
  {
    path: 'users/:username',
    loadComponent: () => import('@pages/manager/users/user/user-page').then(m => m.UserPage),
    title: 'Users page'
  }
];
