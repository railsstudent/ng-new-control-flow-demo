import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, retry } from 'rxjs';
import { DisplayPokemon, Pokemon } from '../interfaces/pokemon.interface';

const PAGE_SIZE = 30;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);

  currentPage = signal(0);

  getPage(pokemonId: number): number {
    return Math.ceil(pokemonId / PAGE_SIZE);
  }

  getPokemons(): Observable<DisplayPokemon[]> {
    const pageSize = PAGE_SIZE;
    const pokemonIds = [...Array(pageSize).keys()]
      .map((n) => pageSize * this.currentPage() + (n + 1));

    return forkJoin(pokemonIds.map((id) => this.get(id)))
      .pipe(
        map(x => x.filter(x => x)),
        map(x => x as DisplayPokemon[])
      );
  }

  pokemonTransformer(pokemon: Pokemon): DisplayPokemon {
    const { id, name, height, weight, sprites } = pokemon;
    
    return {
      id,
      name,
      height,
      weight,
      frontShiny: sprites.front_shiny,
    }
  }
  
  get(id: number): Observable<DisplayPokemon | undefined> {
    return this.httpClient
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        map((pokemon) => this.pokemonTransformer(pokemon)),
        retry(3),
        catchError(() => of(undefined)),
      );
  }
}
