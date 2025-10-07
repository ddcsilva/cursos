import { Component } from '@angular/core';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';

@Component({
  selector: 'app-transaction-history',
  imports: [TransactionItemComponent],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent {}
