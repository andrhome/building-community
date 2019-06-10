import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
// import { AccountService } from '../../services/account.service';

@Component({
  selector: 'bc-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  userData: any;
  isSidenavOpened = true;
  isUserMenuOpened = false;
  isHelpMenuOpened = false;
  navigationLinks = [
    // {
    //   title: 'Reports',
    //   link: '/account',
    //   iconClass: 'fa-th-list'
    // },
    {
      title: 'Rules',
      link: '/rules',
      iconClass: 'fa-list-alt',
      isDefault: true
    },
    {
      title: 'Rule Library',
      link: '/rule-library',
      iconClass: 'fa-book'
    },
    // {
    //   title: '20% LLA Market',
    //   link: '/lla-market',
    //   iconClass: 'fa-users'
    // },
    // {
    //   title: 'ROAS Calculator',
    //   link: '/roas-calculator',
    //   iconClass: 'fa-calculator'
    // },
    // {
    //   title: 'Learning center',
    //   link: '/learning-center',
    //   iconClass: 'fa-graduation-cap'
    // },
    // {
    //   title: 'Settings',
    //   link: '/settings',
    //   iconClass: 'fa-cogs'
    // }
  ];
  userMenuItems: Array<any> = [
    {
      name: 'Profile',
      link: '/account',
      icon: 'fa-user-o'
    },
    {
      name: 'Ad Accounts',
      link: '/integration',
      icon: 'fa-user-o'
    },
    // {
    //   name: 'Team Management',
    //   link: '/team-management',
    //   icon: 'fa-user-o'
    // },
    // {
    //   name: 'Billing',
    //   link: '/',
    //   icon: 'fa-user-o'
    // },
    {
      name: 'Sign Out',
      link: '/sign-in',
      icon: 'fa-sign-out'
    }
  ];
  helpMenuItems: Array<any> = [
    {
      name: 'Profile',
      link: '/account',
      icon: 'fa-user-o'
    },
    {
      name: 'Ad Accounts',
      link: '/integration',
      icon: 'fa-user-o'
    },
    // {
    //   name: 'Team Management',
    //   link: '/',
    //   icon: 'fa-user-o'
    // },
    // {
    //   name: 'Billing',
    //   link: '/',
    //   icon: 'fa-user-o'
    // },
    {
      name: 'Sign Out',
      link: '/sign-in',
      icon: 'fa-sign-out'
    }
  ];
  userMenuConfig: any = {
    width: '230px',
    top: '125%',
    left: '-30px'
  };
  userMenuTrConfig: any = {
    top: '-10px',
    left: '68px'
  };
  helpMenuConfig: any = {
    width: '270px',
    bottom: '-40px',
    right: '-155%'
  };
  helpMenuTrConfig: any = {
    bottom: '65px',
    left: '-19px',
    rotateDeg: '-90deg'
  };

  mobileQuery;
  tabletQuery;
  _mobileQueryListener: () => void;
  _tabletQueryListener: () => void;

  constructor(public auth: AuthService,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.tabletQuery = media.matchMedia('(min-width: 1025px)');
    this.isSidenavOpened = this.tabletQuery.matches;

    this._mobileQueryListener = () => {
      this.isSidenavOpened = this.mobileQuery.matches;
      changeDetectorRef.detectChanges();
    };

    this._tabletQueryListener = () => {
      this.isSidenavOpened = this.tabletQuery.matches;
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.tabletQuery.addListener(this._tabletQueryListener);
  }

  ngOnInit() {
    // this.userData = this.account.accountData;
    // this.account.accountDataUpdate.subscribe(() => {
    //   this.userData = this.account.accountData;
    // });
  }

  toggleSideNav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  hideSideNav() {
    if (this.mobileQuery.matches) {
      this.isSidenavOpened = false;
    }
    this.isUserMenuOpened = false;
    this.isHelpMenuOpened = false;
  }

  showUserMenu() {
    this.isUserMenuOpened = true;
  }

  hideUserMenu() {
    this.isUserMenuOpened = false;
  }

  showHelpMenu() {
    this.isHelpMenuOpened = true;
  }

  hideHelpMenu() {
    this.isHelpMenuOpened = false;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.tabletQuery.removeListener(this._tabletQueryListener);
  }
}
