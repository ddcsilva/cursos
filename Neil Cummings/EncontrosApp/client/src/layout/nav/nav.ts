import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected credenciais: any = {};

  login() {
    console.log(this.credenciais);
  }
}
