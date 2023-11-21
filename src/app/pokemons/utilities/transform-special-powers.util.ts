import { Ability } from '../interfaces/pokemon-abilities.interface';
import { Statistics } from '../interfaces/pokemon-statistics.interface';
import { RawAbility, RawStats } from '../interfaces/pokemon.interface';

export function transformSpecialPowers(rawAbilities: RawAbility[], rawStats: RawStats[]) {
    const abilities: Ability[] = rawAbilities.map(({ ability, is_hidden }) => ({
      name: ability.name,
      isHidden: is_hidden
    }));

    const stats: Statistics[] = rawStats.map(({ stat, effort, base_stat }) => ({
      name: stat.name,
      effort,
      baseStat: base_stat,
    }));

    return { 
      abilities, 
      stats 
    };
}
