// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-itassetsingleitem',
//   templateUrl: './itassetsingleitem.component.html',
//   styleUrls: ['./itassetsingleitem.component.scss']
// })
// export class ItassetsingleitemComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
//===================

import {
  Component,
  OnDestroy,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  OnInit
} from "@angular/core";
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { trigger, state, style, transition, animate } from '@angular/animations';

//import { ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';

export interface ItassetsingleitemComponentData {
  variable: any;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-itassetsingleitem',
  templateUrl: './itassetsingleitem.component.html',
  styleUrls: [
    './itassetsingleitem.component.scss',
    '../../../../assets/css/indigo-pink.css',
    '../../../../assets/css/material.theme.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItassetsingleitemComponent),
      multi: true
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('1000ms ease-out')),
      transition('inactive => active', animate('1000ms ease-in'))
    ])
  ]
  
})
export class ItassetsingleitemComponent
  implements ControlValueAccessor, OnDestroy, OnInit {
  // @Input()
  // formLabel: string | number = "Condition";

  @Input()
  formLabel: string | number = "Sample";

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup;

  @Input()
  public formGroup: FormGroup;

  //cardImageSrc = "";

  showSmplLbl(){
    return false;
  }

  private _onChange: (
    value: ItassetsingleitemComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  assetSubCategory = "";

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this._createFormGroup();

    this._setupObservables();

    // if(this._form.controls.AssetSubCategory.value =="Laptop"){
    //   this.cardImageSrc = "assets/ItAssetsImage/Dell/Laptop/laptop2.jpg";
    // }else if(this._form.controls.AssetSubCategory.value =="Desktop"){
    //   this.cardImageSrc = "assets/ItAssetsImage/Dell/Laptop/laptop2.jpg";
    // }else if(this._form.controls.AssetSubCategory.value =="Modem"){
    //   this.cardImageSrc = "assets/ItAssetsImage/Dell/Laptop/laptop2.jpg";
    // }else if(this._form.controls.AssetSubCategory.value =="Mobile"){
    //   this.cardImageSrc = "assets/ItAssetsImage/Dell/Laptop/laptop2.jpg";
    // }
    
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }  

  writeValue(value: ItassetsingleitemComponentData): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }
  registerOnChange(
    fn: (v: ItassetsingleitemComponentData | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error("registerOnTouched not implemented");
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error("setDisabledState not implemented");
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      //EmployeeID: null,
      AssetSubCategory:"",
      AssetAcquisitionType: "",
      AssetTitle: "",
      AssetModel: "",
      AssetDescription: "",
      AssetNumber: "",
      //ResidualPriceAfterDepreciation: "",
      UserAcqusitionDate: null,
      //Vendor: "",
      WarrantyFrom: "",
      WarrantyExpDate: null,
      UsefulLife: "",
      //AssetUserName: "",
      Manufacturer: "",
      ProductSLNo: "",
      PurchaseDate: null
    });
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }

  
}


