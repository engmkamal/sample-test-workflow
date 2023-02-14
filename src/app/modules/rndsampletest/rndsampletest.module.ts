import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample/sample.component';
import { RequestorComponent } from './requestor/requestor.component';
import { RndlabtestparentComponent } from './rndlabtestparent/rndlabtestparent.component';
import { TestresultComponent } from './testresult/testresult.component';
import { GroupControlComponent } from './group-control/group-control.component';
import { ConditionFormComponent } from './condition-form/condition-form.component';
import { ActionButtonsBarComponent } from './action-buttons-bar/action-buttons-bar.component';
import { SampletestreqComponent } from './sampletestreq/sampletestreq.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MaterialModule } from 'src/app/shared/models/classes/material-module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { ParamselectfieldComponent } from './paramselectfield/paramselectfield.component';
import { LabresultComponent } from './labresult/labresult.component';
import { SampletestreportComponent } from './sampletestreport/sampletestreport.component';
import { ReportheaderComponent } from './reportheader/reportheader.component';
import { TestresultinputfieldsComponent } from './testresultinputfields/testresultinputfields.component';
import { AlertModule } from 'src/app/shared/alert';
import { NgxPrintModule } from 'ngx-print';
import { ReportprintComponent } from './reportprint/reportprint.component';
import { CustomerfeedbackstComponent } from './customerfeedbackst/customerfeedbackst.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [SampleComponent, RequestorComponent, RndlabtestparentComponent, TestresultComponent, GroupControlComponent, ConditionFormComponent, ActionButtonsBarComponent, SampletestreqComponent, ParamselectfieldComponent, LabresultComponent, SampletestreportComponent, ReportheaderComponent, TestresultinputfieldsComponent, ReportprintComponent, CustomerfeedbackstComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,    
    ReactiveFormsModule,    
    MaterialModule,
    NgSelectModule,
    AlertModule,
    NgxPrintModule,
    QRCodeModule
  ]
})
export class RndsampletestModule { }




