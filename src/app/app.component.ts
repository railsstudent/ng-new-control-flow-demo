import { Component, TemplateRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, PokemonComponent],
  template: `
    <div>
      <h2>ngIf</h2>
      <div *ngIf="value < 10; else template2">
        <p>{{ value }} is less than 10.<p>
      </div>
      <h2>if-syntax</h2>
       <div>
        @if (value < 10) {
          <p>{{ value }} is less than 10.<p>
        } @else if (value < 15) {
          <p>{{ value }} is less than 15.<p>
        } @else if (value < 30) {
          <p>{{ value }} is less than 30.<p>
        } @else {
          <p>{{ value }} is greater than or equal to 30.</p>
        }
      </div>
      <button (click)="increment()">Click me</button>
      <app-pokemon />
    </div>
    <ng-template #template2>
      <ng-container *ngIf="value < 15 else template3">
        <p>{{ value }} is less than 15.<p>
      </ng-container>
    </ng-template>
    <ng-template #template3>
      <ng-container *ngIf="value < 30 else template4">
        <p>{{ value }} is less than 30.<p>
      </ng-container>
    </ng-template>
    <ng-template #template4>
      <p>{{ value }} is greater than or equal to 30.<p>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent {
  title = 'ng-new-control-flow-demo';
  value = 0;

  increment() {
    this.value = this.value + 1;

  }
}
