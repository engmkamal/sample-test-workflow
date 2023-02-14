import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmdashboardComponent } from './cmdashboard/cmdashboard.component';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CmdashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([]),
  ]
})
export class ChangemanagementModule { }



