import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { WorkshopProposalComponent } from './modules/WorkshopProposal/workshop-proposal/workshop-proposal.component';
import { ListWithSppnpjsService } from './list-with-sppnpjs.service';

//import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import '../../node_modules/@ag-grid-enterprise/all-modules/dist/ag-grid-enterprise';
import { HttpClientModule } from '@angular/common/http';
import { LiActionBtnCstmComponent } from './modules/WorkshopProposal/li-action-btn-cstm/li-action-btn-cstm.component';
import { GraphicalViewComponent } from './modules/WorkshopProposal/graphical-view/graphical-view.component';
import { TrademerchandisingComponent} from './trademerchandising/trademerchandising.component';
import 'ag-grid-enterprise';
import { AccesswiselistitemsService } from './accesswiselistitems.service';
import { TrademerchandisingModule } from './modules/trademerchandising/trademerchandising.module';
import { ChangemanagementModule } from './modules/changemanagement/changemanagement.module';
import { LiactionbtncstmComponent } from './shared/components/liactionbtncstm/liactionbtncstm.component';
import { MasterdetailsComponent } from './masterdetails/masterdetails.component';
import { ItservicerequestwfModule } from './modules/itservicerequestwf/itservicerequestwf.module';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DatepickercstmComponent } from './shared/components/datepickercstm/datepickercstm.component';
import { FlexLayoutModule, MediaObserver, MediaChange } from '@angular/flex-layout';
//import { MaterialModule } from './shared/models/classes/material-module';
import { MywfrequestsModule } from './modules/mywfrequests/mywfrequests.module';
import { MyprocessviewbtncstmComponent } from './shared/components/myprocessviewbtncstm/myprocessviewbtncstm.component';
import { MyprocessComponent } from './myprocess/myprocess.component';
import { AllworkflowsModule } from './modules/allworkflows/allworkflows.module';
import { MaterialModule } from './material/material.module';
import { RndsampletestModule } from './modules/rndsampletest/rndsampletest.module';
import { MyportalModule } from './modules/myportal/myportal.module';
import { SharepointworkflowService } from './shared/services/sharepointworkflow.service';
import { ItservicedashboardModule } from './modules/itservicedashboard/itservicedashboard.module';
import { RndsampletestdashboardModule } from './modules/rndsampletestdashboard/rndsampletestdashboard.module';
import { WorkshopproposaldashboardModule } from './modules/workshopproposaldashboard/workshopproposaldashboard.module';
import { EmpreimbursementdashboardModule } from './modules/empreimbursementdashboard/empreimbursementdashboard.module';
import { BergermouModule } from './modules/bergermou/bergermou.module';
import { HrcornerModule } from './modules/hrcorner/hrcorner.module';
//import { QRCodeModule } from 'angularx-qrcode';

//import { NgSelectModule } from '@ng-select/ng-select';

//import { ExpandMode, NgxTreeSelectModule } from 'ngx-tree-select'; 

@NgModule({
  declarations: [
    AppComponent,
    WorkshopProposalComponent,
    LiActionBtnCstmComponent,
    GraphicalViewComponent,
    TrademerchandisingComponent,
    MasterdetailsComponent,
    DatepickercstmComponent,
    MyprocessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    TrademerchandisingModule,
    ChangemanagementModule,
    ItservicerequestwfModule,
    ReactiveFormsModule,
    MomentDateModule,
    FlexLayoutModule,
    MaterialModule,
    MywfrequestsModule,
    AllworkflowsModule,
    RndsampletestModule,
    MyportalModule,
    ItservicedashboardModule,
    RndsampletestdashboardModule,
    WorkshopproposaldashboardModule,
    EmpreimbursementdashboardModule,
    BergermouModule,
    HrcornerModule,
    //QRCodeModule
    //NgSelectModule
    // NgxTreeSelectModule.forRoot({
    //     idField: 'id',
    //     textField: 'name',
    //     expandMode: ExpandMode.Selection
    //   })
  ],
  providers: [AccesswiselistitemsService, ListWithSppnpjsService, SharepointworkflowService],
  bootstrap: [AppComponent],
  entryComponents: [
    LiActionBtnCstmComponent, 
    LiactionbtncstmComponent, 
    DatepickercstmComponent,
    MyprocessviewbtncstmComponent
  ]
})
export class AppModule { }
