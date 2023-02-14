
import {
  Component,
  OnDestroy,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

//import { ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';

export interface ConditionFormComponentData {
  SampleID?: string;  
  SampleDescription?: string;
  Appearance?: string;
  ReferenceNo?: string;
  SampleType?: string;
  MaterialConstruction?: string;
  SampleQuantity?: string;
  SpecificRequirement?: string;
}

@Component({
  selector: 'app-condition-form',
  templateUrl: './condition-form.component.html',
  styleUrls: [
    './condition-form.component.scss',
    '../../../../assets/css/indigo-pink.css',
    '../../../../assets/css/material.theme.scss',
],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConditionFormComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class ConditionFormComponent
  implements ControlValueAccessor, OnDestroy, OnInit {
  // @Input()
  // formLabel: string | number = "Condition";

  @Input()
  formLabel: string | number = "Sample";

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  @Input() requestInfo: any;

  _form: FormGroup;

  //sampleID;

  sampleInfo;

  sampleTypes = [ "Solid", "Liquid", "Powder", "Paste", "Textile", "Painted Substance", "Others" ];

  

  private _onChange: (
    value: ConditionFormComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this._createFormGroup();
    this._setupObservables();
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  writeValue(value: ConditionFormComponentData): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
    this.sampleInfo = value;
    //this.sampleID = value.SampleID;
    //this._form.controls.SampleID.patchValue("value.SampleID");
  }
  registerOnChange(
    fn: (v: ConditionFormComponentData | null | undefined) => void
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
      //variable: null,
      SampleID: null,
      //SampleID: this. _form.value.Title.RnDSection +'-'+this. _form.value.Title.Code+'-'+this. _form.value.Samples.length+'-ST-'+12,
      SampleDescription: null,
      Appearance: null,
      ReferenceNo: null,
      SampleType: null,
      MaterialConstruction: null,
      SampleQuantity: null,
      SpecificRequirement: null
    });
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }

  showSmplLbl(){
    if(this.requestInfo.uId != ""){
      return true;
    }else{return false;}
  }
}
