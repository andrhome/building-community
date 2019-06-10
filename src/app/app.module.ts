// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LayoutsModule } from './layouts/layouts.module';
import { FacebookModule } from 'ngx-facebook';
import { ViewsModule } from './views/views.module';
import { SharedComponentModule } from './components/shared-component.module';

// Services
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { AccountService } from './services/account.service';
import { NotificationService } from './services/notification.service';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FacebookModule.forRoot(),
    LayoutsModule,
    ViewsModule,
    SharedComponentModule
  ],
  providers: [
    Ng4LoadingSpinnerService,
    ApiService,
    AuthService,
    AccountService,
    AuthGuard,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
