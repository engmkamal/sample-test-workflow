import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Itsrequestfor } from '../../../shared/models/classes/itsrequestfor';
import { SelectAllChecbox, ITask } from '../../../shared/models/classes/select-all-checbox';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
//import { DatepickercstmComponent } from '../../../shared/components/datepickercstm';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
//import { Z_RLE } from 'zlib';




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
  selector: 'app-testresult',
  templateUrl: './testresult.component.html',
  styleUrls: ['./testresult.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  
})

export class TestresultComponent implements OnInit, AfterViewInit{    

  private mediaSub: Subscription;


  itsrequest:FormGroup;
  TestParameter:FormGroup;
  status = "OPMToLab";
  //status = "Submitted";

  @Input() requestInfo: any;
  
  @Output() outputToParent = new EventEmitter<any>();

  showReport = "Reported";

  sampleTypes = [ "Solid", "Liquid", "Powder", "Paste", "Textile", "Painted Substance", "Others" ];

  //===========Request For options ========  
    //requestForsControl = new FormControl();
    requestForsGroups: RequestForsGroup[] = [
    {
      name: 'Standard',
      requestFor: [
        {value: 'Standard', viewValue: 'Standard'},
      ]
    },
    {
      name: 'Non Standard',
      requestFor: [        
        {value: 'Non Standard', viewValue: 'Non Standard'},
      ]
    }     
    
    ];
  //-----------options ends -------


  

  date = new FormControl(moment());

  //media$: Observable<MediaChange[]>;

  cb:SelectAllChecbox = new SelectAllChecbox();


  TestParameterData: any = {};  

  constructor(
    private mediaObserver: MediaObserver, 
    private formBuilder:FormBuilder,
    private cdRef: ChangeDetectorRef
    ) {
    //this.media$ = mediaObserver.asObservable();
  }

  setExistingResults(testResultSets: IResult[]): FormArray {
    const formArray = new FormArray([]);
    testResultSets.forEach(s =>{
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

  setExistingTestResults_preserved(testResultSets: ITestResult[]): FormArray {
    const formArray = new FormArray([]);

    let _results = [];    

    testResultSets.forEach(s =>{

      for(let r=0; r<s.Results.length; r++){
        _results.push(
          this.formBuilder.group({
            Parameter: s.Results[r].Parameter,
            TestResult: s.Results[r].TestResult,
            Unit: s.Results[r].Unit,
            RL: s.Results[r].RL,
            LimitValue: s.Results[r].LimitValue,
            ResComment: s.Results[r].ResComment
        }))
      }

      formArray.push(this.formBuilder.group({
          SampleID: s.SampleID,
          //Results: this.formBuilder.array(_results),          
        }));
        //(this.TestParameter.get('TestResults') as FormGroup).setControl('Results', this.setExistingResults(s.Results));        
    })
    return formArray;
  }

  // setExistingTestResults(testResultSets: ITestResult[]): FormArray {
  //   const formArray = new FormArray([]);
  //   testResultSets.forEach(s =>{
  //     formArray.push(this.formBuilder.group({
  //         SampleID: s.SampleID,
  //         Results: this.formBuilder.array([
  //           this.formBuilder.group({
  //             Parameter: s.Results[0].Parameter,
  //             TestResult: s.Results[0].TestResult,
  //             Unit: s.Results[0].Unit,
  //             RL: s.Results[0].RL,
  //             LimitValue: s.Results[0].LimitValue,
  //             ResComment: s.Results[0].ResComment
  //           }),
  //           this.formBuilder.group({
  //             Parameter: s.Results[1].Parameter,
  //             TestResult: s.Results[1].TestResult,
  //             Unit: s.Results[1].Unit,
  //             RL: s.Results[1].RL,
  //             LimitValue: s.Results[1].LimitValue,
  //             ResComment: s.Results[1].ResComment
  //           })
  //         ]),          
  //       }));
  //       (this.TestParameter.get('TestResults') as FormGroup).setControl('Results', this.setExistingResults(s.Results));        
  //   })
  //   return formArray;
  // }

  setExistingTestResults(testResultSets: ITestResult[], testParamValue): FormArray {
    const formArray = new FormArray([]);
    
    if(testParamValue.Title.Code == "TSEL"){
      //need to be implemented
    }

    else if(testParamValue.Title.Code == "CORC" || testParamValue.Title.Code == "RUBB"){
      testResultSets.forEach(s =>{
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

    else{
      testResultSets.forEach(s =>{
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
    sampleSets.forEach(s =>{
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

  setExistingTestResultsNotReported(testResultSets: ITestResult[]): FormArray {
    const formArray = new FormArray([]);
    
    testResultSets.forEach(s =>{
      
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
            // this.formBuilder.group({
            //   Parameter: s.Results[1].Parameter,
            //   TestResult: s.Results[1].TestResult,
            //   Unit: s.Results[1].Unit,
            //   RL: s.Results[1].RL,
            //   LimitValue: s.Results[1].LimitValue,
            //   ResComment: s.Results[1].ResComment
            // })
          ]),          
        }));
        //(this.TestParameter.get('TestResults') as FormGroup).setControl('Results', this.setExistingResults(s.Results));        
    })
    return formArray;
  }

  setExistingSamplesNotReported(sampleSets: ISample[]): FormArray {
    const formArray = new FormArray([]);
    sampleSets.forEach(s =>{
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

  editTestParameter(){
    // this.requestInfo.RnDLabTest = [
    //   {
    //     Samples:
    //     [
    //       {
    //         SampleID:"WB-SCRU-1-ST-21",
    //         SampleDescription:"Sample Description 1",
    //         Appearance:"Appearance 1",
    //         ReferenceNo:"Reference No 1",
    //         SampleType:"Solid",
    //         MaterialConstruction:"Material Construction1",
    //         SampleQuantity:"Sample Quantity",
    //         SpecificRequirement:"Specific Requirement"
    //       }
    //     ],
    //     TestParameters:[],
    //     TestParameterStatus:"Reported",
    //     Title:{
    //       RnDSection:"WB",
    //       Title:"Scrub Resistance of Paints",
    //       Code:"SCRU","Method":"Laboratory Developed",
    //       Respectives:[{
    //         "RName":"Md Mohiuddin Kaisher","REmail":"mohiuddin.kaisher@bergerbd.com","RAdId":"882"},{"RName":"Md Fahim Hossain","REmail":"fahim@bergerbd.com","RAdId":"1038"
    //       }]
    //     },
    //     TestResults:[{SampleID:"WB-SCRU-1-ST-21",Results:[{Parameter:"ppppppppp1",TestResult:"rr1",Unit:"uuuuuuu1",RL:"rrr1",LimitValue:"llll1",ResComment:"ccc1"}]}],
    //     PackageCondition:null,
    //     PacComments:null,
    //     TestPeriodFrom:"2021-03-07T18:00:00.000Z",
    //     TestPeriodTo:"2021-03-07T18:00:00.000Z"
    //   },
    //   // {
    //   //   "Samples":[{"SampleID":"QA-GRIN-1-ST-21","SampleDescription":"Sample Description 2","Appearance":"Appearance2","ReferenceNo":"Reference N2","SampleType":"Liquid","MaterialConstruction":"Material Constructio2","SampleQuantity":"Sample Quantity 2","SpecificRequirement":"Specific Requirement2"}],
    //   //   "TestParameters":[],
    //   //   "TestParameterStatus":"Submitted",
    //   //   "Title":{"RnDSection":"QA","Title":"Dispersion of Pigment-Vehicle System","Code":"GRIN","Method":"ASTM D1210","Respectives":[{"RName":"Mahbub Hossain","REmail":"mahbubhossain@bergerbd.com","RAdId":"140"},{"RName":"Md Zahedul Islam","REmail":"zahedul@bergerbd.com","RAdId":"242"}]}
    //   // }
    // ];

 

    let tResults =[];
    
      for(let r=0; r<this.requestInfo.RnDLabTest[0].Samples.length; r++){
      let tResult ={};
      // if(this.requestInfo.RnDLabTest[0].Title.RnDSection == "EP"){
      //   tResult = {
      //     SampleID: this.requestInfo.RnDLabTest[0].Samples[r].SampleID,
      //     Results: [{
      //       Parameter: '',
      //       TestResult: '',
      //       Unit: '',
      //       RL: '',
      //       LimitValue: '',
      //       ResComment: ''
      //     },{
      //       Parameter: '',
      //       TestResult: '',
      //       Unit: '',
      //       RL: '',
      //       LimitValue: '',
      //       ResComment: ''
      //     }]      
      //   }
      // }
     
      // else {
      //   tResult = {
      //     SampleID: this.requestInfo.RnDLabTest[0].Samples[r].SampleID,
      //     Results: [{
      //       Parameter: '',
      //       TestResult: '',
      //       Unit: '',
      //       RL: '',
      //       LimitValue: '',
      //       ResComment: ''
      //     }]      
      //   }
      // }

        tResult = {
          SampleID: this.requestInfo.RnDLabTest[0].Samples[r].SampleID,
          Results: [{
            Parameter: '',
            TestResult: '',
            Unit: '',
            RL: '',
            LimitValue: '',
            ResComment: ''
          },{
            Parameter: '',
            TestResult: '',
            Unit: '',
            RL: '',
            LimitValue: '',
            ResComment: ''
          }]      
        }
      
      tResults.push(tResult);
    }
    this.TestParameterData = {
      PackageCondition: null,
      PacComments: null,
      TestPeriodFrom: null,
      TestPeriodTo: null,
      Title: this.requestInfo.RnDLabTest[0].Title.Title,
      Method: this.requestInfo.RnDLabTest[0].Title.Method,
      //RnDSection: this.requestInfo.RnDLabTest[0].Title.RnDSection,
      //Respectives: this.requestInfo.RnDLabTest[0].Title.Respectives,
      Samples: this.requestInfo.RnDLabTest[0].Samples,      
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
      //RnDSection: this.TestParameterData.RnDSection,
      //Respectives: this.TestParameterData.Respectives, 
      PacComment: this.TestParameterData.PacComment,
    })

    this.TestParameter.setControl('Samples', this.setExistingSamplesNotReported(this.TestParameterData.Samples))
    this.TestParameter.setControl('TestResults', this.setExistingTestResultsNotReported(this.TestParameterData.TestResults))
  }

  editTestParameterOnReported(testParamValue){

    //============for displaying value in <Samples> formGroup from 'requestInfo' array object in 'Submitted' status=========
    this.TestParameter.setControl('Samples', this.setExistingSamples(this.requestInfo.RnDLabTest.TestParameters[0].Samples))

    //============for displaying value in TestParameter formGroup =========
    this.TestParameter.patchValue({
      PackageCondition: this.requestInfo.RnDLabTest.TestParameters[0].PackageCondition,
      PacComments: this.requestInfo.RnDLabTest.TestParameters[0].PacComments,
      TestPeriodFrom: this.requestInfo.RnDLabTest.TestParameters[0].TestPeriodFrom,
      TestPeriodTo: this.requestInfo.RnDLabTest.TestParameters[0].TestPeriodTo
    })

     //============for displaying value in Title formGroup =========
     this.TestParameter.controls.Title.patchValue({
      Title: this.requestInfo.RnDLabTest.TestParameters[0].Title.Title,
      Method: this.requestInfo.RnDLabTest.TestParameters[0].Title.Method
    })

    let tResults =[];
    
      for(let r=0; r<testParamValue.TestResults.length; r++){
      let tResult ={};     
      if(testParamValue.Title.Code == "RUBB" || testParamValue.Title.Code == "RUBB"){
        tResult = {
          SampleID: testParamValue.TestResults[r].SampleID,
          Results: [{
            Parameter: testParamValue.TestResults[r].Results[0].Parameter,
            TestResult: testParamValue.TestResults[r].Results[0].TestResult,
            Unit: testParamValue.TestResults[r].Results[0].Unit,
            RL: testParamValue.TestResults[r].Results[0].RL,
            LimitValue: testParamValue.TestResults[r].Results[0].LimitValue,
            ResComment: testParamValue.TestResults[r].Results[0].ResComment
          },{
            Parameter: testParamValue.TestResults[r].Results[1].Parameter,
            TestResult: testParamValue.TestResults[r].Results[1].TestResult,
            Unit: testParamValue.TestResults[r].Results[1].Unit,
            RL: testParamValue.TestResults[r].Results[1].RL,
            LimitValue: testParamValue.TestResults[r].Results[1].LimitValue,
            ResComment: testParamValue.TestResults[r].Results[1].ResComment
          }]      
        }
      }
      else{
        tResult = {
          SampleID: testParamValue.TestResults[r].SampleID,
          Results: [{
            Parameter: testParamValue.TestResults[r].Results[0].Parameter,
            TestResult: testParamValue.TestResults[r].Results[0].TestResult,
            Unit: testParamValue.TestResults[r].Results[0].Unit,
            RL: testParamValue.TestResults[r].Results[0].RL,
            LimitValue: testParamValue.TestResults[r].Results[0].LimitValue,
            ResComment: testParamValue.TestResults[r].Results[0].ResComment
          }]      
        }
      }
        
      
      tResults.push(tResult);
    }

    // this.TestParameterData = { 
    //   PackageCondition: null,
    //   PacComments: null,
    //   TestPeriodFrom: null,
    //   TestPeriodTo: null,
    //   Title: this.requestInfo.RnDLabTest[0].Title.Title,
    //   Method: this.requestInfo.RnDLabTest[0].Title.Method,
    //   Samples: this.requestInfo.RnDLabTest[0].Samples,      
    //   TestResults: tResults,
    //   PacComment: null
    // };

    
    
    
    

    

    
    
    
    //============for displaying value in <TestResults> formArray from 'requestInfo' array object in 'Completed' status=========
    if(testParamValue.TestParameterStatus == "Submitted"){
      //this.TestParameter.setControl('TestResults', this.setExistingTestResults(this.requestInfo.RnDLabTest[0].TestResults))
    }
    

    //============for displaying SampleID in <TestResults> formArray from 'requestInfo' array object in 'Submitted' status=========
    if(testParamValue.TestParameterStatus == "Reported"){
      this.TestParameter.setControl('TestResults', this.setExistingTestResults(tResults, testParamValue))
    }
    else{
      this.TestParameter.setControl('TestResults', this.setExistingTestResults(this.TestParameterData.TestResults, testParamValue))
    }
    
  }

  ngOnInit() {
    // this.media$.subscribe(mq =>{
    //   console.log(mq);
    // })

    
    this.mediaSub = this.mediaObserver.media$.subscribe((change:MediaChange) =>{
      console.log(change.mqAlias);
      console.log(change);
    })

    

    for(let tp=0; tp<this.requestInfo.RnDLabTest.TestParameters.length; tp++){
      
      if(this.requestInfo.RnDLabTest.TestParameters[tp].TestParameterStatus == "Reported" || this.requestInfo.RnDLabTest.TestParameters[tp].TestParameterStatus == "Released"){
        this.createForm();
        this.editTestParameterOnReported(this.requestInfo.RnDLabTest.TestParameters[tp]);

        this.createForm();
        this.editTestParameterOnReported(this.requestInfo.RnDLabTest.TestParameters[tp]);
      }else{ 
        // this.showReport == "NonReported";
        //this.createForm();
        // this.editTestParameter();
      }
      
    }
    
    
  }

  ngAfterViewInit(){

  }

  // ngOnDestroy(){
  //   if(this.mediaSub){
  //       this.mediaSub.unsubscribe();
  //   }
  // }

  createResultArray():FormGroup {
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

  createTestResultArray():FormGroup { 
    const testResultFields ={
      SampleID: ['SampleID'], 
      //ReferenceNo: ['ReferenceNo'],
      Results: this.formBuilder.array([
        this.createResultArray(),
        this.createResultArray()
      ])
    }
    return this.formBuilder.group(testResultFields);
  }

  addSampleFormGroup():FormGroup {
    const sampleFilds = {
      SampleID: [''],
      SampleDescription: [''],
      Appearance: [''],
      //ReferenceNo: [''],
      SampleType: [''],
      OtherSampleType: [''],
      MaterialConstruction: [''],
      SampleQuantity: [''],
      SpecificRequirement:['']
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
      Title: this.formBuilder.group({
        Title: [''],
        Method: [''],
      })
    };

    this.TestParameter = this.formBuilder.group(config);
  }



  onSubmitBtn(){
    // this.TestParameter.patchValue({
      
    //   TestParameterStatus: 'Reported',
    //       //Appearance: s.Appearance,
    //       //OtherSampleType: s.OtherSampleType,
    //       //SampleQuantity: s.SampleQuantity,
    //       //Comments: s.Comments,
    // });
    this.TestParameter.addControl('TestParameterStatus', this.formBuilder.control('Reported'));

    // this.TestParameter.addControl('ReferenceNo', this.formBuilder.control(this.requestInfo.RnDLabTest[0].Samples[r].ReferenceNo));
    // this.TestParameter.addControl('Appearance', this.formBuilder.control(this.requestInfo.RnDLabTest[0].Samples[r].Appearance));
    // this.TestParameter.addControl('OtherSampleType', this.formBuilder.control(this.requestInfo.RnDLabTest[0].Samples[r].OtherSampleType));
    // this.TestParameter.addControl('SampleQuantity', this.formBuilder.control(this.requestInfo.RnDLabTest[0].Samples[r].SampleQuantity));

    this.outputToParent.emit(this.TestParameter.value);
    console.log(this.TestParameter.controls);
    console.log(this.TestParameter.controls.TestResults.value[0].Results[0].TestResult)
  }

  addResultOnBtnClk_(i) {
    (this.TestParameter.get('TestResults') as FormGroup).addControl('Results', this.createResultArray());
    //const control = <FormArray>this.TestParameter.get('TestResults')['controls'][i].get('Results');
    //const control = <FormGroup>this.TestParameter.controls.TestResults.controls[0].controls.Results.controls;
    //console.log('addResultOnBtnClk on control: ' + control);
    //control.push(this.createResultArray());
  }

  addSampleOnClick():void {
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
      //ReferenceNo: null,
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

  onSelectItem(ev, i) {

  }

  showSmplLbl() {    
    if(this.status == "OPMToLab"){
      return true;
    }
    return false;
  }  

  showLabFlds() {    
    if(this.status != "OPMToLab"){
      return true;
    }
    return false;
  }
}





