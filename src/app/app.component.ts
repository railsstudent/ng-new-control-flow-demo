import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { setTitle } from './pokemons/utilities/title';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: [],
})
export class AppComponent {
  constructor() {
    setTitle();
  }
}
