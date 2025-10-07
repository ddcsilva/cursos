import { KeyValuePipe } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionType } from '../../models/transaction.model';

@Component({
  selector: 'app-form',
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  transactionValue = '';
  transactionType: TransactionType | '' = '';

  transactionCreated = output<Transaction>();

  transactionTypeEnum = TransactionType;

  onSubmit() {
    if (!this.transactionType || !this.transactionValue || Number(this.transactionValue) <= 0) {
      return;
    }

    const transaction = new Transaction(this.transactionType as TransactionType, Number(this.transactionValue));

    this.transactionCreated.emit(transaction);

    this.transactionValue = '';
    this.transactionType = '';
  }
}
