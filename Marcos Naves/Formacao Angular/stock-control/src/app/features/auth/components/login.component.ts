import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginCard: boolean = true;
  isLoading: boolean = false;
  returnUrl: string = '/dashboard';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Captura a URL de retorno dos query params
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onLoginSubmit() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.isLoading = true;
      this.userService.auth(this.loginForm.value).subscribe({
        next: (user) => {
          if (user) {
            this.cookieService.set('token', user.token);
            this.loginForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Login realizado com sucesso',
              detail: `Bem vindo de volta ${user.name}`,
              life: 3000,
            });

            // Redireciona para a URL de retorno ou dashboard
            this.router.navigate([this.returnUrl]);
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao fazer login',
            detail: 'Verifique suas credenciais',
            life: 4000,
          });
          console.error(`Erro ao fazer login: ${error.message}`);
          this.isLoading = false;
        },
      });
    }
  }

  onSignupSubmit() {
    if (this.signupForm.value && this.signupForm.valid) {
      this.isLoading = true;
      this.userService.signup(this.signupForm.value).subscribe({
        next: (user) => {
          if (user) {
            this.signupForm.reset();
            this.loginCard = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Usuário criado com sucesso',
              detail: 'Faça login para acessar o sistema',
              life: 3000,
            });
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao criar usuário',
            detail: 'Verifique os dados informados',
            life: 4000,
          });
          console.error(`Erro ao criar usuário: ${error.message}`);
          this.isLoading = false;
        },
      });
    }
  }

  // Métodos auxiliares para validação
  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} é obrigatório`;
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength'])
        return `${fieldName} deve ter pelo menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field?.errors && field.touched);
  }
}
