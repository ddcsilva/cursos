import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [CurrencyPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {}
