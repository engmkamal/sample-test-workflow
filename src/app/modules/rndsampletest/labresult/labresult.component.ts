import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Itsrequestfor } from '../../../shared/models/classes/itsrequestfor';
import { SelectAllChecbox, ITask } from '../../../shared/models/classes/select-all-checbox';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
//import { DatepickercstmComponent } from '../../../shared/components/datepickercstm';	
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
import { Z_RLE } from 'zlib';




import { MatDatepickerModule } from
  '@angular/material/datepicker';
import { MatInputModule } from
  '@angular/material/input';

 

const moment = _rollupMoment || _moment;

interface RequestFor {
  value: string;
  viewValue: string;
}

interface RequestForsGroup {
  disabled?: boolean;
  name: string;
  requestFor: RequestFor[];
}

interface ISample {
  SampleID?: string;
  SampleDescription?: string;
  Appearance?: string;
  ReferenceNo?: string;
  SampleType?: string;
  MaterialConstruction?: string;
  SampleQuantity?: string;
  SpecificRequirement?: string;
}

interface IResult {
  Parameter?: string;
  TestResult?: string;
  Unit?: string;
  RL?: string;
  LimitValue?: string;
  ResComment?: string;
}

interface ITestResult {
  SampleID?: string;
  //ReferenceNo?: string;
  Results?: IResult[]
}

interface ITestParameter {
  Samples?: ISample[];
  PackageCondition?: string;
  PacComments?: string;
  TestPeriodFrom?: Date;
  TestPeriodTo?: Date;
  Title?: string;
  Method?: string;
  RnDSection?: string;
  Respectives?: string;
  ReferenceNo?: string;
  TestResults?: ITestResult[];
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
  selector: 'app-labresult',
  templateUrl: './labresult.component.html',
  styleUrls: [
    './labresult.component.scss' 
  ],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]  

})

export class LabresultComponent implements OnInit, AfterViewInit {

  private mediaSub: Subscription;
  itsrequest: FormGroup;
  TestParameter: FormGroup;
  //status = "Submitted";
  @Input() requestInfo: any;
  @Output() outputToParent = new EventEmitter<any>();
  @Output() btnClickaction = new EventEmitter<any>();
  showResultSubmitBtn = false;
  //===========Request For options ========  
  requestForsGroups: RequestForsGroup[] = [
    {
      name: 'Standard',
      requestFor: [
        { value: 'Standard', viewValue: 'Standard' },
      ]
    },
    {
      name: 'Non Standard',
      requestFor: [
        { value: 'Non Standard', viewValue: 'Non Standard' },
      ]
    }
  ];
  //-----------options ends -------  

  date = new FormControl(moment());
  //media$: Observable<MediaChange[]>;
  cb: SelectAllChecbox = new SelectAllChecbox();
  TestParameterData: any = {};


  constructor(
    private mediaObserver: MediaObserver,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    //this.media$ = mediaObserver.asObservable();
  }

  setExistingResults(testResultSets: IResult[]): FormArray {
    const formArray = new FormArray([]);
    testResultSets.forEach(s => {
      formArray.push(this.formBuilder.group({
        Parameter: s.Parameter,
        TestResult: s.TestResult,
        Unit: s.Unit,
        RL: s.RL,
        LimitValue: s.LimitValue,
        ResComment: s.ResComment
      }));
    })
    return formArray;
  }

  setExistingTestResults(testResultSets: ITestResult[], testParamValue): FormArray {
    const formArray = new FormArray([]);

    if (testParamValue.Title.Code == "TESL") {

    }
    else if (testParamValue.Title.Code == "CORC" || testParamValue.Title.Code == "RUBB") {
      testResultSets.forEach(s => {
        formArray.push(this.formBuilder.group({
          SampleID: s.SampleID,
          Results: this.formBuilder.array([
            this.formBuilder.group({
              Parameter: s.Results[0].Parameter,
              TestResult: s.Results[0].TestResult,
              Unit: s.Results[0].Unit,
              RL: s.Results[0].RL,
              LimitValue: s.Results[0].LimitValue,
              ResComment: s.Results[0].ResComment
            }),
            this.formBuilder.group({
              Parameter: s.Results[1].Parameter,
              TestResult: s.Results[1].TestResult,
              Unit: s.Results[1].Unit,
              RL: s.Results[1].RL,
              LimitValue: s.Results[1].LimitValue,
              ResComment: s.Results[1].ResComment
            })
          ]),
        }));
        //(this.TestParameter.get('TestResults') as FormGroup).setControl('Results', this.setExistingResults(s.Results));        
      })
    }
    else {
      testResultSets.forEach(s => {
        formArray.push(this.formBuilder.group({
          SampleID: s.SampleID,
          Results: this.formBuilder.array([
            this.formBuilder.group({
              Parameter: s.Results[0].Parameter,
              TestResult: s.Results[0].TestResult,
              Unit: s.Results[0].Unit,
              RL: s.Results[0].RL,
              LimitValue: s.Results[0].LimitValue,
              ResComment: s.Results[0].ResComment
            })
          ]),
        }));
        //(this.TestParameter.get('TestResults') as FormGroup).setControl('Results', this.setExistingResults(s.Results));        
      })
    }

    return formArray;
  }

  setExistingSamples(sampleSets: ISample[]): FormArray {
    const formArray = new FormArray([]);
    sampleSets.forEach(s => {
      formArray.push(this.formBuilder.group({
        SampleID: s.SampleID,
        SampleDescription: s.SampleDescription,
        //Appearance: s.Appearance,
        ReferenceNo: s.ReferenceNo,
        SampleType: s.SampleType,
        //OtherSampleType: s.OtherSampleType,
        //MaterialConstruction: s.MaterialConstruction,
        //SampleQuantity: s.SampleQuantity,
        SpecificRequirement: s.SpecificRequirement,
        //Comments: s.Comments,
      }));
    })
    return formArray;
  }

  editTestParameter(testParamValue) {

    let tResults = [];

    for (let r = 0; r < this.requestInfo.Samples.length; r++) {
      let tResult = {};

      if (this.requestInfo.Title.Code == "TSEL") {
        //need to be implemented
      }

      else if (this.requestInfo.Title.Code == "RUBB" || this.requestInfo.Title.Code == "CORC") {
        tResult = {
          SampleID: this.requestInfo.Samples[r].SampleID,
          Results: [{
            Parameter: '',
            TestResult: '',
            Unit: '',
            RL: '',
            LimitValue: '',
            ResComment: ''
          }, {
            Parameter: '',
            TestResult: '',
            Unit: '',
            RL: '',
            LimitValue: '',
            ResComment: ''
          }]
        }
      }

      else {
        tResult = {
          SampleID: this.requestInfo.Samples[r].SampleID,
          Results: [{
            Parameter: '',
            TestResult: '',
            Unit: '',
            RL: '',
            LimitValue: '',
            ResComment: ''
          }]
        }
      }

      tResults.push(tResult);
    }

    this.TestParameterData = {
      PackageCondition: null,
      PacComments: null,
      TestPeriodFrom: null,
      TestPeriodTo: null,
      Title: this.requestInfo.Title.Title,
      Method: this.requestInfo.Title.Method,
      Samples: this.requestInfo.Samples,
      TestResults: tResults,
      PacComment: null
    };

    this.TestParameter.patchValue({
      PackageCondition: this.TestParameterData.PackageCondition,
      PacComments: this.TestParameterData.PacComments,
      TestPeriodFrom: this.TestParameterData.TestPeriodFrom,
      TestPeriodTo: this.TestParameterData.TestPeriodTo,
      Title: this.TestParameterData.Title,
      Method: this.TestParameterData.Method,
      PacComment: this.TestParameterData.PacComment,
    })

    this.TestParameter.setControl('Samples', this.setExistingSamples(this.TestParameterData.Samples))
    this.TestParameter.setControl('TestResults', this.setExistingTestResults(this.TestParameterData.TestResults, testParamValue))
  }

  ngOnInit() {
    // this.media$.subscribe(mq =>{
    //   console.log(mq);
    // })

    if (!this.requestInfo.hasOwnProperty('TestParameterStatus')) {
      this.requestInfo.TestParameterStatus == "Submitted";
    } 

    console.log('this.requestInfo.TestParameterStatus');
    console.log(JSON.stringify(this.requestInfo.TestParameterStatus));

    this.mediaSub = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      console.log(change.mqAlias);
      console.log(change);
    })

    
      this.createForm();

      this.editTestParameter(this.requestInfo);

      if (this.requestInfo.hasOwnProperty("TestParameterStatus")) {
        if (this.requestInfo.TestParameterStatus == "PickedUp") {
          this.showResultSubmitBtn = true;
        }
      }
   

    

  }

  ngAfterViewInit() { }

  // ngOnDestroy(){
  //   if(this.mediaSub){
  //       this.mediaSub.unsubscribe();
  //   }
  // }

  createResultArray(): FormGroup {
    const resultFields = {
      Parameter: ['Parameter'],
      TestResult: ['TestResult'],
      Unit: ['Unit'],
      RL: ['RL'],
      LimitValue: ['LimitValue'],
      ResComment: ['ResComment']
    }
    return this.formBuilder.group(resultFields)
  }

  createTestResultArray(): FormGroup {
    const testResultFields = {
      SampleID: ['SampleID'],
      ReferenceNo: ['ReferenceNo'],
      Results: this.formBuilder.array([
        this.createResultArray(),
        this.createResultArray()
      ])
    }
    return this.formBuilder.group(testResultFields);
  }

  addSampleFormGroup(): FormGroup {
    const sampleFilds = {
      SampleID: [''],
      SampleDescription: [''],
      Appearance: [''],
      ReferenceNo: [''],
      SampleType: [''],
      OtherSampleType: [''],
      MaterialConstruction: [''],
      SampleQuantity: [''],
      SpecificRequirement: ['']
    }
    return this.formBuilder.group(sampleFilds);
  }

  private createForm() {
    const config = {
      TestResults: this.formBuilder.array([this.createPeopleArray()]),
      Samples: this.formBuilder.array([
        this.addSampleFormGroup()
      ]),
      PackageCondition: [''],
      PacComments: [''],
      TestPeriodFrom: [''],
      TestPeriodTo: [''],
      Title: [''],
      Method: [''],
      //RnDSection: [''],
      // TestResults: this.formBuilder.array([ 
      //   this.createTestResultArray()
      // ]),
    };

    this.TestParameter = this.formBuilder.group(config);
  }


  addResultOnBtnClk_(i) {
    (this.TestParameter.get('TestResults') as FormGroup).addControl('Results', this.createResultArray());
    //const control = <FormArray>this.TestParameter.get('TestResults')['controls'][i].get('Results');
    //const control = <FormGroup>this.TestParameter.controls.TestResults.controls[0].controls.Results.controls;
    //console.log('addResultOnBtnClk on control: ' + control);
    //control.push(this.createResultArray());
  }

  addSampleOnClick(): void {
    (<FormArray>this.TestParameter.controls.TestResults).push(this.addSampleFormGroup())
  }

  addResultOnBtnClk(i) {
    let usersArray = this.TestParameter.controls.TestResults['controls'][i].get('Results') as FormArray;
    let arraylen = usersArray.length;

    usersArray.insert(arraylen, this.addSampleFormGroup());
  }

  createPeopleArray() {
    return this.formBuilder.group({
      SampleID: null,
      ReferenceNo: null,
      Results: new FormArray([
        this.createAddressArray()
      ])
    });
  }

  getPeople(form) {
    return form.controls.TestResults.controls;
  }

  getAddress(form) {
    return form.controls.Results.controls;
  }

  //=========== creating Test result row(multi line) form controll start==========
  createAddressArray() {
    return this.formBuilder.group({
      Parameter: [''],
      TestResult: [''],
      Unit: [''],
      RL: [''],
      LimitValue: [''],
      ResComment: ['']
    })
  }
  //--------------creating Test result row(multi line) form controll ends-----------

  addTestResults() {
    const control = <FormArray>this.TestParameter.get('TestResults');
    control.push(this.createPeopleArray());
  }

  addAddress(i) {
    const control = <FormArray>this.TestParameter.get('TestResults')['controls'][i].get('Results');
    // console.log(control);
    control.push(this.createAddressArray());
  }


  removeTestResults(i) {
    const control = <FormArray>this.TestParameter.get('TestResults')
    // console.log(control);
    control.removeAt(i);

  }

  removeAddress(i, j) {
    const control = <FormArray>this.TestParameter.get('TestResults')['controls'][i].get('Results');
    // console.log(control);
    control.removeAt(j);

  }

  onSelectItem(ev, i) { }

  showLabTxt() {
    if (this.requestInfo.Status == "Submitted" || this.requestInfo.Status == "PickedUp") {
      return true;
    }
    return false;
  }

  showSmplLbl() {
    if (this.requestInfo.Status == "Submitted" || this.requestInfo.Status == "PickedUp" || this.requestInfo.Status == "Reported" || this.requestInfo.Status == "PartiallyReported" || this.requestInfo.Status == "Completed" || this.requestInfo.Status == "Rejected") {
      return true;
    }
    return false;
  }

  showLabFlds() {
    if (this.requestInfo.Status == "Submitted" || this.requestInfo.Status == "PickedUp") {
      return true;
    }
    return false;
  }

  approveraction(action, index?:number) {
    this.outputToParent.emit(this.TestParameter.value);
    this.btnClickaction.emit(action);
  }

  onSubmitBtn() {  
    //===disabling and then hiding action btn ====
    let btn = Array.from(document.getElementsByClassName('btn') as HTMLCollectionOf<HTMLElement>);

    for (let b = 0; b < btn.length; b++) {
      btn[b].style.background = "grey";
    }  

    setTimeout(function () {
      for (let b = 0; b < btn.length; b++) {
        btn[b].style.display = "none";
      }
    }, 1000);    
  }
}




