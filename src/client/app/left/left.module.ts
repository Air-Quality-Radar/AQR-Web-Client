import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SearchComponent],
  exports: [SearchComponent, CommonModule, RouterModule]
})
export class LeftModule { }

