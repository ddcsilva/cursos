import { Component } from '@angular/core';
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

  onSubmit() {
    console.log(this.transactionValue);
    console.log(this.typeTransaction);
  }
}
