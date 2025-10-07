import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    this.transactionCreated.emit();

    this.transactionValue = '';
    this.typeTransaction = '';
  }
}
