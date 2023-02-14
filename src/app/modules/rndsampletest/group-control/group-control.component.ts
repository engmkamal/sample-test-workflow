
import {
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ConditionFormComponentData } from "../condition-form/condition-form.component";

export interface GroupControlComponentData {
  //conjunctor?: null;
  Samples?: ConditionFormComponentData[];
  //TestParameters?: GroupControlComponentData[];
}

@Component({
  selector: 'app-group-control',
  templateUrl: './group-control.component.html',
  styleUrls: [
    './group-control.component.scss',
    '../../../../assets/css/indigo-pink.css'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupControlComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class GroupControlComponent
  implements ControlValueAccessor, OnDestroy, OnInit {
  @Input()
  formLabel: string | number = "TestParameter";

  @Input()
  formControlName: FormControl;

  @Input() requestInfo: any;

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup;

  private _onChange: (
    value: GroupControlComponentData | null | undefined
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

  writeValue(value: GroupControlComponentData | null | undefined): void {
    if (!value) {
      return;
    }
    setTimeout(() => {
      if (value.Samples.length) {
        this._conditionsFormArray.clear();
        value.Samples.forEach(c => this._addCondition());
      }

      // if (value.TestParameters.length) {
      //   this._groupsFormArray.clear();
      //   value.TestParameters.forEach(g => this._addGroup());
      // }

      this._form.patchValue(value);
    }, 50);
  }

  registerOnChange(
    fn: (value: GroupControlComponentData | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error('registerOnTouched not implemented');
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error('setDisabledState not implemented');
  }

  _deleteCondition(index: number) {
    this._conditionsFormArray?.removeAt(index);
  }

  
//========= adding new Sample input fields with formControlName ======= 
  _addCondition() {
    this._conditionsFormArray?.push(this._fb.control({ 
      SampleID: "",
      SampleDescription: "",
      Appearance: "",
      ReferenceNo: "",
      SampleType: null,
      MaterialConstruction: "",
      SampleQuantity: null,
      SpecificRequirement: "",
    }));
    
  }

  _deleteGroupFromArray(index: number) {
    this._groupsFormArray?.removeAt(index);
  }

  _addGroup() {
    this._groupsFormArray?.push(
      this._fb.control({
        //conjunctor: null,
        Samples: [],
        //TestParameters: []
      })
    );
  }

  get _conditionsFormArray(): FormArray {
    return this._form.get("Samples") as FormArray;
  }

  get _groupsFormArray(): FormArray {
    return this._form.get("TestParameters") as FormArray;
  }

  

  private _createFormGroup() {
    this._form = this._fb.group({
      //conjunctor: null,
      Samples: this._fb.array([]),
      //TestParameters: this._fb.array([])
    });

    // add one Sample on the next tick, after the form creation
    setTimeout(() => this._addCondition());
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }
}
