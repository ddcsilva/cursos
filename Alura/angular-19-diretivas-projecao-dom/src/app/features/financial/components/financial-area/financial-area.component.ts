import { Component } from '@angular/core';
import { BalanceComponent } from '../balance/balance.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { Transaction, TransactionType } from '../../models/transaction.model';
import { TransactionsComponent } from '../transactions/transactions.component';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-financial-area',
  imports: [BalanceComponent, TransactionsComponent, AccountsComponent],
  templateUrl: './financial-area.component.html',
  styleUrl: './financial-area.component.css',
})
export class FinancialAreaComponent {
  balance = 30;

  transactions: Transaction[] = [
    {
      id: '5',
      name: '',
      type: TransactionType.WITHDRAW,
      value: 200,
      date: new Date('2025-02-20T00:00'),
      account: 'Switch Bank',
    },
    {
      id: '4',
      name: 'Almoço',
      type: TransactionType.WITHDRAW,
      value: 40,
      date: new Date('2025-01-15T00:00'),
      account: 'Bytebank',
    },
    {
      id: '3',
      name: '',
      type: TransactionType.DEPOSIT,
      value: 400,
      date: new Date('2025-01-10T00:00'),
      account: 'Bytebank',
    },
    {
      id: '2',
      name: 'Freela (2ª parte)',
      type: TransactionType.DEPOSIT,
      value: 200,
      date: new Date('2024-10-01T00:00'),
      account: 'Anybank',
    },
    {
      id: '1',
      name: 'Freela (1ª parte)',
      type: TransactionType.DEPOSIT,
      value: 100,
      date: new Date('2024-10-01T00:00'),
      account: 'Anybank',
    },
  ];

  accounts: Account[] = [
    {
      name: 'Anybank',
      balance: 1000,
    },
    {
      name: 'Bytebank',
      balance: 0,
    },
    {
      name: 'Switch Bank',
      balance: 0,
    },
  ];
}
