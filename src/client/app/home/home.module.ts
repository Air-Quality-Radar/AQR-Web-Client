import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { AlertModule } from 'ng2-bootstrap/alert';
import { LeftModule } from '../left/left.module';
import { RightModule } from '../right/right.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, LeftModule, RightModule, SharedModule, AlertModule.forRoot()],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [NameListService]
})

export class HomeModule { }
