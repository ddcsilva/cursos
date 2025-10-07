import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionType } from '../models/transaction.model';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  transactionValue = '';
  typeTransaction = '';

  transactionCreated = output();

  onSubmit() {
    const transaction = new Transaction(this.typeTransaction as TransactionType, Number(this.transactionValue));

    this.transactionCreated.emit();

    this.transactionValue = '';
    this.typeTransaction = '';
  }
}
