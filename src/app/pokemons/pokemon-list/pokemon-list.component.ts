import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonPaginationComponent } from '../pokemon-pagination/pokemon-pagination.component';
import { PokemonService } from '../services/pokemon.service';
import { toPage } from '../utilities/page';

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
        } @loading (after 100ms; minimum 200ms) {
          <p>Loading....</p>
        } @placeholder (minimum 100ms) {
          <p>No Pokemon Data</p>
        } @error {
          <p>Failed to load dependencies</p>
        }
      </div>
      <app-pokemon-pagination /> 
    </div>
  `,
  styles: [`
    :host {
      display: block;
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

  pokemonService = inject(PokemonService);
  currentPage = this.pokemonService.currentPage;
  pokemons = toSignal(
    toObservable(this.currentPage).pipe(switchMap(() => this.pokemonService.getPokemons())), 
    { initialValue: [] as DisplayPokemon[] }
  );
}
