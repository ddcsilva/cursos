import { Component, computed, input } from '@angular/core';
import { BalanceCard } from './components/balance-card/balance-card';
import { Transaction } from '../../../../shared/transaction/interfaces/transaction';
import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
})
export class Balance {
  transactions = input.required<Transaction[]>();

  totalIncome = computed(() => {
    return this.transactions()
      .filter((item) => item.type === TransactionType.INCOME)
      .reduce((total, item) => total + item.value, 0);
  });

  totalOutcome = computed(() => {
    return this.transactions()
      .filter((item) => item.type === TransactionType.OUTCOME)
      .reduce((total, item) => total + item.value, 0);
  });

  balance = computed(() => {
    return this.totalIncome() - this.totalOutcome();
  });
}
