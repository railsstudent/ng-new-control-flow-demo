import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, map, retry, switchMap } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonDetails, PokemonSpecies } from '../interfaces/pokemon-details.interface';
import { Ability } from '../pokemon-abilities/interfaces/pokemon-abilities.interface';
import { Statistics } from '../pokemon-statistics/interfaces/pokemon-statistics.interface';

const PAGE_SIZE = 30;

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {
  private readonly httpClient = inject(HttpClient);

  private pokemonDetailsTransformer(pokemon: Pokemon, species: PokemonSpecies): PokemonDetails {
    const { id, name, height, weight, sprites, stats: statistics, abilities: a } = pokemon;

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
      frontShiny: sprites.front_shiny,
      color: species?.color?.name ?? '',
      shape: species?.shape?.name ?? '',
      evolvesFromSpecies: species?.evolves_from_species?.name || '',
      stats,
      abilities,
    }
  }

  getPokemonDetails(id: number): Observable<PokemonDetails> {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        switchMap((pokemon) => 
        this.httpClient.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
          .pipe(
            map((species) => this.pokemonDetailsTransformer(pokemon, species)),
            retry(3),
            catchError((err) => {
              console.error(err);
              return EMPTY;
            }),
          )
      ),
    );
  }
}
