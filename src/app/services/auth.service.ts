import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { AccountService } from './account.service';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

@Injectable()
export class AuthService {
  private tokenName: string = 'adhAuthToken';
  private fbAuthScopePermissions: string = 'public_profile,email';
  private fbAdsScopePermissions: string = 'public_profile,email,ads_management,ads_read,business_management';

  constructor(private api: ApiService,
              private notification: NotificationService,
              public router: Router,
              private account: AccountService,
              private fb: FacebookService) {
    const fbInitParams: InitParams = {
      appId: '181276282582810',
      xfbml: true,
      status: true,
      version: 'v2.12'
    };

    fb.init(fbInitParams);
  }

  signUp(data) {

    return this.api.getGuestToken().map(res => {
      this.saveToken(res.access_token);

      return this.api.post('/users', data).subscribe(() => {
        this.removeToken();
        this.notification.success('Account successfully created.');
        this.router.navigate(['sign-in']);
      }, () => this.removeToken());
    });
  }

  signIn(data) {

    return this.api.getAuthToken(data.email, data.password).map(
      res => {
        this.saveToken(res.access_token);
        this.router.navigate(['dashboard'], { replaceUrl: true });
      });
  }

  FBsignUp(token: string) {
    this.api.getFBToken(token).subscribe(res => {
      this.saveToken(res.access_token);
      this.router.navigate(['dashboard'], { replaceUrl: true });
    }, err => console.log(err));
  }

  FBsignIn() {
    this.fb.login({ scope: this.fbAuthScopePermissions })
      .then((loginRes: LoginResponse) => {
        if (loginRes.authResponse) {
          this.FBsignUp(loginRes.authResponse.accessToken);
        }
      }).catch((error: any) => {
      console.error(error);
    });
  }

  FBconnectAd() {
    this.fb.login({ scope: this.fbAdsScopePermissions })
      .then((loginRes: LoginResponse) => {
        if (loginRes.authResponse) {
          this.getLongLivedToken(loginRes.authResponse.accessToken);
        }
      }).catch((error: any) => {
      console.error(error);
    });
  }

  getLongLivedToken(shortLivedToken: string = '') {
    const url = `/facebook/long-lived-token/${shortLivedToken}`;
    return this.api.get(url).subscribe(res => {
      console.log('long-lived-token', res);
      return res;
    });
  }

  signOut() {
    this.removeToken();
    this.account.removeLocalUserData();
  }

  resetPassword(email: string) {
    const url = `/users/${email}/password-reset-token`;

    return this.api.getGuestToken().map(tokenRes => {
      this.saveToken(tokenRes.access_token);

      return this.api.post(url)
        .subscribe(res => {
          this.removeToken();
          this.notification.success('Reset password link has been sent to your email');
          return res;
        }, () => this.removeToken());
    });

  }

  confirmationResetPassword(confirmationToken: string, plainPassword: string) {
    const url = `/users${confirmationToken}/password`;

    return this.api.getGuestToken().map(tokenRes => {
      this.saveToken(tokenRes.access_token);

      return this.api.patch(url, { plainPassword: plainPassword })
        .subscribe(() => {
          this.removeToken();
          this.router.navigate(['sign-in']);
          this.notification.success('Password changed successfully.');
        }, () => this.removeToken());
    });
  }

  saveToken(token) {
    localStorage.setItem(this.tokenName, token);
  }

  getToken() {

    return localStorage.getItem(this.tokenName);
  }

  removeToken() {
    localStorage.removeItem(this.tokenName);
  }

  clearAuthData() {
    this.removeToken();
    this.account.removeLocalUserData();
  }
}
