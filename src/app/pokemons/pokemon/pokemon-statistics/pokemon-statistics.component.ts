import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Statistics } from '../../interfaces/pokemon-statistics.interface';

@Component({
  selector: 'app-pokemon-statistics',
  standalone: true,
  template: `
    <p class="heading">Statistics</p>
    @for (stat of statistics; track stat.name; let idx = $index) {
      <div class="stats">
        <label for="stat_name">
          <span>{{idx + 1}}. Name: </span><span id="stat_name" name="stat_name">{{ stat.name }}</span>            
        </label>
        <label for="stat_effort">
          <span>Effort: </span><span id="stat_effort" name="stat_effort">{{ stat.effort }}</span>            
        </label>
        <label for="stat_baseStat">
          <span>Base Stat: </span><span id="stat_baseStat" name="stat_baseStat">{{ stat.baseStat }}</span>            
        </label>
      </div>
    } @empty {
      <p>No statistics</p>
    }
  `,
  styles: [`
    .stats {
      width: 60%;
      display: flex;
    }

    .stats > label {
      flex-basis: 33.33%;
      flex-grow: 1;
      flex-shrink: 1;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonStatisticsComponent {
  @Input({ required: true })
  statistics!: Statistics[];
}
