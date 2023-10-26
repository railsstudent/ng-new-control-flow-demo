import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { switchMap } from 'rxjs';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonService } from '../services/pokemon.service';
import { toPage } from '../utilities/page';

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
          @for (page of pages; track page) {
            <li>
              <a [routerLink]="['../list']" [queryParams]="{ page: page + 1 }" (click)="currentPage.set(page)" 
                routerLinkActive="active">Page {{ page + 1 }}</a>
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
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
    }

    ul li {
      margin-right: 0.5rem;
    }

    h2 {
      text-decoration: underline;
      font-style: italic;
      margin-bottom: 2rem;
    }

    div.container {
      padding: 0.75rem;
      margin-bottom: 2rem;
    }

    .pagination-bar {
      margin: 1rem 0;
    }

    .active {
      color: green;
    }

    .card-layout {
      display: flex;
      flex-wrap: wrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  pageValue = 1;

  @Input({ transform: (value: string) => toPage(value, 1) })
  set page(value: number) {
    this.pageValue = value;
    this.currentPage.set(this.pageValue - 1);
  } 

  pages = [...Array(10).keys()];

  pokemonService = inject(PokemonService);
  currentPage = this.pokemonService.currentPage;
  pokemons = toSignal(
    toObservable(this.currentPage).pipe(switchMap(() => this.pokemonService.getPokemons())), 
    { initialValue: [] as DisplayPokemon[] }
  );
}
