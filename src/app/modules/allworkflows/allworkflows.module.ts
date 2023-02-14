import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetdisposalmstrComponent } from './assetdisposalmstr/assetdisposalmstr.component';
import { BoecheckpaymentmstrComponent } from './boecheckpaymentmstr/boecheckpaymentmstr.component';
import { ChangemanagementmstrComponent } from './changemanagementmstr/changemanagementmstr.component';
import { CreditdiscountmstrComponent } from './creditdiscountmstr/creditdiscountmstr.component';
import { EmployeeadvancemstrComponent } from './employeeadvancemstr/employeeadvancemstr.component';
import { EmppaintdiscountmstrComponent } from './emppaintdiscountmstr/emppaintdiscountmstr.component';
import { FbptrackermstrComponent } from './fbptrackermstr/fbptrackermstr.component';
import { FixedassetacquisitionmstrComponent } from './fixedassetacquisitionmstr/fixedassetacquisitionmstr.component';
import { FreefgmstrComponent } from './freefgmstr/freefgmstr.component';
import { FundrequestmstrComponent } from './fundrequestmstr/fundrequestmstr.component';
import { HrservicemstrComponent } from './hrservicemstr/hrservicemstr.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/shared/models/classes/material-module';
import { FormsModule } from '@angular/forms';
import { ItservicemstrComponent } from './itservicemstr/itservicemstr.component';
import { ManpowerrequisitionmstrComponent } from './manpowerrequisitionmstr/manpowerrequisitionmstr.component';
import { PoolcarrequisitionComponent } from './poolcarrequisition/poolcarrequisition.component';
import { ProvisionforxpensesmstrComponent } from './provisionforxpensesmstr/provisionforxpensesmstr.component';
import { ReimbursementmstrComponent } from './reimbursementmstr/reimbursementmstr.component';
import { SecurityincidencemstrComponent } from './securityincidencemstr/securityincidencemstr.component';
import { TrademerchandisingmstrComponent } from './trademerchandisingmstr/trademerchandisingmstr.component';
import { SupplybudgetcapexmstrComponent } from './supplybudgetcapexmstr/supplybudgetcapexmstr.component';
import { SupplybudgetexpensemstrComponent } from './supplybudgetexpensemstr/supplybudgetexpensemstr.component';
import { TravelrequestmstrComponent } from './travelrequestmstr/travelrequestmstr.component';
import { VendorcomplaintmstrComponent } from './vendorcomplaintmstr/vendorcomplaintmstr.component';
import { WorkshopproposalmstrComponent } from './workshopproposalmstr/workshopproposalmstr.component';

import { PlaceholderDirective } from 'src/app/shared/Placeholder.directive';
import { AstdisposalviewbtncstmComponent } from 'src/app/shared/CustomButtons/astdisposalviewbtncstm/astdisposalviewbtncstm.component';
import { TravelreqviewbtncstmComponent } from 'src/app/shared/CustomButtons/travelreqviewbtncstm/travelreqviewbtncstm.component';
import { TravelreqadjustmentbtncstmComponent } from 'src/app/shared/CustomButtons/travelreqadjustmentbtncstm/travelreqadjustmentbtncstm.component';
import { EmpAdvanceviewbtncstmComponent } from 'src/app/shared/CustomButtons/emp-advanceviewbtncstm/emp-advanceviewbtncstm.component';
import { EmpadvancedjustmentviewbtncstmComponent } from 'src/app/shared/CustomButtons/empadvancedjustmentviewbtncstm/empadvancedjustmentviewbtncstm.component';
import { MobilehandsetviewbtncstmComponent } from 'src/app/shared/CustomButtons/mobilehandsetviewbtncstm/mobilehandsetviewbtncstm.component';
import { EmppaintdisviewbtncstmComponent } from 'src/app/shared/CustomButtons/emppaintdisviewbtncstm/emppaintdisviewbtncstm.component';
import { BoechqpaymentvwbtncstmComponent } from 'src/app/shared/CustomButtons/boechqpaymentvwbtncstm/boechqpaymentvwbtncstm.component';
import { CrdiscountvwbtncstmComponent } from 'src/app/shared/CustomButtons/crdiscountvwbtncstm/crdiscountvwbtncstm.component';
import { ReimbursementvwbtncstmComponent } from 'src/app/shared/CustomButtons/reimbursementvwbtncstm/reimbursementvwbtncstm.component';
import { FbptrackervwbtncstmComponent } from 'src/app/shared/CustomButtons/fbptrackervwbtncstm/fbptrackervwbtncstm.component';
import { FxdassetvwbtncstmComponent } from 'src/app/shared/CustomButtons/fxdassetvwbtncstm/fxdassetvwbtncstm.component';
import { FundrequestvwbtncstmComponent } from 'src/app/shared/CustomButtons/fundrequestvwbtncstm/fundrequestvwbtncstm.component';
import { FrefgvwbtncstmComponent } from 'src/app/shared/CustomButtons/frefgvwbtncstm/frefgvwbtncstm.component';
import { HrservicevwbtncstmComponent } from 'src/app/shared/CustomButtons/hrservicevwbtncstm/hrservicevwbtncstm.component';
import { ItservicevwbtncstmComponent } from 'src/app/shared/CustomButtons/itservicevwbtncstm/itservicevwbtncstm.component';
import { ManpowerreqvwbtncstmComponent } from 'src/app/shared/CustomButtons/manpowerreqvwbtncstm/manpowerreqvwbtncstm.component';
import { PoolcarvwbtncstmComponent } from 'src/app/shared/CustomButtons/poolcarvwbtncstm/poolcarvwbtncstm.component';
import { ProvforexvwbtncstmComponent } from 'src/app/shared/CustomButtons/provforexvwbtncstm/provforexvwbtncstm.component';
import { SuplycapexvwbtncstmComponent } from 'src/app/shared/CustomButtons/suplycapexvwbtncstm/suplycapexvwbtncstm.component';
import { SuplyexpensevwbtncstmComponent } from 'src/app/shared/CustomButtons/suplyexpensevwbtncstm/suplyexpensevwbtncstm.component';
import { SecincidencevwbtncstmComponent } from 'src/app/shared/CustomButtons/secincidencevwbtncstm/secincidencevwbtncstm.component';
import { VendorcomplainvwbtncstmComponent } from 'src/app/shared/CustomButtons/vendorcomplainvwbtncstm/vendorcomplainvwbtncstm.component';
import { MobilehandsetmstrComponent } from './mobilehandsetmstr/mobilehandsetmstr.component';
import { ItassetmanagementmstrComponent } from './itassetmanagementmstr/itassetmanagementmstr.component';

@NgModule({
  declarations: [
    AssetdisposalmstrComponent, 
    BoecheckpaymentmstrComponent, 
    ChangemanagementmstrComponent, 
    CreditdiscountmstrComponent, 
    EmployeeadvancemstrComponent, 
    EmppaintdiscountmstrComponent, 
    FbptrackermstrComponent, 
    FixedassetacquisitionmstrComponent, 
    FreefgmstrComponent, 
    FundrequestmstrComponent, 
    HrservicemstrComponent, 
    ItservicemstrComponent, 
    ManpowerrequisitionmstrComponent, 
    PoolcarrequisitionComponent, 
    ProvisionforxpensesmstrComponent, 
    ReimbursementmstrComponent, 
    SecurityincidencemstrComponent, 
    SupplybudgetexpensemstrComponent, 
    SupplybudgetcapexmstrComponent, 
    TrademerchandisingmstrComponent,
    TravelrequestmstrComponent,
    VendorcomplaintmstrComponent,
    WorkshopproposalmstrComponent,
    PlaceholderDirective,
    MobilehandsetmstrComponent,
    ItassetmanagementmstrComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    AssetdisposalmstrComponent,
    BoecheckpaymentmstrComponent,
    ChangemanagementmstrComponent,
    CreditdiscountmstrComponent,
    EmployeeadvancemstrComponent,
    EmppaintdiscountmstrComponent,
    FbptrackermstrComponent,
    FixedassetacquisitionmstrComponent,
    FreefgmstrComponent,
    FundrequestmstrComponent,
    HrservicemstrComponent,
    ItassetmanagementmstrComponent,
    ItservicemstrComponent,
    ManpowerrequisitionmstrComponent,
    MobilehandsetmstrComponent,
    PoolcarrequisitionComponent,
    ProvisionforxpensesmstrComponent,
    ReimbursementmstrComponent,
    SecurityincidencemstrComponent,
    SupplybudgetexpensemstrComponent,
    SupplybudgetcapexmstrComponent,
    TrademerchandisingmstrComponent,    
    TravelrequestmstrComponent,
    VendorcomplaintmstrComponent,
    WorkshopproposalmstrComponent
  ],
  entryComponents: [
    AstdisposalviewbtncstmComponent,
    BoechqpaymentvwbtncstmComponent,    
    CrdiscountvwbtncstmComponent,    
    EmpAdvanceviewbtncstmComponent,
    EmpadvancedjustmentviewbtncstmComponent,
    EmppaintdisviewbtncstmComponent,
    FbptrackervwbtncstmComponent,
    FrefgvwbtncstmComponent,
    FxdassetvwbtncstmComponent,
    FundrequestvwbtncstmComponent,    
    HrservicevwbtncstmComponent,
    ItservicevwbtncstmComponent,     
    ManpowerreqvwbtncstmComponent,         
    MobilehandsetviewbtncstmComponent,
    PoolcarvwbtncstmComponent,
    ProvforexvwbtncstmComponent,
    ReimbursementvwbtncstmComponent, 
    SecincidencevwbtncstmComponent,
    SuplycapexvwbtncstmComponent,
    SuplyexpensevwbtncstmComponent,
    TravelreqviewbtncstmComponent,
    TravelreqadjustmentbtncstmComponent,
    TravelreqviewbtncstmComponent,      
    VendorcomplainvwbtncstmComponent
  ]
})
export class AllworkflowsModule { }
