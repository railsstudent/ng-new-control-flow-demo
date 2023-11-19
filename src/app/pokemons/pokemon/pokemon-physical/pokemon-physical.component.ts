import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { PokemonAffliationComponent } from '../pokemon-affliation/pokemon-affliation.component';

@Component({
  selector: 'app-pokemon-physical',
  standalone: true,
  imports: [TitleCasePipe, PokemonAffliationComponent],
  template: `
    <img [src]="pokemonDetails.frontShiny" alt="pokemon image" width="100" height="100" />
    <app-pokemon-affliation [name]="pokemonDetails.name" />
    <div class="physical">
      <label for="id">
        <span>Id: </span><span id="id" name="id">{{ pokemonDetails.id }}</span>            
      </label>
      <label for="name">
        <span>Name: </span><span id="name" name="name">{{ pokemonDetails.name | titlecase }}</span>            
      </label>
      <label for="weight">
        <span>Weight: </span><span id="weight" name="weight">{{ pokemonDetails.weight }}</span>            
      </label>
      <label for="height">
        <span>Height: </span><span id="height" name="height">{{ pokemonDetails.height }}</span>            
      </label>
      <label for="color">
        <span>Color: </span><span id="color" name="color">{{ pokemonDetails.color }}</span>            
      </label>
      <label for="shape">
        <span>Shape: </span><span id="shape" name="shape">{{ pokemonDetails.shape }}</span>            
      </label>
    </div>
  `,
  styles: [`
    .physical {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
    }

    .physical > label {
      margin-right: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPhysicalComponent {
  @Input({ required: true })
  pokemonDetails!: PokemonDetails;
}
