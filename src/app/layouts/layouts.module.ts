import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    MaterialModule
  ],
  declarations: [
    BasicLayoutComponent,
    BlankLayoutComponent
  ],
  exports: [
    BasicLayoutComponent,
    BlankLayoutComponent
  ],
})
export class LayoutsModule { }
