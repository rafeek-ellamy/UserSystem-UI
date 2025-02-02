import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserSessionService } from '../../@core/data-services/auth/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userSessionService = inject(UserSessionService);
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.userSessionService.isLoggedIn()) {
      const decodedToken = this.userSessionService.decodedToken();  // Decode the token to access the claims
      const requiredRole = next.data['role']; 
      
      if (
        decodedToken &&
        decodedToken.roles &&
        decodedToken?.roles && requiredRole.split(',').some((role: string) => decodedToken.roles.includes(role))
      ) {
        return of(true); // Role matches, allow access
      } else {
        // If the role doesn't match, redirect to an unauthorized page or home page
        this.router.navigate(['/unauthorized']);
        return of(false);
      }

      return of(true);

    } else {
      // If no user is found, redirect to the login page
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return of(false); // Deny access to the route
    }
  }
}
