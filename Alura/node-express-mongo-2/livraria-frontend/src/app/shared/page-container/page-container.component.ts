import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss',
})
export class PageContainerComponent {
  @Input() title?: string;
  @Input() icon?: string;
}
