import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmadvancedashboardComponent } from './tmadvancedashboard/tmadvancedashboard.component';

import { AgGridModule } from 'ag-grid-angular';
import { TmliviewbtncstmComponent } from './tmliviewbtncstm/tmliviewbtncstm.component';
import { ShopsigndashboardComponent } from './shopsigndashboard/shopsigndashboard.component';
import { ShopsigdetailrendererComponent } from './shopsigdetailrenderer/shopsigdetailrenderer.component';

@NgModule({
  declarations: [TmadvancedashboardComponent, TmliviewbtncstmComponent, ShopsigndashboardComponent, ShopsigdetailrendererComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([ShopsigdetailrendererComponent]),
  ],
  entryComponents: [TmliviewbtncstmComponent]
})
export class TrademerchandisingModule { }


