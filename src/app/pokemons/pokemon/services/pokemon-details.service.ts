import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, iif, map, of, retry, switchMap } from 'rxjs';
import { Ability } from '../../interfaces/pokemon-abilities.interface';
import { Statistics } from '../../interfaces/pokemon-statistics.interface';
import { DisplayPokemon, Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonDetails, PokemonSpecies } from '../interfaces/pokemon-details.interface';
import { transformSpecialPowers } from '../../utilities/transform-special-powers.util';

function isDisplayPokemon(pokemon: Pokemon | DisplayPokemon): pokemon is DisplayPokemon {
  return typeof pokemon !== 'undefined' &&  'frontShiny' in pokemon;
}

const PAGE_SIZE = 30;

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {
  private readonly httpClient = inject(HttpClient);

  private getDetails(pokemon: Pokemon | DisplayPokemon): { frontShiny: string, abilities: Ability[], stats: Statistics[] } {
    if (isDisplayPokemon(pokemon)) {
      return {
        frontShiny: pokemon.frontShiny,
        abilities: pokemon.abilities,
        stats: pokemon.stats
      }
    }

    const { abilities, stats } = transformSpecialPowers(pokemon.abilities, pokemon.stats);

    return {
      frontShiny: pokemon.sprites.front_shiny,
      stats,
      abilities,
    }
  }

  private pokemonDetailsTransformer(pokemon: Pokemon | DisplayPokemon, species: PokemonSpecies): PokemonDetails {
    const { id, name, height, weight, stats: statistics, abilities: a } = pokemon;
    const details = this.getDetails(pokemon);
    
    return {
      ...details,
      id,
      name,
      height,
      weight,
      color: species?.color?.name ?? '',
      shape: species?.shape?.name ?? '',
      evolvesFromSpecies: species?.evolves_from_species?.name ?? '',
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
