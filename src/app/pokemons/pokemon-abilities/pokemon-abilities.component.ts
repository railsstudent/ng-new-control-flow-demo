import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Ability } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-abilities',
  standalone: true,
  template: `
    <p class="heading">Abilities</p>
    @for (ability of abilities; track ability.name) {
      <div class="abilities">
        <label for="ability_name">
          <span>Name: </span><span id="ability_name" name="ability_name">{{ ability.name }}</span>            
        </label>
        <label for="ability_isHidden">
          <span>Effort: </span><span id="ability_isHidden" name="ability_isHidden">{{ ability.isHidden ? 'Yes' : 'No' }}</span>            
        </label>
      </div>
    } @empty {
      <p>No Ability</p>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    .abilities {
      width: 60%;
      display: flex;
    }

    .abilities > label {
      flex-basis: 33.33%;
      flex-grow: 1;
      flex-shrink: 1;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonAbilitiesComponent {
  @Input({ required: true })
  abilities!: Ability[];
}
