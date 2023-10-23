import { Ability, DisplayPokemon, Resource, Statistics } from './pokemon.interface';

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
