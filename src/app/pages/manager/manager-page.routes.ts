import { Routes } from '@angular/router';

export const MANAGER_PAGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@components/manager-template/manager-template.component').then((m) => m.ManagerTemplateComponent),
    children: [
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
      },
      {
        path: 'orders',
        loadComponent: () => import('@pages/manager/orders/orders-page.component').then(m => m.OrdersPageComponent),
        title: 'Orders page'
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('@pages/manager/orders/order/order-page.component').then(m => m.OrderPageComponent),
        title: 'Users page'
      },
    ]
  }
  
];
