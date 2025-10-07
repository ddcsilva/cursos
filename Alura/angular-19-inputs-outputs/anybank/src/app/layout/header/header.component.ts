import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountComponent } from './account/account.component';

@Component({
  selector: 'app-header',
  imports: [WelcomeComponent, AccountComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
