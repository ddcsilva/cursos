import { Component, input } from '@angular/core';
import { TransactionComponent } from './transaction/transaction.component';
import { Transaction } from '../../models/transaction.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from "../financial-area/card/card.component";

@Component({
  selector: 'app-transactions',
  imports: [TransactionComponent, ButtonComponent, CardComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  transactions = input.required<Transaction[]>();
}
