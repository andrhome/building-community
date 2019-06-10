import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) {
  }

  canActivate() {
    const isTokenExist = !!this.auth.getToken();

    if (isTokenExist) {
      return true;
    }

    this.auth.router.navigate(['sign-in']);
    return false;
  }

}
