import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-itsapplicationinfo',
  templateUrl: './itsapplicationinfo.component.html',
  styleUrls: ['./itsapplicationinfo.component.scss'],
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

//export class ItsapplicationinfoComponent implements OnInit{
  export class ItsapplicationinfoComponent implements OnInit, OnDestroy {
  private mediaSub: Subscription;

  itsreqFor:Itsrequestfor = new Itsrequestfor();
  itsrequest:FormGroup;
  RnDTest:FormGroup;
  deviceXs: boolean;

  testValye:string = "This is a test value";
  // task: ITask = {
  //   name: 'Indeterminate',
  //   completed: false,
  //   color: 'primary',
  //   subtasks: [
  //     {name: 'Primary', completed: false, color: 'primary'},
  //     {name: 'Accent', completed: false, color: 'accent'},
  //     {name: 'Warn', completed: false, color: 'warn'}
  //   ]
  // };

  // defined the array of data
  public data: string[] = ['Badminton', 'Cricket', 'Football', 'Golf', 'Hockey', 'Rugby'];
  // set placeholder to MultiSelect input element
  public placeholder: string = 'Select games';
  //set height to popup list
  public popupHeight:string = '200px';
  //set width to popup list
  public popupWidth:string = '250px';

  

  

  //===========Request For options ========  
    requestForsControl = new FormControl();
    requestForsGroups: RequestForsGroup[] = [
    {
      name: 'General',
      requestFor: [
        {value: 'IT General Support', viewValue: 'IT General Support'},
        {value: 'SharePointSupport', viewValue: 'SharePoint support'},
      ]
    },
    {
      name: 'SAP',
      requestFor: [        
        {value: 'SAPOperationalSupport', viewValue: 'SAP operational support'},
        {value: 'SAPAuthorization', viewValue: 'SAP authorization'},
        {value: 'SAPdevelopment', viewValue: 'SAP development'}
      ]
    },
    {
      name: 'Access',
      requestFor: [
        {value: 'USBAccess', viewValue: 'USB access'},
        {value: 'VPN', viewValue: 'New VPN'},
        {value: 'MobileEmailAccess', viewValue: 'Mobile email access'},
        {value: 'OfficeInternet', viewValue: 'Office internet'},
        {value: 'GuestWifi', viewValue: 'Guest Wifi'},
      ]
    },    
    {
      name: 'Others',
      requestFor: [        
        {value: 'SupportComputer', viewValue: 'Support computer'},        
        {value: 'Modem', viewValue: 'Modem'},
        {value: 'New email creation', viewValue: 'New email creation'},

      ]
    }
    ];
  //-----------options ends -------

  ReferenceMethods: string[] = ['ISO Test Method', 'ASTM Test Method', 'AATCC Test Method', 'Others'];
  SampleTypes: string[] = ['Solid', 'Liquid', 'Powder', 'Powder', 'Others'];


  sapModules: string[] = [];
  

  date = new FormControl(moment());

  //media$: Observable<MediaChange[]>;

  cb:SelectAllChecbox = new SelectAllChecbox();

  //================for multi select drop down implementation strat ======
  public ddldata = [ { "id": "Cont_AF", "name": "Africa", "children": [ { "id": "AO", "name": "Angola", "capital": "Luanda", "phone": "244", "currency": "AOA", "children": [ { "id": "BJ", "name": "Benin", "capital": "Porto-Novo", "phone": "229", "currency": "XOF" }, { "id": "BW", "name": "Botswana", "capital": "Gaborone", "phone": "267", "currency": "BWP" } ] }, { "id": "BF", "name": "Burkina Faso", "capital": "Ouagadougou", "phone": "226", "currency": "XOF", "children": [ { "id": "CD", "name": "Democratic Republic of the Congo", "capital": "Kinshasa", "phone": "243", "currency": "CDF" }, { "id": "CF", "name": "Central African Republic", "capital": "Bangui", "phone": "236", "currency": "XAF" }, { "id": "CG", "name": "Republic of the Congo", "capital": "Brazzaville", "phone": "242", "currency": "XAF" } ] }, { "id": "BI", "name": "Burundi", "capital": "Bujumbura", "phone": "257", "currency": "BIF" }, { "id": "CI", "name": "Ivory Coast", "capital": "Yamoussoukro", "phone": "225", "currency": "XOF" }, { "id": "CM", "name": "Cameroon", "capital": "Yaoundé", "phone": "237", "currency": "XAF" }, { "id": "CV", "name": "Cape Verde", "capital": "Praia", "phone": "238", "currency": "CVE" } ] }, { "id": "Cont_AN", "name": "Antarctica", "children": [ { "id": "AQ", "name": "Antarctica", "capital": "", "phone": "", "currency": "" }, { "id": "BV", "name": "Bouvet Island", "capital": "", "phone": "", "currency": "NOK" }, { "id": "GS", "name": "South Georgia and the South Sandwich Islands", "capital": "King Edward Point", "phone": "500", "currency": "GBP" }, { "id": "HM", "name": "Heard Island and McDonald Islands", "capital": "", "phone": "", "currency": "AUD" }, { "id": "TF", "name": "French Southern Territories", "capital": "Port-aux-Français", "phone": "", "currency": "EUR" } ] } ];
  items = [];
  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Type here to filter elements...';
  public MaxDisplayed = 5;
  public multipleSelected = [
    {
      id: 'CI',
      name: 'Ivory Coast',
      capital: 'Yamoussoukro',
      phone: '225',
      currency: 'XOF'
    },
    {
      id: 'CM',
      name: 'Cameroon',
      capital: 'Yaoundé',
      phone: '237',
      currency: 'XAF'
    },
  ];
  //--------------mmultiselect dropdown implementation ends ---------

  //==============for implementing ngSelect DDL strat latest 310121==============
  categories = [
    {id: 1, name: 'Laravel'},
    {id: 2, name: 'Codeigniter'},
    {id: 3, name: 'React'},
    {id: 4, name: 'PHP'},
    {id: 5, name: 'Angular'},
    {id: 6, name: 'Vue'},
    {id: 7, name: 'JQuery', disabled: true},
    {id: 8, name: 'Javascript'},
  ];
    
  selected = [
    {id: 5, name: 'Angular'},
    {id: 6, name: 'Vue'}
  ];
   
  getSelectedValue(){
    console.log(this.selected);
  }
  //--------------------ng Select ends

  constructor(
    private mediaObserver: MediaObserver, 
    private formBuilder:FormBuilder,
    private cdRef: ChangeDetectorRef
    ) {
    //this.media$ = mediaObserver.asObservable();
    // this.itsrequest = this.formBuilder.group({
    //   name: [''],
    //   price: [''],
    //   description: ['']
    // })
  }

  

  addSampleFormGroup():FormGroup {
    return this.formBuilder.group({
      ReferenceMethods: [''],
      OtherReferenceMethods: [''],
      SampleDescription: ['Here is my Description'],
      Appearance: [''],
      ReferenceNo: [''],
      SampleTypes: [''],
      OtherSampleType: [''],
      MaterialConstruction: [''],
      SampleQuantity: [''],
      SpecificRequirement:[''],
      SamplePackageCondition: [''],
      Comments: [''],
      // Samples: this.formBuilder.array([
      //   this.addSampleFormGroup()
      // ]),
    });
  }

  addTestParameterFormGroup():FormGroup{
    return this.formBuilder.group({
      // Title: [''],
      // Method: [''],
      // RnDSection: ['Here is my Description'],
      // // Respectives: this.formBuilder.array([
      // //   this.addPersonnelFormGroup()
      // // ]), 
      // ReferenceNo: [''],
      // Samples: this.formBuilder.array([
      //   this.addSampleFormGroup()
      // ]),      
      // Note: [''],
      // SamplePackageCondition: [''],
      // Comments: [''],
      // TestPeriodFrom: [''],
      // TestPeriodTo: [''],

      ReferenceMethods: [''],
      OtherReferenceMethods: [''],
      SampleDescription: ['Here is my Description'],
      Appearance: [''],
      ReferenceNo: [''],
      SampleTypes: [''],
      OtherSampleType: [''],
      MaterialConstruction: [''],
      SampleQuantity: [''],
      SpecificRequirement:[''],
      SamplePackageCondition: [''],
      Comments: [''],
    });
  }

  ngOnInit() {
    // this.media$.subscribe(mq =>{
    //   console.log(mq);
    // })
    let current: MediaChange = new MediaChange(true);
    this.mediaSub = this.mediaObserver.asObservable().subscribe((change: Array<MediaChange>) =>{
      current = change[0];
      this.deviceXs = change[0].mqAlias == "xs" ? true : false;
      console.log("Now screeen is in: "+change[0].mqAlias);
    })

    

    this.RnDTest = this.formBuilder.group({
      RequestorName: ['Mostafa Kamal'],
      Company: ['BPBL'],
      EmployeeId: ['9999'],
      Office: ['Corporate'],
      Position: ['Software Engineer'],
      Department: ['IT'],
      Email: ['kamal@bergerbd.com'],
      CostCenter: ['9000'],
      Mobile: ['01913066698'],
      RequestDate: ['Jan 28, 2021'], //addSampleFormGroup
      TestParamLists: [''],
      OtherReferenceMethod: ['As discussed'],
      // TestParameters: this.formBuilder.array([
      //   this.addTestParameterFormGroup()
      // ]),
      Samples: this.formBuilder.array([
        this.addSampleFormGroup()
      ]),
      
  })



    // this.itsrequest = new FormGroup({
    //   'RequestorName': new FormControl(''),
    //   //'RequestorEmpId': new FormControl(''),
    //   //'RequestorCompany': new FormControl(''),
    //   //'RequestorOffice': new FormControl(''),
    //   //'RequestorEmail': new FormControl(''),
    //   'ReferenceMethods': new FormControl(''),
    //   'requestFor': new FormControl(''),
    //   'Category': new FormControl(''),
    //   'expectDeliveryDate': new FormControl(''),
    //   'ExpiryDate': new FormControl(''),
    //   'expectReturnDate': new FormControl(''),
    //   'sapModule': new FormControl(''),
    //   'mobileBrandNdModel': new FormControl(''),
    //   'GuestName': new FormControl(''),
    //   'validUpTo': new FormControl(''),

      
    // })



    // this.itsrequest = this.formBuilder.group({
    //   'requestFor': [ 
    //     this.itsreqFor.requestFor,
    //     [
    //       Validators.required
    //     ]
    //   ],
    //   'Category': [ 
    //     this.itsreqFor.Category,
    //     [
    //       Validators.required
    //     ]
    //   ],
      
    //   'expectDeliveryDate': [
    //     this.itsreqFor.expectDeliveryDate
    //   ]
    //   // sapModule?: string;
    //   // SocialMedia?: string;
    //   // VideoStreaming?: string;
    //   // mobileSIMNO?: string;
    //   // issueDate?: string;
    //   // actualDeliveryDate?: string;
    //   // 
    // })

    //==========for multiselect dropdown start =======
    this.items = this.process(this.ddldata);
    //-------------multiselect DDL ends -----------
  }

  //========== for multiselect dropdown start======
  private process(data): any {
    let result = [];
    result = data.map((item) => {
      return this.toTreeNode(item);
    });
    return result;
  }

  private toTreeNode(node, parent = null) {
    console.log(node, parent);
    if (node && node.children) {
      node.children.map(item => {
        return this.toTreeNode(item, node);
      });
    }
    return node;
  }

  //-------------------for multiselect dropdown ends -------------

  ngOnDestroy(){
    if(this.mediaSub){
        this.mediaSub.unsubscribe();
    }
  }

  onRequestForSelected(){
    if (this.itsrequest.controls['requestFor'].value == "SAPOperationalSupport") {
      //============ Problem categories ================
      this.sapModules = [
        'HR', 'Production', 'SFactor', 'Salse', 'Marketing', 'RND', 'BASIS', 'Others'
      ];
      //----------- problem categry ends -----------
    }
    // console.log("this.itsrequest.controls['requestFor'].value: " + this.itsrequest.controls['requestFor'].value);
  }

  onSubmitBtn(){
    // if (!this.RnDTest.valid) {
    //   alert("One or more required field is missing...");
    //   return;
    // }
    //alert(this.itsreqFor.requestFor+ "; "+ this.itsreqFor.Category +"; "+ this.itsreqFor.expectDeliveryDate);//for template driven form
    console.log(this.RnDTest.value);//for model driven form
    //console.log(this.itsrequest.controls.RequestorName.value);
  }

  //===========for Select all checkbox start =============  
  task: ITask = {
      name: 'Select All',
      completed: false,
      color: 'primary',
      subtasks: [
        {name: 'Social Media', completed: false, color: 'primary'},
        {name: 'Video Streaming', completed: false, color: 'accent'},
      ]
  };

  allComplete: boolean = false;

  updateAllComplete() {
      this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
      if (this.task.subtasks == null) {
        return false;
      }
      return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.task.subtasks == null) {
        return;
      }
      this.task.subtasks.forEach(t => t.completed = completed);
  }
  //------------- checkbox ends -------------

  addSampleOnClick():void {
    (<FormArray>this.RnDTest.controls.Samples).push(this.addSampleFormGroup())
  }

  removeSampleOnClick(smplGrpIndx: number): void{
    (<FormArray>this.RnDTest.get('Samples')).removeAt(smplGrpIndx);
  }

  // addTestParameterOnClick():void {
  //   (<FormArray>this.RnDTest.controls.TestParameters).push(this.addTestParameterFormGroup())
  // }

  // removeTestParameterOnClick(smplGrpIndx: number): void{
  //   (<FormArray>this.RnDTest.controls.TestParameters).removeAt(smplGrpIndx);
  // }

}
