import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
      RouterModule.forChild([
        {path: '', component: SettingsComponent}
      ])
    ]
  })

  export class SettingModule {
  
  }