import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Transaction, TransactionType } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  transaction = input.required<Transaction>();

  value = computed(() => {
    if (this.transaction().type === TransactionType.WITHDRAW) {
      return -this.transaction().value;
    }

    return this.transaction().value;
  });
}
