import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  public options: any = {};

  constructor(private http: HttpClient,
              public spinner: Ng4LoadingSpinnerService,
              private notification: NotificationService,
              private router: Router) {
  }

  getOptions(queryParams?) {
    const token = this.getLocalToken();
    this.options.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      this.options.headers = this.options.headers.set('Authorization', `Bearer ${token}`);
    }
    if (queryParams) {
      return {
        ...this.options,
        params: queryParams
      };
    }

    return this.options;
  }

  public getGuestToken(): Observable<any> {
    this.showSpinner();
    const url = `${environment.oauthUrl}/token`;
    const guestTokenParams = {
      grant_type: 'client_credentials',
      client_id: environment.oauthClientId,
      client_secret: environment.oauthClientSecret,
    };

    return this.http.post<TokenType | any>(url, guestTokenParams, this.getOptions())
      .map(res => res)
      .catch(err => this.errorHandler(err))
      .finally(() => this.spinner.hide());
  }

  public getAuthToken(email: string, password: string): Observable<any> {
    this.showSpinner();
    const url = `${environment.oauthUrl}/token`;
    const authTokenParams = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: environment.oauthClientId,
      client_secret: environment.oauthClientSecret,
    };

    return this.http.post<TokenType | any>(url, authTokenParams, this.getOptions())
      .map(res => res)
      .catch(err => this.errorHandler(err))
      .finally(() => this.spinner.hide());
  }

  public getFBToken(token: string = ''): Observable<any> {
    this.showSpinner();
    const url = `${environment.oauthUrl}/token`;
    const authTokenParams = {
      grant_type: 'http://adhance.com/oauth/social',
      network: 'facebook',
      token: token,
      client_id: environment.oauthClientId,
      client_secret: environment.oauthClientSecret,
    };

    return this.http.post<TokenType | any>(url, authTokenParams, this.getOptions())
      .map(res => res)
      .catch(err => this.errorHandler(err))
      .finally(() => this.spinner.hide());
  }

  public get(url: string,
             queryParams?: any,
             withSpinner = true,
             handleError = true): Observable<any> {
    if (withSpinner) this.showSpinner();
    const fullUrl = `${environment.baseUrl}${url}`;

    return this.http.get(fullUrl, this.getOptions(queryParams))
      .map(res => res)
      .catch(err => handleError ? this.errorHandler(err) : Observable.throw(err))
      .finally(() => this.spinner.hide());
  }

  public post(url: string, body: any = {}): Observable<any> {
    this.showSpinner();
    const fullUrl = `${environment.baseUrl}${url}`;
    if (body.hasOwnProperty('id')) delete body.id;

    return this.http.post(fullUrl, body, this.getOptions())
      .map(res => res)
      .catch(err => this.errorHandler(err))
      .finally(() => this.spinner.hide());
  }

  public patch(url: string, body: any = {}): Observable<any> {
    this.showSpinner();
    const fullUrl = `${environment.baseUrl}${url}`;
    if (body.hasOwnProperty('id')) delete body.id;

    return this.http.patch(fullUrl, body, this.getOptions())
      .map(res => res)
      .catch(err => this.errorHandler(err))
      .finally(() => this.spinner.hide());
  }

  public remove(url: string): Observable<any> {
    this.showSpinner();
    const fullUrl = `${environment.baseUrl}${url}`;

    return this.http.delete(fullUrl, this.getOptions())
      .map(res => res)
      .catch(err => this.errorHandler(err))
      .finally(() => this.spinner.hide());
  }

  getLocalToken() {

    return localStorage.getItem('adhAuthToken') || '';
  }

  showSpinner() {
    setTimeout(() => this.spinner.show(), 0);
  }

  errorHandler(err) {
    switch (true) {
      case err.status === 401: {
        this.notification.error(err.error.error_description);
        this.router.navigate(['sign-in']);
        break;
      }
      case !!(err.error && err.error.error_description): {
        if (typeof err.error.error_description === 'object') {
          this.showFieldErrors(err.error.error_description);
        } else {
          this.notification.error(err.error.error_description);
        }
        break;
      }
      case !!(err.error && err.error.message): {
        this.notification.error(err.error.message);
        break;
      }
      case !!(err.error && err.error.fields): {
        const fields = err.error.fields;
        this.showFieldErrors(fields);
        break;
      }
      case !!(err.error && err.error.errors): {
        const errors = err.error.errors;
        let delay = 0;
        errors.forEach(errItem => {
          setTimeout(() => {
            this.notification.error(errItem.description);
          }, delay);
          delay += 2000;
        });
        break;
      }
      default:
        this.notification.error('Something went wrong.');
    }

    return Observable.throw(err);
  }

  showFieldErrors(fields) {
    let delay = 0;
    Object.keys(fields).forEach(key => {
      const upperCaseName = key[0].toUpperCase() + key.slice(1);
      if (fields[key].errors) {
        setTimeout(() => {
          this.notification.error(`${upperCaseName}: ${fields[key].errors[0].description}`);
        }, delay);
        delay += 2000;
      } else if (fields[key].description) {
        setTimeout(() => {
          this.notification.error(`${upperCaseName}: ${fields[key].description}`);
        }, delay);
        delay += 2000;
      }
    });
  }

  changePassword(id, data) {
    this.spinner.show();
    const url = `/users/${id}/password-change`;
    const fullUrl = `${environment.baseUrl}${url}`;

    return this.http.put(fullUrl, data, this.getOptions())
      .map(res => res)
      .catch(err => this.errorHandler(err))
      .finally(() => this.spinner.hide());
  }
}

export interface TokenType {
  access_token: '';
  expires_in: null;
  token_type: '';
  scope: null;
  refresh_token: '';
}
