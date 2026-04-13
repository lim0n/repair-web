import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:name',
    renderMode: RenderMode.Server
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
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
