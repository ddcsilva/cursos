import { Component, computed, signal } from '@angular/core';
import { FormComponent } from '../../features/transaction/components/form/form.component';
import { TransactionHistoryComponent } from '../../features/transaction/components/transaction-history/transaction-history.component';
import { Transaction, TransactionType } from '../../features/transaction/models/transaction.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, FormComponent, TransactionHistoryComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  transactions = signal<Transaction[]>([]);

  balance = computed(() => {
    return this.transactions().reduce((acc, transaction) => {
      switch (transaction.type) {
        case TransactionType.DEPOSIT:
          return acc + transaction.value;
        case TransactionType.WITHDRAW:
          return acc - transaction.value;
        default:
          throw new Error('Tipo de transação inválido');
      }
    }, 0);
  });

  onProcessTransaction(transaction: Transaction) {
    if (transaction.type === TransactionType.WITHDRAW && transaction.value > this.balance()) {
      alert('Não é possível sacar um valor maior que o saldo');
      return;
    }

    this.transactions.update(current => [transaction, ...current]);
  }
}
