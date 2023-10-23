import { ChangeDetectionStrategy, Component, Input, inject, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <p>Pokemon component</p>
      <div class="content">
        id: {{id}}
      </div>
      <div class="button-bar">
        <button (click)="backToPage()">Go back</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .container {
      padding: 1rem;
    }

    .button-bar {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    button {
      padding: 0.25rem;
      border-radius: 4px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent {
  @Input({ required: true, transform: (x: string) => parseInt(x, 10) })
  id!: number;

  pokemonService = inject(PokemonService);
  router = inject(Router);

  backToPage() {
    const page = Math.ceil(this.id / this.pokemonService.getPageSize());
    this.pokemonService.currentPage.set(page - 1);
    this.router.navigate(['/list'], { queryParams: { page }});
  }
}
