import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pokemons/pokemon-list/pokemon-list.component')
            .then((m) => m.PokemonListComponent),
    },
    {
        path: 'list/pokemon/:id',
        loadComponent: () => import('./pokemons/pokemon/pokemon.component')
            .then((m) => m.PokemonComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/list?page=1',
    },
    {
        path: '**',
        redirectTo: '/list?page=1',
    }
];
