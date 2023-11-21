import { Resource } from '../../interfaces/pokemon.interface';
import { Ability } from '../pokemon-abilities/interfaces/pokemon-abilities.interface';
import { Statistics } from '../pokemon-statistics/interfaces/pokemon-statistics.interface';

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
