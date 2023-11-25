import { ChangeDetectionStrategy, Component, Input, inject, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonPaginationComponent } from '../pokemon-pagination/pokemon-pagination.component';
import { PokemonListService } from '../services/pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, PokemonPaginationComponent],
  template: `
    <div class="container">
      <h2>Pokemon List</h2>
      <div class="card-layout">
        @defer {
          @for (pokemon of pokemons(); track pokemon.id) {
            <app-pokemon-card [pokemon]="pokemon" />
          }
        } @loading (minimum 500ms) {
          <p>Loading....</p>
        } @placeholder (minimum 300ms) {
          <p>Placeholder of Pokemon List</p>
        } @error {
          <p>Failed to load dependencies</p>
        }
      </div>
      <app-pokemon-pagination /> 
    </div>
  `,
  styles: [`
    h2 {
      text-decoration: underline;
      font-style: italic;
      margin-bottom: 2rem;
    }

    div.container {
      padding: 0.75rem;
      margin-bottom: 2rem;
    }

    .card-layout {
      display: flex;
      flex-wrap: wrap;
    }

    .card-layout > * {
      --num-cards: 7;
      flex-basis: calc((100% - 2 * 0.75rem) / var(--num-cards));
      flex-shrink: 1;
      flex-grow: 0;
    }    

    @media (max-width: 1440px) {
      .card-layout > * {
        --num-cards: 6;
      }
    }

    @media (max-width: 1200px) {
      .card-layout > * {
        --num-cards: 5;
      }
    }

    @media (max-width: 992px) {
      .card-layout > * {
        --num-cards: 4;
      }
    }

    @media (max-width: 768px) {
      .card-layout > * {
        --num-cards: 3;
      }
    }

    @media (max-width: 576px) {
      .card-layout > * {
        --num-cards: 2;
      }
    }

    @media (max-width: 360px) {
      .card-layout > * {
        --num-cards: 1;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  page = 1;

  @Input({ transform: (value: string) => numberAttribute(value, 1), alias: 'page' })
  set _page(value: number) {
    this.page = value;
    this.currentPage.set(this.page - 1);
  } 

  pokemonLisService = inject(PokemonListService);
  currentPage = this.pokemonLisService.currentPage;
  pokemons = toSignal(
    toObservable(this.currentPage).pipe(switchMap(() => this.pokemonLisService.getPokemons())), 
    { initialValue: [] as DisplayPokemon[] }
  );
}
