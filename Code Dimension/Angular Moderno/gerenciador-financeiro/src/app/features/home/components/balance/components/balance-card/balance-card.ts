import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CardType = 'income' | 'outcome' | 'balance';
type ValueCssClass = 'positive' | 'negative' | 'neutral';

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<ValueCssClass>(() => {
    if (this.type() === 'income') {
      return 'positive';
    }

    if (this.type() === 'outcome') {
      return 'negative';
    }

    if (this.value() === 0) {
      return 'neutral';
    }

    return this.value() > 0 ? 'positive' : 'negative';
  });
}
