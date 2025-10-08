import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { HighlightNumericValueDirective } from '../../../../shared/directives/highlight-numeric-value.directive';

@Component({
  selector: 'app-balance',
  imports: [CurrencyPipe, HighlightNumericValueDirective],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
})
export class BalanceComponent {
  balance = input.required<number>();
}
