import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, retry } from 'rxjs';
import { Ability, DisplayPokemon, Pokemon, Statistics } from '../interfaces/pokemon.interface';

const pokemonTransformer = (pokemon: Pokemon): DisplayPokemon => {
  const stats = pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    effort: stat.effort,
    baseStat: stat.base_stat,
  }));

  const abilities = pokemon.abilities.map((ability) => ({
    name: ability.ability.name,
    isHidden: ability.is_hidden
  }));

  const { id, name, height, weight, sprites } = pokemon;
  
  return {
    id,
    name,
    height,
    weight,
    backShiny: sprites.back_shiny,
    frontShiny: sprites.front_shiny,
    abilities,
    stats,
  }
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);

  getPokemons(): Observable<DisplayPokemon[]> {
    return forkJoin([
      this.get(25),
      this.get(1),
      this.get(3),
      this.get(5),
      this.get(26)
    ]);
  }
  
  get(id: number): Observable<DisplayPokemon> {
    return this.httpClient
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        map((pokemon) => pokemonTransformer(pokemon)),
        retry(2),
        catchError(() => of({
          id: -1,
          name: '',
          height: -1,
          weight: -1,
          backShiny: '',
          frontShiny: '',
          abilities: [] as Ability[],
          stats: [] as Statistics[],
        })),
      );
  }
}
