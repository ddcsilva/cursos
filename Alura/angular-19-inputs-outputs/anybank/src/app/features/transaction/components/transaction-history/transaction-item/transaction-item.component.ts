import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-item',
  imports: [CurrencyPipe],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.css',
})
export class TransactionItemComponent {
  transaction = input<Transaction>();
}
