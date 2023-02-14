import {
  Component,
  OnDestroy,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  OnInit,
  AfterViewInit
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

//import { ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';

export interface ItassetitemsComponentData {
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
  selector: 'app-itassetitems',
  templateUrl: './itassetitems.component.html',
  styleUrls: [
    './itassetitems.component.scss',
    '../../../../assets/css/indigo-pink.css',
    '../../../../assets/css/material.theme.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItassetitemsComponent),
      multi: true
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
  
})
export class ItassetitemsComponent
  implements ControlValueAccessor, OnDestroy, OnInit, AfterViewInit {
  // @Input()
  // formLabel: string | number = "Condition";

  @Input()
  formLabel: string | number = "Sample";

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup;

  @Input()
  public formGroup: FormGroup;

  cardImageSrc = "";

  showSmplLbl(){
    return false;
  }

  private _onChange: (
    value: ItassetitemsComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  assetSubCategory = "";

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this._createFormGroup();

    this._setupObservables();

    // if(this._form.controls.AssetSubCategory.value =="Laptop"){
    //   alert(this._form.controls.AssetSubCategory.value);
    //   this.cardImageSrc = "Laptop";
    // }else if(this._form.controls.AssetSubCategory.value =="Desktop"){
    //   alert(this._form.controls.AssetSubCategory.value);
    //   this.cardImageSrc = "Desktop";
    // }else if(this._form.controls.AssetSubCategory.value =="Modem"){
    //   alert(this._form.controls.AssetSubCategory.value);
    //   this.cardImageSrc = "Modem";
    // }else if(this._form.controls.AssetSubCategory.value =="Mobile"){
    //   alert(this._form.controls.AssetSubCategory.value);
    //   this.cardImageSrc = "Mobile";
    // }
  }

  ngAfterViewInit(){
    if(this._form.controls.AssetSubCategory.value =="Laptop"){
      //alert(this._form.controls.AssetSubCategory.value);
      this.cardImageSrc = "Laptop";
    }else if(this._form.controls.AssetSubCategory.value =="Desktop"){
      //alert(this._form.controls.AssetSubCategory.value);
      this.cardImageSrc = "Desktop";
    }else if(this._form.controls.AssetSubCategory.value =="Modem"){
      //alert(this._form.controls.AssetSubCategory.value);
      this.cardImageSrc = "Modem";
    }else if(this._form.controls.AssetSubCategory.value =="Mobile"){
      //alert(this._form.controls.AssetSubCategory.value);
      this.cardImageSrc = "Mobile";
    }
  }

  

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  

  writeValue(value: ItassetitemsComponentData): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }
  registerOnChange(
    fn: (v: ItassetitemsComponentData | null | undefined) => void
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

