import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Account } from '../../../models/account.model';

@Component({
  selector: 'app-account',
  imports: [CurrencyPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  account = input.required<Account>();
}
