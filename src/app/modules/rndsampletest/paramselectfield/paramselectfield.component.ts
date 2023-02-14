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
import { testParametersGroupedMatrix } from '../data';
//"node_modules/@ng-select/ng-select/themes/default.theme.scss";
//import { ControlContainer, FormGroupDirective, FormControl } from '@angular/forms';

export interface ParamselectfieldComponent {
  variable: any;
}

@Component({
  selector: 'app-paramselectfield',
  templateUrl: './paramselectfield.component.html',
  styleUrls: [
    './paramselectfield.component.scss',
    //'../../../../assets/css/indigo-pink.css',
    //'../../../../assets/css/ng-select.component.scss',
    //'../../../../assets/css/material.theme.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParamselectfieldComponent),
      multi: true
    }
  ],
  //encapsulation: ViewEncapsulation.Emulated
})
export class ParamselectfieldComponent
  implements ControlValueAccessor, OnDestroy, OnInit {
  // @Input()
  // formLabel: string | number = "Condition";

  @Input()
  requestInfo: any;

  @Input()
  formLabel: string | number = "Sample";

  @Input()
  formGroup: FormGroup;


  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup;

  selectedTestMethod = "";
  sampleReq = "";
  requiredDay = "";
  testParameters = testParametersGroupedMatrix;
  selectedTestTitle = '';
  webAbsoluteUrl = window.location.origin + "/leaveauto";

  private _onChange: (
    value: ParamselectfieldComponent | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();
  

  constructor(private _fb: FormBuilder) { }

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

  writeValue(value: ParamselectfieldComponent): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }
  registerOnChange(
    fn: (v: ParamselectfieldComponent | null | undefined) => void
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
    // this._form = this._fb.group({
    //   Title: null      
    // });

    // this.formGroup = this._fb.group({
    //   Title: null      
    // });
    this.formGroup.addControl('Title', this._fb.control(''));
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }

  onTestParamSelect(event) {
    //====== uncomment for production environment ===
    if((event.Respectives).some(approver => approver.RAdId == this.requestInfo.logedUserAdId)){
      alert("You are not allowed to request for any Test for which you are respnsible to prepare result !");
            
      setTimeout(function () {
        window.location.href = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx';
      }, 4000);
    }

    this.selectedTestMethod = event.Method;
    this.sampleReq = event.SampleReq;
    this.requiredDay = event.RequiredDay;
  }
}
