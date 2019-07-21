import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path:'', loadChildren:'./home/home.module#HomeModule' },
      { path:'setting', loadChildren:'./settings/settings.module#SettingModule' },
      { path:'expense', loadChildren:'./expense/expense.module#ExpenseModule' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
