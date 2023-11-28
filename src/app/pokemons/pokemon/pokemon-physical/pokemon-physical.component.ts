import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { PokemonAffliationComponent } from '../pokemon-affliation/pokemon-affliation.component';
import { PokemonAffiliation } from '../pokemon-affliation/types/affiliation.type';

@Component({
  selector: 'app-pokemon-physical',
  standalone: true,
  imports: [TitleCasePipe, PokemonAffliationComponent],
  template: `
    <img [src]="pokemonDetails.frontShiny" alt="pokemon image" width="100" height="100" />
    <app-pokemon-affliation [affiliation]="pokemonAffiliation" />
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
export class PokemonPhysicalComponent implements OnInit {
  @Input({ required: true })
  pokemonDetails!: PokemonDetails;

  pokemonAffiliation!: PokemonAffiliation;

  ngOnInit(): void {
    if (this.pokemonDetails.name === 'pikachu') {
      this.pokemonAffiliation = {
        type: 'pikachu',
        owner: 'Ash',
      }
    } else if (this.pokemonDetails.name === 'meowth') { 
      this.pokemonAffiliation = {
        type: 'meowth',
        owner: 'Rocket',
      }
    } else if (this.pokemonDetails.name === 'staryu') {
      this.pokemonAffiliation = {
        type: 'staryu',
        owner: 'Misty',
      }
    } else if (this.pokemonDetails.name === 'steelix') {
      this.pokemonAffiliation = {
        type: 'steelix',
        owner: 'Brock',
      }
    } else {
      this.pokemonAffiliation = {
        type: 'unknown',
        warningMessage: 'Your team is unknown'
      }
    }
  }
}
