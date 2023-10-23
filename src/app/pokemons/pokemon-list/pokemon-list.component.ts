import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { switchMap } from 'rxjs';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PokemonCardComponent],
  template: `
    <div class="container">
      <h2>Pokemon List</h2>
      <div class="card-layout">
        @for (pokemon of pokemons(); track pokemon.id) {
          <app-pokemon-card [pokemon]="pokemon" />
        }
      </div>
      <div class="pagination-bar">
        <ul>
          @for (page of pages; track $index) {
            <li>
              <a routerLink="#" routerLinkActive="active" 
                (click)="currentPage.set($index)">Page {{ $index + 1 }}</a>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    ul {
      list-style-type: none;
      width: 50%;
      display: flex;
      justify-content: space-between;
    }

    h2 {
      text-decoration: underline;
      font-style: italic;
      margin-bottom: 2rem;
    }

    div.container {
      padding: 1rem;
    }

    .active {
      color: green;
    }

    .card-layout {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
    }

    .card-layout  > * {
      flex-basis: 25%;
      flex-grow: 0;
      flex-shrink: 1;
      margin: 0 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  pages = [...Array(10).keys()];

  pokemonService = inject(PokemonService);
  currentPage = this.pokemonService.currentPage;
  pokemons = toSignal(
    toObservable(this.currentPage).pipe(switchMap(() => this.pokemonService.getPokemons())), 
    { initialValue: [] as DisplayPokemon[] }
  );
}
