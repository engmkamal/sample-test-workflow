import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ReimbursementdashboardComponent } from './reimbursementdashboard/reimbursementdashboard.component';
import { EmpreimbursementdetailrenderedComponent } from './empreimbursementdetailrendered/empreimbursementdetailrendered.component';
import { EmpreimbursementreportComponent } from './empreimbursementreport/empreimbursementreport.component';



@NgModule({
  declarations: [ReimbursementdashboardComponent, EmpreimbursementdetailrenderedComponent, EmpreimbursementreportComponent],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    AgGridModule.withComponents([EmpreimbursementdetailrenderedComponent]),
    
  ]
})
export class EmpreimbursementdashboardModule { }
