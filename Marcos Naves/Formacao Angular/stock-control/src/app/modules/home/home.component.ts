import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard: boolean = true;

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}

  onLoginSubmit() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.auth(this.loginForm.value).subscribe({
        next: (user) => {
          if (user) {
            this.cookieService.set('token', user.token);
            this.loginForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Login realizado com sucesso',
              detail: `Bem vindo de volta ${user.name}`,
              life: 2000,
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao fazer login',
            detail: 'Verifique suas credenciais',
            life: 2000,
          });
          console.error(`Erro ao fazer login: ${error.message}`);
        },
      });
    }
  }

  onSignupSubmit() {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signup(this.signupForm.value).subscribe({
        next: (user) => {
          if (user) {
            this.signupForm.reset();
            this.loginCard = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Usuário criado com sucesso',
              detail: 'Faça login para acessar o sistema',
              life: 2000,
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao criar usuário',
            detail: 'Verifique os dados informados',
            life: 2000,
          });
          console.error(`Erro ao criar usuário: ${error.message}`);
        },
      });
    }
  }
}
