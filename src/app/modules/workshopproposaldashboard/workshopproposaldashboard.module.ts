import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { WorkshopproposaldashboardComponent } from './workshopproposaldashboard/workshopproposaldashboard.component';
import { DetailCellRendererComponent } from './detail-cell-renderer/detail-cell-renderer.component';
import { WorkshopproposalreportComponent } from './workshopproposalreport/workshopproposalreport.component';



@NgModule({
  declarations: [WorkshopproposaldashboardComponent, DetailCellRendererComponent, WorkshopproposalreportComponent],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    AgGridModule.withComponents([DetailCellRendererComponent]),
  ]
})
export class WorkshopproposaldashboardModule { }


