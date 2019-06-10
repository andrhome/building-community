// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgIconSpriteModule } from 'ng-svg-icon-sprite';

// Components
import { SideNavComponent } from './side-nav/side-nav.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    SvgIconSpriteModule
  ],
  exports: [
    SideNavComponent,
    SvgIconSpriteModule,
    MenuComponent
  ],
  declarations: [
    SideNavComponent,
    MenuComponent
  ]
})
export class SharedComponentModule { }
