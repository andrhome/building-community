import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
// import { AccountRouteResolver } from './services/account.service';

import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
// import { BasicLayoutComponent } from './layouts/basic/basic.component';
// import { SignInComponent } from './views/sign-in/sign-in.component';
// import { SignUpComponent } from './views/sign-up/sign-up.component';
// import { RulesComponent } from './views/rules/rules.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      // {
      //   path: 'reset-password',
      //   component: ResetPasswordComponent
      // },
      // {
      //   path: 'confirmation-reset-password/:id',
      //   component: ConfirmationResetPasswordComponent
      // }
    ]
  },
  {
    path: '',
    component: BasicLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'account',
      //   component: AccountComponent
      // },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      // {
      //   path: 'rules/:id',
      //   component: RuleComponent
      // },
      // {
      //   path: 'integration',
      //   component: IntegrationPageComponent
      // },
      // {
      //   path: 'alerts',
      //   component: AlertsComponent
      // },
      // {
      //   path: 'alerts/:id',
      //   component: AlertComponent
      // },
      // {
      //   path: 'rule-library',
      //   component: RuleLibraryComponent
      // },
      // {
      //   path: 'rule-library/:id',
      //   data: {isDraft: true},
      //   component: RuleComponent
      // },
      // {
      //   path: 'team-management',
      //   component: TeamManagementComponent
      // },
    ],
    // resolve: {
    //   account: AccountRouteResolver
    // }
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
