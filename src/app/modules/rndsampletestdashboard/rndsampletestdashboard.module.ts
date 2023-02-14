import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { SampletestdashboardComponent } from './sampletestdashboard/sampletestdashboard.component';
import { TestparamrendererComponent } from './testparamrenderer/testparamrenderer.component';

@NgModule({
  declarations: [SampletestdashboardComponent, TestparamrendererComponent],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    AgGridModule.withComponents([TestparamrendererComponent]),
  ]
})
export class RndsampletestdashboardModule { }
