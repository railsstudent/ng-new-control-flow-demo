import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AffiliationPipe } from './pipes/affiliation.pipe';
import { PokemonAffiliation } from './types/affiliation.type';

@Component({
  selector: 'app-pokemon-affliation',
  standalone: true,
  imports: [TitleCasePipe, AffiliationPipe],
  template: `
    @switch (affiliation.type) {
      @case ('pikachu') {
        <p class="team">{{ affiliation.type | titlecase | affiliation:affiliation.owner }}</p>
      } @case ('meowth') {
        <p class="team">{{ affiliation.type | titlecase | affiliation:affiliation.owner }}</p>
      } @case ('staryu') {
        <p class="team">{{ affiliation.type | titlecase | affiliation:affiliation.owner }}</p>
      } @case ('steelix') {
        <p class="team">{{ affiliation.type | titlecase | affiliation:affiliation.owner }}</p>
      } @case ('unknown') {
        <p class="team">{{ affiliation.warningMessage }}</p>
      }
       @default {
        <p class="team">This should not appear</p>
      }
    }
  `,
  styles: [`
    p.team {
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonAffliationComponent {
  @Input({ required: true })
  affiliation!: PokemonAffiliation;
}
