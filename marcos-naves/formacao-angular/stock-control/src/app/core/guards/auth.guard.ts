import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../../features/auth/services/user/user.service';

/**
 * Guard funcional para proteger rotas que requerem autenticação
 * Usa a nova API de functional guards do Angular 15+
 */
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isAuthenticated = userService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  }

  console.log('❌ AuthGuard: Access denied, redirecting to login');
  // Redireciona para login e salva a URL que o usuário tentou acessar
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });

  return false;
};

/**
 * Guard funcional para rotas que só devem ser acessadas por usuários NÃO autenticados
 * (ex: página de login, registro)
 */
export const noAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isAuthenticated = userService.isAuthenticated();

  if (!isAuthenticated) {
    return true;
  }

  // Usuário já está logado, redireciona para dashboard
  router.navigate(['/dashboard']);
  return false;
};
