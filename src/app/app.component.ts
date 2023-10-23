import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

function setTitle() {
  const titleService = inject(Title);
  titleService.setTitle('Pokemon Demo - New control flow')
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent {
  title = 'ng-new-control-flow-demo';

  constructor() {
    setTitle();
  }
}
