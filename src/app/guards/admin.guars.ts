import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser(); 

  if (user && user.isAdmin) {
    return true;
  }

  // se não for admin, redireciona
  router.navigate(['/access-denied']);
  return false;
};
