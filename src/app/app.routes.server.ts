import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:name',
    renderMode: RenderMode.Server
  },
  {
    path: 'manager/users/id/:userid',
    renderMode: RenderMode.Server
  },
  {
    path: 'manager/users/:username',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
