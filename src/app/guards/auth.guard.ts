import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // se não estiver logado, manda para o login e guarda o retorno
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
