import { KeyValuePipe } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionType } from '../models/transaction.model';

@Component({
  selector: 'app-form',
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  transactionValue = '';
  typeTransaction = '';

  transactionCreated = output<Transaction>();

  transactionTypeEnum = TransactionType;

  onSubmit() {
    const transaction = new Transaction(this.typeTransaction as TransactionType, Number(this.transactionValue));

    this.transactionCreated.emit(transaction);

    this.transactionValue = '';
    this.typeTransaction = '';
  }
}
