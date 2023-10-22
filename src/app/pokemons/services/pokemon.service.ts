import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  httpService = inject(HttpClient);

  get(id: number) {
    this.httpService.get
  }
}
