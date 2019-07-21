import { ExpenseComponent } from './expense.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ExpenseComponent],
    imports: [
        CommonModule,
      RouterModule.forChild([
        {path: '', component: ExpenseComponent}
      ])
    ]
  })

  export class ExpenseModule {
  
  }