import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { toPage } from '../utilities/page.utility';

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
  @Input({ required: true, transform: (id: string) => toPage(id, 1) })
  id!: number;

  pokemonService = inject(PokemonService);
  router = inject(Router);

  backToPage() {
    const page = this.pokemonService.getPage(this.id);
    this.pokemonService.currentPage.set(page - 1);
    this.router.navigate(['/list'], { queryParams: { page }});
  }
}
