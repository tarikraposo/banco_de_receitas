import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/receitas/pages/home/home').then((m) => m.Home),
  },
  {
    path: 'receitas',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/receitas/pages/receita-list/receita-list').then((m) => m.ReceitaList),
      },
      {
        path: 'receitas',
        loadComponent: () =>
          import('./features/receitas/pages/receita-list/receita-list').then((m) => m.ReceitaList),
      },
      {
        path: 'nova',
        loadComponent: () =>
          import('./features/receitas/pages/receita-create/receita-create').then(
            (m) => m.ReceitaCreate,
          ),
      },
      {
        path: ':id/editar',
        loadComponent: () =>
          import('./features/receitas/pages/receita-edit/receita-edit').then((m) => m.ReceitaEdit),
      },
    ],
  },
];
