import { Component, input } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Account } from '../../models/account.model';
import { CardComponent } from "../financial-area/card/card.component";

@Component({
  selector: 'app-accounts',
  imports: [ButtonComponent, AccountComponent, CardComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent {
  accounts = input.required<Account[]>();
}
