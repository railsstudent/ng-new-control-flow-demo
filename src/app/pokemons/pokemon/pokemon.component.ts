import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonStatisticsComponent } from '../pokemon-statistics/pokemon-statistics.component';
import { PokemonService } from '../services/pokemon.service';
import { toPage } from '../utilities/page.utility';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [NgIf, AsyncPipe, PokemonStatisticsComponent, PokemonAbilitiesComponent],
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
          <app-pokemon-statistics [statistics]="pokemonDetails.stats" />
          <app-pokemon-abilities [abilities]="pokemonDetails.abilities" />
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

    .button-bar {
      padding: 1rem;
    }

    button {
      padding: 0.25rem;
      border-radius: 4px;
    }

    app-pokemon-statistics {
      margin-bottom: 0.5rem;
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
