import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AutenticacaoService } from '../../core/services/autenticacao-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private autenticacaoService = inject(AutenticacaoService);

  protected credenciais: any = {};

  login() {
    this.autenticacaoService.login(this.credenciais).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }
}
