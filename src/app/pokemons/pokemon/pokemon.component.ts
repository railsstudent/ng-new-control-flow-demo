import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonStatisticsComponent } from '../pokemon-statistics/pokemon-statistics.component';
import { PokemonService } from '../services/pokemon.service';
import { toPage } from '../utilities/page';
import { PokemonPhysicalComponent } from '../pokemon-physical/pokemon-physical.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [NgIf, AsyncPipe, PokemonStatisticsComponent, PokemonAbilitiesComponent, PokemonPhysicalComponent],
  template: `
    <div class="content">
      <ng-container *ngIf="pokemonDetails$ | async as pokemonDetails">
        @if (pokemonDetails) {
          @defer {
            <app-pokemon-physical [pokemonDetails]="pokemonDetails" />
            <app-pokemon-statistics [statistics]="pokemonDetails.stats" />
            <app-pokemon-abilities [abilities]="pokemonDetails.abilities" />
          } @loading (after 100ms; minimum 200ms) {
            <p>Loading....</p>
          } @placeholder (minimum 100ms) {
            <p>No Data</p>
          } @error {
            <p>Failed to load dependencies</p>
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

    .button-bar {
      padding: 1rem;
    }

    button {
      padding: 0.25rem;
      border-radius: 4px;
    }

    app-pokemon-statistics,
    app-pokemon-physical,
    app-pokemon-abilities {
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
  pokemonDetails$!: Observable<PokemonDetails | undefined>;

  backToPage() {
    const page = this.pokemonService.getPage(this.idValue);
    this.pokemonService.currentPage.set(page - 1);
    this.router.navigate(['/list'], { queryParams: { page }});
  }
}
