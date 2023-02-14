
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, VERSION, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormArray } from "@angular/forms";
import { from } from "rxjs";
import { SharepointworkflowService } from "src/app/shared/services/sharepointworkflow.service";
//import { TmlistitemsService } from "../../trademerchandising/tmlistitems.service";
import { data } from "../data";

import { IItem} from "src/app/shared/models/interfaces/isplist";
import { IWorkflowrequestor } from "src/app/shared/models/interfaces/iworkflowrequestor";

import pnp, { sp, Item, ItemAddResult, ItemUpdateResult } from "sp-pnp-js";



@Component({
  selector: 'app-sampletestreq',
  templateUrl: './sampletestreq.component.html',
  styleUrls: [
    './sampletestreq.component.scss',
    // '../../../../assets/css/indigo-pink.css',
    // '../../../../assets/css/ng-select.component.scss',
    // '../../../../assets/css/material.theme.scss',
],

  //: ViewEncapsulation.None,
  encapsulation: ViewEncapsulation.Emulated
})
export class SampletestreqComponent implements OnInit, AfterViewInit{

  @Input() 
  public requestInfo: any;

  _form: FormGroup;

  _data = data;

  public logedInUser = {
    aDId: "",
    name: "",
    email: "",
    empID: "",
    office: "",
    access: "",
    //GetRecordsApiUrl:"",
  };

  public listInfo = {
    name: "",
    select: "",
    expand: "",
    filterBy: "",
    top: null    
  };

  // requestorsInfo: any={
  //   EmployeeName: 'Eng Kamal',
  //   Company: 'BPBL',
  //   EmployeeId: '9999',
  //   OfficeLocation: 'Corporate',
  //   Designation: 'Software Engineer',
  //   Department: 'IT',
  //   Email: 'kamal@bergerbd.com',
  //   CostCenter: '9000756',
  //   Mobile: '01913066698',
  //   RequestDate: ''
  // };
  requestorsInfo: IWorkflowrequestor ={};

  data5 = [];

  data2 = {
    TestParameters: [
      {
        Samples: [
          { 
            SampleID: "SampleID",
            SampleDescription: "Sample Description",
            Appearance: "Appearance",
            ReferenceNo: "ReferenceNo",
            SampleType: "SampleType",
            MaterialConstruction: "Material Construction",
            SampleQuantity: "Sample Quantity",
            SpecificRequirement: "Specific Requirement"
          }
        ]
      }
    ]
  };

  @Output() outputToParent = new EventEmitter<any>();

  @Output() btnClickAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, public sharepointworkflowService: SharepointworkflowService) {
  }

  ngOnInit(){
    
    this._createForm();
    
    setTimeout(() => {
      this._addGroup();
    }, 100);

    
    //===== for portaldv and or portal =====
    this.listInfo.name = "BergerEmployeeInformation";
    this.listInfo.select = 'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
    this.listInfo.expand = 'Email'+","+'OptManagerEmail';
    this.listInfo.filterBy = 'Email/ID';
    this.listInfo.top = '100000';

    this.sharepointworkflowService.getSPLoggedInUser().then((res)=> {
     
      from(
        this.sharepointworkflowService.getItemsWithFilterExpand(this.listInfo, res)
        ).subscribe(
          (res) =>{ 
                
                let requestorsInfoData ={
                  EmployeeName: res[0].EmployeeName,
                  Company: res[0].Company,
                  EmployeeId: res[0].EmployeeId,
                  OfficeLocation: res[0].OfficeLocation,
                  Designation: res[0].Designation,
                  Department: res[0].Department,
                  Email: res[0].Email.EMail,
                  CostCenter: res[0].CostCenter,
                  Mobile: res[0].Mobile,
                  RequestDate: new Date().toString().substring(4, 15)
                };

                this._form.get('Requestor').patchValue(requestorsInfoData);

                this.requestorsInfo = requestorsInfoData;
                this.requestorsInfo.OPMADId = res[0].OptManagerEmail.ID;
                this.requestorsInfo.OPMEmployeeId = null;
                this.requestorsInfo.OPMName = res[0].OptManagerEmail.Title;
                //this.requestorsInfo.OptManagerEmail = res[0].OptManagerEmail.Title;

                //console.log("RequestorsInfo: "+ JSON.stringify(requestorsInfoData))
          },    
          (err) => {
              console.log(err)
          },
        ); 
      
     
    });
    
  }



  ngAfterViewInit(){}

  _buildFormFromData() {
    if (this.data2.TestParameters.length) {
      this._addGroup();
    }

    setTimeout(() => {
      this._form.patchValue(this.data2);
    }, 50);     
    
  }

  _addGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        TestParameters: []
      })
    );
  }

  _delete(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  get _groupsFormArray(): FormArray {
    return this._form.get("TestParameters") as FormArray;
  }

  private _createForm() {
    this._form = this.fb.group({
        TestParameters: this.fb.array([])
    });
  }

  approverAction(action){
    this.outputToParent.emit(this._form.value);
    this.btnClickAction.emit(action);    
  }

  onSubmitBtn(){
    (document.getElementById('btnSubmitNewReq') as HTMLInputElement).disabled = true;
    setTimeout(function () {
      document.getElementById('btnSubmitNewReq').style.display = 'none';
    }, 1000);
    // let approvalLink = "";

    // let labResponsibles=[];

    // for(let i = 0; i<this._form.value.TestParameters.length; i++){
    //   for(let j = 0; j<this._form.value.TestParameters[i].Title.Respectives.length; j++){
    //     labResponsibles.push(Number(this._form.value.TestParameters[i].Title.Respectives[j].RAdId))
    //   }
    // }
    

    // let itemData = {
    //   Status: "Submitted",
    //   RnDLabTest: JSON.stringify(this._form.value),
    //   PendingWithId: {
    //     'results': labResponsibles
    //   },
    // }
    // let listInfo ={
    //   name: "RnDLabTestMaster",
    //   item: itemData
    // }
    
    // this.sharepointworkflowService.saveListItem(listInfo)
    //   .then(
    //     (res) =>{

    //       for(let i = 0; i<this._form.value.TestParameters.length; i++){
    //         for(let j = 0; j<this._form.value.TestParameters[i].Samples.length; j++){
    //           this._form.value.TestParameters[i].Samples[j].SampleID = 
    //           this._form.value.TestParameters[i].Title.RnDSection
    //           + '-'
    //           + this._form.value.TestParameters[i].Title.Code
    //           + '-'
    //           + (1+j)
    //           + '-ST-'
    //           + res.ID;
    //         }
    //       }

    //       let itemData = {
    //         Title: "ST-" + res.ID,
    //         RnDLabTest: JSON.stringify(this._form.value),
    //         PendingWithId: {
    //           'results': labResponsibles
    //         },
    //       }
    //       let listInfo ={
    //         name: "RnDLabTestMaster",
    //         rId: res.ID,
    //         item: itemData
    //       }


    //       this.sharepointworkflowService.updateListItem(listInfo);

          
    //       approvalLink = 'https://portaldv.bergerbd.com/leaveauto/SitePages/SampleTest.aspx?UniqueId=' + res.GUID ;

    //       let pendingApprovalItemData = {
    //         Title: "ST-" + res.ID,
    //         ProcessName: "SampleTest",
    //         RequestedByName: this._form.value.Requestor.EmployeeName,
    //         Status: "Submitted",
    //         EmployeeID: this._form.value.Requestor.EmployeeId,
    //         RequestedByEmail: this._form.value.Requestor.Email,
    //         PendingWithId: {
    //           'results': labResponsibles
    //         },
    //         RequestLink: approvalLink
    //       };

    //       let pendingApprovalListInfo ={
    //         name: "PendingApproval",
    //         item: pendingApprovalItemData
    //       };
          
    //       this.sharepointworkflowService.saveListItem(pendingApprovalListInfo)
    //       .then(
    //         (res) =>{
    //         })

         
    //     }
    //   );
    

    

    // setTimeout(function() {      
    //   window.location.href= 'https://portaldv.bergerbd.com/leaveauto/SitePages/MyWFRequest.aspx';
    // }, 4000);
  }

  //=============get employee info===============
  async getEmpInfo(empADId){
    //===== for portaldv and or portal =====
    this.listInfo.name = "BergerEmployeeInformation";
    this.listInfo.select = 'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
    this.listInfo.expand = 'Email'+","+'OptManagerEmail';
    this.listInfo.filterBy = 'Email/ID';
    this.listInfo.top = '100000';
    
    let requestorsInfoData;
    
    from(
      this.sharepointworkflowService.getItemsWithFilterExpand(this.listInfo, empADId)
        ).subscribe(
          (res) =>{ 
                
                requestorsInfoData ={
                  EmployeeName: res[0].EmployeeName,
                  Company: res[0].Company,
                  EmployeeId: res[0].EmployeeId,
                  OfficeLocation: res[0].OfficeLocation,
                  Designation: res[0].Designation,
                  Department: res[0].Department,
                  Email: res[0].Email.EMail,
                  CostCenter: res[0].CostCenter,
                  Mobile: res[0].Mobile,
                  OpmEmail: res[0].OptManagerEmail,
                  OpmADId: res[0].OptManagerEmail.ID,
                  OpmName: res[0].OptManagerEmail.Title,
                  RequestDate: new Date().toString().substring(4, 15)
                };
            
          },    
          (err) => {
              console.log(err)
          },
        ); 
   
  }

  
}

