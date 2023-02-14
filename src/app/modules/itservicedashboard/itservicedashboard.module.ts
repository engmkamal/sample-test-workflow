import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItservicerequestdashboardComponent } from './itservicerequestdashboard/itservicerequestdashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ItservicerequestdashboardComponent],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule
  ]
})
export class ItservicedashboardModule { }


