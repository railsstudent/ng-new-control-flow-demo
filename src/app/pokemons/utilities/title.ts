import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

export function setTitle() {
    const titleService = inject(Title);
    titleService.setTitle('Pokemon Demo - New control flow')
}
