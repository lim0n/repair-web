import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:name',
    renderMode: RenderMode.Client
  },
  {
    path: 'crud/users/id/:userid',
    renderMode: RenderMode.Client
  },
  {
    path: 'crud/users/:username',
    renderMode: RenderMode.Client
  },
  {
    path: 'crud/orders/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'crud/order-details/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'crud/roles/:name',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
