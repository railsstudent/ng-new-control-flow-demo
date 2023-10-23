import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, retry } from 'rxjs';
import { DisplayPokemon, Pokemon } from '../interfaces/pokemon.interface';

const pokemonTransformer = (pokemon: Pokemon): DisplayPokemon => {
  const { id, name, height, weight, sprites } = pokemon;
  
  return {
    id,
    name,
    height,
    weight,
    frontShiny: sprites.front_shiny,
  }
}

const PAGE_SIZE = 30;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);

  currentPage = signal(0);

  getPageSize() {
    return PAGE_SIZE;
  }

  getPokemons(): Observable<DisplayPokemon[]> {
    const pageSize = this.getPageSize();
    const pokemonIds = [...Array(pageSize).keys()]
      .map((n) => pageSize * this.currentPage() + (n + 1));

    return forkJoin(pokemonIds.map((id) => this.get(id)))
      .pipe(
        map(x => x.filter(x => x)),
        map(x => x as DisplayPokemon[])
      )
  }
  
  get(id: number): Observable<DisplayPokemon | undefined> {
    return this.httpClient
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        map((pokemon) => pokemonTransformer(pokemon)),
        retry(3),
        catchError(() => of(undefined)),
      );
  }
}
