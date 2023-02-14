import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyitassetsComponent } from './myitassets/myitassets.component';
import { ItassetitemsComponent } from './itassetitems/itassetitems.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from 'src/app/shared/models/classes/material-module';
import { MyassetdashboardGroupcontrolComponent } from './myassetdashboard-groupcontrol/myassetdashboard-groupcontrol.component';
import { MyassetdashboardActionbuttonsbarComponent } from './myassetdashboard-actionbuttonsbar/myassetdashboard-actionbuttonsbar.component';
import { ItassetsingleitemComponent } from './itassetsingleitem/itassetsingleitem.component';



// @NgModule({
//   declarations: [MyitassetsComponent, ItassetitemsComponent],
//   imports: [
//     CommonModule
//   ]
// })
// export class MyportalModule { }

// //===================
@NgModule({
  declarations: [MyitassetsComponent, ItassetitemsComponent, MyassetdashboardGroupcontrolComponent, MyassetdashboardActionbuttonsbarComponent, ItassetsingleitemComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,    
    ReactiveFormsModule,    
    MaterialModule,
    NgSelectModule
  ]
})
export class MyportalModule { }
