import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [HomeComponent],
    imports: [
      CommonModule,
      RouterModule.forChild([
        {path: '', component: HomeComponent}
      ])
    ]
  })

  export class HomeModule {
  
  }