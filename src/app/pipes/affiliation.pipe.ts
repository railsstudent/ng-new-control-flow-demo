import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'affiliation',
  standalone: true
})
export class AffiliationPipe implements PipeTransform {

  transform(name: string, team: string): string {
    return `${name} is in Team ${team}.`;
  }
}
