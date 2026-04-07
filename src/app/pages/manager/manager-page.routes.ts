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
        title: 'Пользователи',
        children: [
          {
            path: '',
            loadComponent: () => import('@pages/manager/users/users-page').then(m => m.UsersPage),
            // title: 'Users',
          },
          {
            path: 'create-user',
            loadComponent: () => import('@pages/manager/users/create-user/create-user-page').then(m => m.CreateUserPage),
            title: 'Создать пользователя'
          },
          {
            path: 'id/:userid',
            loadComponent: () => import('@pages/manager/users/user/user-page').then(m => m.UserPage),
            title: 'Пользователь'
          },
          {
            path: ':username',
            loadComponent: () => import('@pages/manager/users/user/user-page').then(m => m.UserPage),
            title: 'Пользователь'
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
        title: 'Заказы',
        children: [
          {
            path: '',
            loadComponent: () => import('@pages/manager/orders/orders-page.component').then(m => m.OrdersPageComponent),
          },
          {
            path: 'create-order',
            loadComponent: () => import('@pages/manager/orders/create-order/create-order-page.component').then(m => m.CreateOrderPage),
            title: 'Создать заказ'
          },
          {
            path: ':id',
            loadComponent: () => import('@pages/manager/orders/order/order-page.component').then(m => m.OrderPageComponent),
            title: 'Заказ'
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
      {
        path: 'order-details',
        title: 'Подробности',
        children: [
          {
            path: '',
            loadComponent: () => import('@pages/manager/order-details/order-details-page.component').then(m => m.OrderDetailsPage),
          },
          {
            path: 'create-order-details',
            loadComponent: () => import('@pages/manager/order-details/create-order-details-item/create-order-details-item-page.component').then(m => m.CreateOrderDetailsItemPageComponent),
            title: 'Создать заказ'
          },
          {
            path: ':id',
            loadComponent: () => import('@pages/manager/order-details/order-details-item/order-details-item-page.component').then(m => m.OrderDetailsItemPageComponent),
            title: 'Заказ'
          },
        ]
      },
    ]
  }
  
];
