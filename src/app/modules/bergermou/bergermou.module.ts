import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllmousComponent } from './allmous/allmous.component';
import { Cardtemplet1Component } from './cardtemplet1/cardtemplet1.component';
import { MaterialModule } from 'src/app/shared/models/classes/material-module';
//import { MaterialModule } from 'src/app/shared/models/classes/material-module';


@NgModule({
  declarations: [AllmousComponent, Cardtemplet1Component],
  imports: [
    CommonModule,
    MaterialModule,
    //FormsModule
  ]
})
export class BergermouModule { }
