import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './components/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
