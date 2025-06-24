import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header" *ngIf="title">
        <h1 class="page-title">
          <span class="page-icon" *ngIf="icon">{{ icon }}</span>
          {{ title }}
        </h1>
        <div class="page-actions">
          <ng-content select="[slot=actions]"></ng-content>
        </div>
      </div>
      <div class="page-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent {
  @Input() title?: string;
  @Input() icon?: string;
}
