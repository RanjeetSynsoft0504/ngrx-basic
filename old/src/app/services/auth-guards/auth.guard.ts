
// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const token: any = localStorage.getItem('token');
//   if (token) {
//     return true;
//   } else {
//     return false;
//   }
// };

import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from './../alert.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const isLoggedIn = localStorage.getItem('token');
  const alertService = new AlertService();

  if (!isLoggedIn) {
    // User is not logged in, allow the navigation
    return false;
  } else {
    const currentPage = alertService.getCurrentPage();
    if (currentPage) {
      console.log(currentPage)
      // User is logged in, navigate back to the previous page
      // alertService.clearCurrentPage();
      return true; // Return false to prevent navigation
    } else {
      // No previous page stored, allow the navigation
      return true;
    }
  }
};
