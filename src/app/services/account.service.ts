import { EventEmitter, Injectable, Output } from '@angular/core';
import { ApiService } from './api.service';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { getValidImgPath } from './helper-functions';
// import { AdsAccountType, FbAccountType } from '../types/common.types';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class AccountService {
  @Output() accountDataUpdate: EventEmitter<any> = new EventEmitter();
  private localUserDataName = 'adhAccountData';
  public accountData;
  // public integratinsAccounts: Array<FbAccountType> = [];
  // public selectedIntegratinsAccounts: Array<FbAccountType> = [];
  // public selectedAdsAccounts: Array<AdsAccountType> = [];
  // public allAdsAccounts: Array<AdsAccountType> = [];

  constructor(private api: ApiService,
              public spinner: Ng4LoadingSpinnerService) {
    this.accountData = this.getLocalUserData();
    if (this.api.getLocalToken() && this.accountData) {
      // this.getSelectedIntegrationsAccounts(this.accountData.id).subscribe();
    }
  }

  // getIntegrationsAccounts(userId: number) {
  //   const queryParams = {
  //     'per-page': '100'
  //   };
  //
  //   return (this.integratinsAccounts.length)
  //     ? Observable.create(observer => {
  //       observer.next(this.integratinsAccounts);
  //     })
  //     : this.api.get(`/facebook-api/user/${userId}/integrations/accounts/tree`, queryParams, false)
  //       .map(res => {
  //         this.integratinsAccounts = res['entity'] ? res['entity']['facebookAccounts'] : [];
  //         if (this.integratinsAccounts.length) {
  //           this.allAdsAccounts = this.getAllAdsAccounts(this.integratinsAccounts, this.allAdsAccounts);
  //         }
  //         this.spinner.hide();
  //         return this.integratinsAccounts;
  //       });
  // }
  //
  // getSelectedIntegrationsAccounts(userId: number) {
  //   const queryParams = {
  //     'per-page': '100'
  //   };
  //
  //   return (this.selectedIntegratinsAccounts.length)
  //     ? Observable.create(observer => {
  //       observer.next(this.selectedIntegratinsAccounts);
  //     })
  //     : this.api.get(`/facebook/user/${userId}/ads-accounts/tree`, queryParams, false)
  //       .map(res => {
  //         this.selectedIntegratinsAccounts = res['entity'] ? res['entity']['facebookAccounts'] : [];
  //         if (this.selectedIntegratinsAccounts.length && this.selectedIntegratinsAccounts[0].facebookId) {
  //           this.selectedAdsAccounts = this.getAllAdsAccounts(this.selectedIntegratinsAccounts, this.selectedAdsAccounts);
  //         }
  //         return this.selectedIntegratinsAccounts;
  //       });
  // }
  //
  // getAllAdsAccounts(FbAccounts: Array<FbAccountType>, adsAccounts: Array<AdsAccountType>): Array<AdsAccountType> {
  //   let accounts = [];
  //   FbAccounts.forEach(item => {
  //     accounts = adsAccounts.concat(item.accounts);
  //   });
  //   return accounts;
  // }

  getAccountData() {
    const queryParams = {
      expand: ''
    };
    const url = '/users/me';

    return this.api.get(url, {}, false).map(res => {
      if (res.image) {
        res.image = this.setCorrectFilePath(res.image);
      }
      this.saveLocalUserData(res);

      return res;
    });
  }

  updateFbAccount(facebookId: string, data: Object) {
    const url = `/facebook/account/${facebookId}`;

    return this.api.patch(url, data);
  }

  updateUserData(data: any) {
    const url = `/users/${data.id}`;

    return this.api.patch(url, data).map(
      res => {
        if (res.image) {
          res.image = this.setCorrectFilePath(res.image);
        }
        return res;
      });
  }

  getLocalUserData() {

    return JSON.parse(localStorage.getItem(this.localUserDataName));
  }

  saveLocalUserData(accData) {
    this.accountData = accData;
    localStorage.setItem(this.localUserDataName, JSON.stringify(accData));
    this.accountDataUpdate.emit(this.accountData);
  }

  removeLocalUserData() {
    localStorage.removeItem(this.localUserDataName);
    this.accountData = null;
  }

  private setCorrectFilePath(img) {
    img.path = getValidImgPath(img.path);

    return img;
  }
}

@Injectable()
export class AccountRouteResolver implements Resolve<any> {
  constructor(public account: AccountService,
              public spinner: Ng4LoadingSpinnerService) {
  }

  resolve(): Observable<any> | Promise<any> | any {
    this.spinner.show();

    return this.account.getAccountData();

    // return new Promise((resolve, reject) => {
    //   this.account.getAccountData()
    //     .subscribe(res => {
    //       this.account.getIntegrationsAccounts(res.id)
    //         .subscribe(resolve, err => reject);
    //     }, err => reject);
    // });
  }
}
