import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, iif, map, of, retry, switchMap } from 'rxjs';
import { DisplayPokemon, Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonDetails, PokemonSpecies } from '../interfaces/pokemon-details.interface';
import { Ability } from '../pokemon-abilities/interfaces/pokemon-abilities.interface';
import { Statistics } from '../pokemon-statistics/interfaces/pokemon-statistics.interface';

function isDisplayPokemon(pokemon: Pokemon | DisplayPokemon): pokemon is DisplayPokemon {
  return 'frontShiny' in pokemon;
}


const PAGE_SIZE = 30;

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {
  private readonly httpClient = inject(HttpClient);

  private pokemonDetailsTransformer(pokemon: Pokemon | DisplayPokemon, species: PokemonSpecies): PokemonDetails {
    const { id, name, height, weight, stats: statistics, abilities: a } = pokemon;
    const frontShiny = isDisplayPokemon(pokemon) ? pokemon.frontShiny : pokemon.sprites.front_shiny;

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
      frontShiny,
      color: species?.color?.name ?? '',
      shape: species?.shape?.name ?? '',
      evolvesFromSpecies: species?.evolves_from_species?.name || '',
      stats,
      abilities,
    }
  }

  getPokemonDetails(id: number, displayPokemon: DisplayPokemon | undefined): Observable<PokemonDetails> {
    const getPokemon$ = iif(() => !displayPokemon, 
      this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`), 
      of(displayPokemon as DisplayPokemon));
    
    return getPokemon$.pipe(switchMap((pokemon) => 
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
