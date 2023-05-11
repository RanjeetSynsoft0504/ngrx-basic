import { CanActivateFn } from '@angular/router';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const token: any = localStorage.getItem('token');
  if (token) {
    return false;
  } else {
    return true;
  }
};
