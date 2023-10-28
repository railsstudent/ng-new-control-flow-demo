import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AffiliationPipe } from '../../pipes/affiliation.pipe';

@Component({
  selector: 'app-pokemon-affliation',
  standalone: true,
  imports: [TitleCasePipe, AffiliationPipe],
  template: `
    @switch (name) {
      @case ('pikachu') {
        <p class="team">{{ name | titlecase | affiliation:'Ash' }}</p>
      }
      @case ('meowth') {
        <p class="team">{{ name | titlecase | affiliation:'Rocket' }}</p>
      }
      @case ('staryu') {
        <p class="team">{{ name | titlecase | affiliation:'Misty' }}</p>
      } 
      @case ('steelix') {
        <p class="team">{{ name | titlecase | affiliation:'Brock' }}</p>
      }
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    p.team {
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonAffliationComponent {
  @Input({ required: true })
  name = '';
}
