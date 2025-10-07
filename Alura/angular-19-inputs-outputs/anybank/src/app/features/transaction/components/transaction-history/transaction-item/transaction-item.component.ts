import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Transaction, TransactionType } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-item',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.css',
})
export class TransactionItemComponent {
  transaction = input.required<Transaction>();

  transactionValue = computed(() => {
    if (this.transaction()?.type === TransactionType.WITHDRAW) {
      return -this.transaction().value;
    }

    return this.transaction().value;
  });
}
