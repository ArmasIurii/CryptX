import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authService = inject(AuthService)
  router = inject(Router)

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']); // Redirect to login if not authenticated
        }
      })
    );
  }
  
}
