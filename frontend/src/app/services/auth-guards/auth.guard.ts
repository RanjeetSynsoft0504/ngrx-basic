
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token: any = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
};
