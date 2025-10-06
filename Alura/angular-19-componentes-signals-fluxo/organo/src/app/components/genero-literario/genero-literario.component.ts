import { Component, input } from '@angular/core';
import { LivroComponent } from '../livro/livro.component';
import { GeneroLiterario } from '../livro/livro.interface';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-genero-literario',
  imports: [CommonModule, LivroComponent, NgClass],
  templateUrl: './genero-literario.component.html',
  styleUrl: './genero-literario.component.css',
})
export class GeneroLiterarioComponent {
  genero = input.required<GeneroLiterario>();
}
