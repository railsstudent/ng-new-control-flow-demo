import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, forkJoin, map, retry } from 'rxjs';
import { DisplayPokemon, Pokemon } from '../interfaces/pokemon.interface';
import { Ability } from '../interfaces/pokemon-abilities.interface';
import { Statistics } from '../interfaces/pokemon-statistics.interface';

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

    return forkJoin(pokemonIds.map((id) => this.get(id)));
  }

  private pokemonTransformer(pokemon: Pokemon): DisplayPokemon {
    const { id, name, height, weight, sprites, abilities: a, stats: statistics } = pokemon;

    const abilities: Ability[] = a.map(({ ability, is_hidden }) => ({
      name: ability.name,
      isHidden: is_hidden
    }));
  
    const stats: Statistics[] = statistics.map(({ stat, effort, base_stat }) => ({
      name: stat.name,
      effort,
      baseStat: base_stat,
    }));
    
    return {
      id,
      name,
      height,
      weight,
      abilities,
      stats,
      frontShiny: sprites.front_shiny,
    }
  }
  
  private get(id: number): Observable<DisplayPokemon> {
    return this.httpClient
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        map((pokemon) => this.pokemonTransformer(pokemon)),
        retry(3),
        catchError((err) => { 
          console.error(err);
          return EMPTY; 
        }),
      );
  }
}
