import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pokemons/pokemon-list/pokemon-list.component')
            .then((m) => m.PokemonListComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
    },
    {
        path: '**',
        redirectTo: 'list',
    }
];
