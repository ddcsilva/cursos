import { Component, input } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-accounts',
  imports: [ButtonComponent, AccountComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent {
  accounts = input.required<Account[]>();
}
