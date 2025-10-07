import { Component, input } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-header',
  imports: [WelcomeComponent, AccountComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  balance = input.required<number>();
}
