import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LeftModule } from '../left/left.module';
import { RightModule } from '../right/right.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, LeftModule, RightModule, SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule { }
