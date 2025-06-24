import { Component } from '@angular/core';
import { AppLayoutComponent } from './shared/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppLayoutComponent],
  template: '<app-layout></app-layout>',
  styles: [],
})
export class AppComponent {}
