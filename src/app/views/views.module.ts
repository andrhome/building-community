// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedComponentModule } from '../components/shared-component.module';
import { SvgIconSpriteModule } from 'ng-svg-icon-sprite';

// Components
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedComponentModule,
    SvgIconSpriteModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    DashboardComponent
  ]
})
export class ViewsModule { }
