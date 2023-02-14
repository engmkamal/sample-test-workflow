import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import { MyspworkflowsComponent } from './myspworkflows/myspworkflows.component';
import { MaterialModule } from 'src/app/shared/models/classes/material-module';

import { BrowserModule } from '@angular/platform-browser';
//import { AppComponent } from './app.component';
//import { SortByPipe } from './sort-by.pipe';
//import { FilterPipe } from './filter.pipe';
import { Pipe, PipeTransform } from '@angular/core';

@NgModule({
  declarations: [
    MyspworkflowsComponent,
    //SortByPipe,
    //FilterPipe
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MaterialModule,
    FormsModule
  ]
})
export class MywfrequestsModule { }
