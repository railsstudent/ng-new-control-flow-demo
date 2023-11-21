import { Ability } from './pokemon-abilities.interface';
import { Statistics } from './pokemon-statistics.interface';

export interface Resource {
    name: string;
    url: string;
}

export interface RawStats {
  base_stat: number;
  effort: number;
  stat: Resource;
}
 
export interface RawAbility {
  ability: Resource;
  slot: number;
  is_hidden: boolean;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      back_shiny: string;
      front_shiny: string;
    },
    stats: RawStats [],
    abilities: RawAbility[]
}
  
export type DisplayPokemon = Omit<Pokemon, 'sprites' | 'stats' | 'abilities'> & {
    frontShiny: string;
    abilities: Ability[];
    stats: Statistics[];
}

