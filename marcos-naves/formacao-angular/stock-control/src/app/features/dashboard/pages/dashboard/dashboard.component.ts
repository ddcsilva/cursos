import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../auth/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  logout(): void {
    this.userService.logout();
    this.messageService.add({
      severity: 'info',
      summary: 'Logout realizado',
      detail: 'Você foi desconectado com sucesso',
      life: 2000,
    });
    this.router.navigate(['/login']);
  }
}
