import { Component, computed, signal } from '@angular/core';
import { FormComponent } from '../../features/transaction/form/form.component';
import { Transaction } from '../../features/transaction/models/transaction.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, FormComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  transactions = signal<Transaction[]>([]);

  balance = computed(() => {
    return this.transactions().reduce((acc, transaction) => {
      return acc + transaction.value;
    }, 0);
  });

  onProcessTransaction(transaction: Transaction) {
    this.transactions.update(current => [transaction, ...current]);
    console.table(this.transactions());
  }
}
