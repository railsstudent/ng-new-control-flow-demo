import { Ability } from '../pokemon-abilities/interfaces/pokemon-abilities.interface';
import { Statistics } from '../pokemon-statistics/interfaces/pokemon-statistics.interface';
import { DisplayPokemon, Resource } from '../../interfaces/pokemon.interface';

export interface PokemonSpecies {
    id: number;
    shape: Resource;
    color: Resource;
    evolves_from_species: Resource;
}

export type PokemonDetails = DisplayPokemon & {
    color: string;
    shape: string;
    evolvesFromSpecies: string;
    stats: Statistics[],
    abilities: Ability[],
}
