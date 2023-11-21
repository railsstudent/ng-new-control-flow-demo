import { Ability } from '../../interfaces/pokemon-abilities.interface';
import { Statistics } from '../../interfaces/pokemon-statistics.interface';
import { Resource } from '../../interfaces/pokemon.interface';

export interface PokemonSpecies {
    id: number;
    shape: Resource;
    color: Resource;
    evolves_from_species: Resource;
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    frontShiny: string;
    color: string;
    shape: string;
    evolvesFromSpecies: string;
    stats: Statistics[],
    abilities: Ability[],
}
