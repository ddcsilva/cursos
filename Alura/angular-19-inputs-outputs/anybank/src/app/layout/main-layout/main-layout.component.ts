import { Component } from '@angular/core';
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
  onProcessTransaction(transaction: Transaction) {
    console.table(transaction);
  }
}
