import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if(authService.isLoggedIn())
    {
      return true;
    }
    else
    {
      const router = inject(Router);
      return router.createUrlTree(['/']);
    }
};
