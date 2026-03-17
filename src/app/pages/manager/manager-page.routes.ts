import { Routes } from '@angular/router';

export const MANAGER_PAGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@components/manager-template/manager-template.component').then((m) => m.ManagerTemplateComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/manager/manager-page').then(m => m.ManagerPage),
        title: 'Manager'
      },
      {
        path: 'users',
        // loadComponent: () => import('@pages/manager/users/users-page').then(m => m.UsersPage),
        title: 'Users',
        children: [
          {
            path: '',
            loadComponent: () => import('@pages/manager/users/users-page').then(m => m.UsersPage),
            // title: 'Users',
          },
          {
            path: 'create-user',
            loadComponent: () => import('@pages/manager/users/create-user/create-user-page').then(m => m.CreateUserPage),
            title: 'Create user'
          },
          {
            path: 'id/:userid',
            loadComponent: () => import('@pages/manager/users/user/user-page').then(m => m.UserPage),
            title: 'User'
          },
          {
            path: ':username',
            loadComponent: () => import('@pages/manager/users/user/user-page').then(m => m.UserPage),
            title: 'User'
          },
        ]
      },
      // {
      //   path: 'create-user',
      //   loadComponent: () => import('@pages/manager/users/create-user/create-user-page').then(m => m.CreateUserPage),
      //   title: 'Create user'
      // },
      // {
      //   path: 'users/id/:userid',
      //   loadComponent: () => import('@pages/manager/users/user/user-page').then(m => m.UserPage),
      //   title: 'User'
      // },
      // {
      //   path: 'users/:username',
      //   loadComponent: () => import('@pages/manager/users/user/user-page').then(m => m.UserPage),
      //   title: 'User'
      // },
      {
        path: 'orders',
        title: 'Orders',
        children: [
          {
            path: '',
            loadComponent: () => import('@pages/manager/orders/orders-page.component').then(m => m.OrdersPageComponent),
          },
          {
            path: ':id',
            loadComponent: () => import('@pages/manager/orders/order/order-page.component').then(m => m.OrderPageComponent),
            title: 'Order'
          },
        ]
      },
      // {
      //   path: 'orders',
      //   loadComponent: () => import('@pages/manager/orders/orders-page.component').then(m => m.OrdersPageComponent),
      //   title: 'Orders',
      // },
      // {
      //   path: 'orders/:id',
      //   loadComponent: () => import('@pages/manager/orders/order/order-page.component').then(m => m.OrderPageComponent),
      //   title: 'Order'
      // },
    ]
  }
  
];
