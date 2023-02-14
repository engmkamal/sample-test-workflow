import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItsapplicationinfoComponent } from './itsapplicationinfo/itsapplicationinfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/models/classes/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
//import { ExpandMode, NgxTreeSelectModule } from 'ngx-tree-select';
@NgModule({
  declarations: [ItsapplicationinfoComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,  
    ReactiveFormsModule,    
    MaterialModule,
    NgSelectModule
    //MatToolbarModule,
    //MatButtonModule,
    //MatInputModule,
    //MatInputModule,
    //MatIconModule,
    //MatOptionModule,
    //MatSelectModule,
    //MatDatepickerModule,
    //MatMomentDateModule,    
    // NgxTreeSelectModule.forRoot({
    //   idField: 'id',
    //   textField: 'name',
    //   expandMode: ExpandMode.Selection
    // })    
  ]
})
export class ItservicerequestwfModule { }
