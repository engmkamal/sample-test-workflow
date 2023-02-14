import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { LiactionbtncstmComponent } from './components/liactionbtncstm/liactionbtncstm.component';
import { MyprocessviewbtncstmComponent } from './components/myprocessviewbtncstm/myprocessviewbtncstm.component';
import { TravelreqviewbtncstmComponent } from './CustomButtons/travelreqviewbtncstm/travelreqviewbtncstm.component';
import { TravelreqadjustmentbtncstmComponent } from './CustomButtons/travelreqadjustmentbtncstm/travelreqadjustmentbtncstm.component';
import { EmpAdvanceviewbtncstmComponent } from './CustomButtons/emp-advanceviewbtncstm/emp-advanceviewbtncstm.component';
import { EmpadvancedjustmentviewbtncstmComponent } from './CustomButtons/empadvancedjustmentviewbtncstm/empadvancedjustmentviewbtncstm.component';
import { MobilehandsetviewbtncstmComponent } from './CustomButtons/mobilehandsetviewbtncstm/mobilehandsetviewbtncstm.component';
import { EmppaintdisviewbtncstmComponent } from './CustomButtons/emppaintdisviewbtncstm/emppaintdisviewbtncstm.component';
import { AstdisposalviewbtncstmComponent } from './CustomButtons/astdisposalviewbtncstm/astdisposalviewbtncstm.component';
import { BoechqpaymentvwbtncstmComponent } from './CustomButtons/boechqpaymentvwbtncstm/boechqpaymentvwbtncstm.component';
import { CrdiscountvwbtncstmComponent } from './CustomButtons/crdiscountvwbtncstm/crdiscountvwbtncstm.component';
import { ReimbursementvwbtncstmComponent } from './CustomButtons/reimbursementvwbtncstm/reimbursementvwbtncstm.component';
import { FbptrackervwbtncstmComponent } from './CustomButtons/fbptrackervwbtncstm/fbptrackervwbtncstm.component';
import { FxdassetvwbtncstmComponent } from './CustomButtons/fxdassetvwbtncstm/fxdassetvwbtncstm.component';
import { FundrequestvwbtncstmComponent } from './CustomButtons/fundrequestvwbtncstm/fundrequestvwbtncstm.component';
import { FrefgvwbtncstmComponent } from './CustomButtons/frefgvwbtncstm/frefgvwbtncstm.component';
import { HrservicevwbtncstmComponent } from './CustomButtons/hrservicevwbtncstm/hrservicevwbtncstm.component';
import { ItservicevwbtncstmComponent } from './CustomButtons/itservicevwbtncstm/itservicevwbtncstm.component';
import { ManpowerreqvwbtncstmComponent } from './CustomButtons/manpowerreqvwbtncstm/manpowerreqvwbtncstm.component';
import { PoolcarvwbtncstmComponent } from './CustomButtons/poolcarvwbtncstm/poolcarvwbtncstm.component';
import { ProvforexvwbtncstmComponent } from './CustomButtons/provforexvwbtncstm/provforexvwbtncstm.component';
import { SuplycapexvwbtncstmComponent } from './CustomButtons/suplycapexvwbtncstm/suplycapexvwbtncstm.component';
import { SuplyexpensevwbtncstmComponent } from './CustomButtons/suplyexpensevwbtncstm/suplyexpensevwbtncstm.component';
import { SecincidencevwbtncstmComponent } from './CustomButtons/secincidencevwbtncstm/secincidencevwbtncstm.component';
import { VendorcomplainvwbtncstmComponent } from './CustomButtons/vendorcomplainvwbtncstm/vendorcomplainvwbtncstm.component';

//import { PlaceholderDirective } from './Placeholder.directive';

//import { PlaceholderDirective } from './Placeholder.directive';
//import { DatepickercstmComponent } from './components/datepickercstm/datepickercstm.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    LiactionbtncstmComponent,
    MyprocessviewbtncstmComponent,
    TravelreqviewbtncstmComponent,
    TravelreqadjustmentbtncstmComponent,
    EmpAdvanceviewbtncstmComponent,
    EmpadvancedjustmentviewbtncstmComponent,
    MobilehandsetviewbtncstmComponent,
    EmppaintdisviewbtncstmComponent,
    AstdisposalviewbtncstmComponent,
    BoechqpaymentvwbtncstmComponent,
    CrdiscountvwbtncstmComponent,
    ReimbursementvwbtncstmComponent,
    FbptrackervwbtncstmComponent,
    FxdassetvwbtncstmComponent,
    FundrequestvwbtncstmComponent,
    FrefgvwbtncstmComponent,
    HrservicevwbtncstmComponent,
    ItservicevwbtncstmComponent,
    ManpowerreqvwbtncstmComponent,
    PoolcarvwbtncstmComponent,
    ProvforexvwbtncstmComponent,
    SuplycapexvwbtncstmComponent,
    SuplyexpensevwbtncstmComponent,
    SecincidencevwbtncstmComponent,
    VendorcomplainvwbtncstmComponent,
    //PlaceholderDirective
    //DatepickercstmComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    //AstdisposalviewbtncstmComponent,
    TravelreqviewbtncstmComponent,
    TravelreqadjustmentbtncstmComponent,
    EmpAdvanceviewbtncstmComponent,
    EmpadvancedjustmentviewbtncstmComponent,
    EmppaintdisviewbtncstmComponent
    //PlaceholderDirective
  ]
})
export class SharedModule { }
