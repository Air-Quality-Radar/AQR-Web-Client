import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { SharedModule } from './shared/shared.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [AboutModule, ChartsModule, BrowserModule, HttpModule, AppRoutingModule, HomeModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }

