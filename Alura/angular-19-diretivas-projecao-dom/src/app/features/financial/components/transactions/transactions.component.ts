import { Component, input } from '@angular/core';
import { TransactionComponent } from './transaction/transaction.component';
import { Transaction } from '../../models/transaction.model';
import { ButtonComponent } from '../../../../shared/Components/button/button.component';

@Component({
  selector: 'app-transactions',
  imports: [TransactionComponent, ButtonComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  transactions = input.required<Transaction[]>();
}
