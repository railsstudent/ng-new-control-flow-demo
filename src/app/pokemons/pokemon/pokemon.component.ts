import { Statistics } from './../interfaces/pokemon.interface';
import { ChangeDetectionStrategy, Component, Injector, Input, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { PokemonService } from '../services/pokemon.service';
import { toPage } from '../utilities/page.utility';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <div class="content">
      <ng-container *ngIf="pokemonDetails$ | async as pokemonDetails">
        @if (pokemonDetails) {
          <img [src]="pokemonDetails.frontShiny" alt="pokemon image" width="100" height="100" />
          <div class="physical">
            <label for="id">
              <span>Id: </span><span id="id" name="id">{{ pokemonDetails.id }}</span>            
            </label>
            <label for="name">
              <span>Name: </span><span id="name" name="name">{{ pokemonDetails.name }}</span>            
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
          <p>Statistics</p>
          @for (stat of pokemonDetails.stats; track stat.name) {
            <div class="stats">
              <label for="stat_name">
                <span>Name: </span><span id="stat_name" name="stat_name">{{ stat.name }}</span>            
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
          <p>Abilities</p>
          @for (ability of pokemonDetails.abilities; track ability.name) {
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
        } @else {
          <p>Pokemone does not exist</p>
        }
      </ng-container>
    </div>
    <div class="button-bar">
      <button (click)="backToPage()">Go back</button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }

    .physical {
      display: flex;
      flex-wrap: wrap;
    }

    .physical > label {
      margin-right: 1rem;
    }

    label {
      margin-bottom: 0.25rem;
    }

    .button-bar {
      padding: 1rem;
    }

    button {
      padding: 0.25rem;
      border-radius: 4px;
    }

    .stats, .abilities {
      width: 60%;
      display: flex;
    }

    .stats > label, .abilities > label {
      flex-basis: 33.33%;
      flex-grow: 1;
      flex-shrink: 1;
    }

    .stats > label > span:first-of-type, label > span:first-of-type {
      color: #aaa;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent {
  idValue = 1;

  @Input({ required: true, transform: (id: string) => toPage(id, 1) })
  set id(value: number) {
    this.idValue = value;
    this.pokemonDetails$ = this.pokemonService.getPokemonDetails(this.idValue);
  }

  pokemonService = inject(PokemonService);
  router = inject(Router);
  injector = inject(Injector);
  pokemonDetails$!: Observable<PokemonDetails | undefined>;

  backToPage() {
    const page = this.pokemonService.getPage(this.idValue);
    this.pokemonService.currentPage.set(page - 1);
    this.router.navigate(['/list'], { queryParams: { page }});
  }
}
