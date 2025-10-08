import { Component } from '@angular/core';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PresentationComponent } from './layout/presentation/presentation.component';
import { FinancialAreaComponent } from './features/financial/components/financial-area/financial-area.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, PresentationComponent, FinancialAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
