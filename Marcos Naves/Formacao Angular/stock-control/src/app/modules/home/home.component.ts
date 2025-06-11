import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';

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
    private cookieService: CookieService
  ) {}

  onLoginSubmit() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.auth(this.loginForm.value).subscribe({
        next: (user) => {
          if (user) {
            this.cookieService.set('token', user.token);
            this.loginForm.reset();
          }
        },
        error: (error) => {
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
            alert('Usuário criado com sucesso');
            this.signupForm.reset();
            this.loginCard = true;
          }
        },
        error: (error) => {
          console.error(`Erro ao criar usuário: ${error.message}`);
        },
      });
    }
  }
}
