import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-pagination',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
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
  `,
  styles: [`
  ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }

  ul li {
    margin-right: 0.5rem;
  }

  .pagination-bar {
    margin: 1rem 0;
  }

  .active {
    color: green;
  }
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPaginationComponent {
  pages = [...Array(10).keys()];
  currentPage = inject(PokemonService).currentPage;
}
