import { Component, Input, Output, OnInit, VERSION, ViewEncapsulation, AfterViewInit, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormArray } from "@angular/forms";
import { from } from "rxjs";
import { SharepointworkflowService } from "src/app/shared/services/sharepointworkflow.service";
//import { TmlistitemsService } from "../../trademerchandising/tmlistitems.service";
import { data } from "../data";

import { IItem} from "src/app/shared/models/interfaces/isplist";
import { IWorkflowrequestor } from "src/app/shared/models/interfaces/iworkflowrequestor";

import pnp, { sp, Item, ItemAddResult, ItemUpdateResult } from "sp-pnp-js";

//D:\Practice\BpblReactiveAngularMaterialForm\src\app\shared\models\interfaces\iworkflowrequestor.ts

@Component({
  selector: 'app-sampletestreport',
  templateUrl: './sampletestreport.component.html',
  styleUrls: ['./sampletestreport.component.scss',
  '../../../../assets/css/indigo-pink.css',
  '../../../../assets/css/material.theme.scss',
],

  //: ViewEncapsulation.None,
  encapsulation: ViewEncapsulation.Emulated
})
export class SampletestreportComponent implements OnInit, AfterViewInit{

  @Input() requestInfo: any;
  
  _form: FormGroup;

  _data = data;

  _testParameters = [];

  

  data5 = [];

  domain = "https://portal.bergerbd.com";

  

  // data2 = {
  //   TestParameters: [
  //     {
  //       Samples: [
  //         { 
  //           SampleID: "SampleID",
  //           SampleDescription: "SampleDescription",
  //           Appearance: "Appearance",
  //           ReferenceNo: "ReferenceNo",
  //           SampleType: "SampleType",
  //           MaterialConstruction: "MaterialConstruction",
  //           SampleQuantity: "SampleQuantity",
  //           SpecificRequirement: "SpecificRequirement"
  //         }
  //       ]
  //     }
  //   ]
  // };

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
    filterWith: "",
    top: null    
  };



  requestorsInfo: IWorkflowrequestor ={};

  Status = 'Reported';

  @Output() outputToParent = new EventEmitter<any>();

  @Output() btnClickAction: EventEmitter<any> = new EventEmitter<any>();

  date = new Date();
  labReportNo = "";
  reportDate;

  constructor(private fb: FormBuilder, public sharepointworkflowService: SharepointworkflowService) {
  }

  ngOnInit(){

    
    
    this._createForm();
    
    // setTimeout(() => {
    //   this._addGroup();
    // }, 100);

    setTimeout(() => {
      if(this.requestInfo.hasOwnProperty('RnDLabTest') && this.requestInfo.RnDLabTest.TestParameters.length > 0){
        this._buildFormFromData()
      }else{setTimeout(() => {
        if(this.requestInfo.hasOwnProperty('RnDLabTest') && this.requestInfo.RnDLabTest.TestParameters.length > 0){
          this._buildFormFromData()
        }else{setTimeout(() => {
          if(this.requestInfo.hasOwnProperty('RnDLabTest') && this.requestInfo.RnDLabTest.TestParameters.length > 0){
            this._buildFormFromData()
          }else{
            this._addGroup();
            setTimeout(() => {
              this._form.get('Requestor').patchValue(this.requestInfo.RnDLabTest.Requestor);
        
              this._form.patchValue(this.requestInfo.RnDLabTest);
            }, 50); 
            
            // return false;
          }
        }, 1000);}
      }, 1000);}
    }, 1000);    
  }

  ngAfterViewInit(){   

    let day = (this.date.getDate() < 10 ? '0' : '') + this.date.getDate(); 
    let month = (this.date.getMonth() < 10 ? '0' : '') + (this.date.getMonth() + 1); 
    let year = this.date.getFullYear();

    this.labReportNo = "STR-BPBL-" + year + month + day + "-" +this.requestInfo.Title;

    this.reportDate = document.getElementById('rDate').innerHTML; 

    this._form.get('ReportNo').patchValue(this.labReportNo);
    this._form.get('ReportReleaseDate').patchValue(this.reportDate);
  }



  get _groupsFormArray(): FormArray {
    return this._form.get("TestParameters") as FormArray;
  }



  _buildFormFromData() {
    if (this.requestInfo.RnDLabTest.TestParameters.length) {
      for(let p =0; p<this.requestInfo.RnDLabTest.TestParameters.length; p++){
        this._addGroup();
      }
      
    }

    setTimeout(() => {
      this._form.get('Requestor').patchValue(this.requestInfo.RnDLabTest.Requestor);

      this._form.patchValue(this.requestInfo.RnDLabTest);
    }, 50);     
    
  }

  _addGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        ReportNo: [''],  
        ReportNote: [''],
        ReportReleaseDate: [''], 
        TestParameters: []
      })
    );
  }

  

  _delete(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  

  private _createForm() {
    this._form = this.fb.group({ 
        ReportNo: [''], 
        ReportNote: [''],
        ReportReleaseDate: [''],       
        TestParameters: this.fb.array([])
    });
  }

  updateInPendingApvrList(itemData) {
    this.listInfo.name = "PendingApproval";
    this.listInfo.select = 'ID' + "," + 'Title';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    this.listInfo.filterBy = 'Title';
    this.listInfo.filterWith = this.requestInfo.Title;
    this.listInfo.top = '1';
    
    from(
      this.sharepointworkflowService.getFilteredItemsWithoutExpand(this.listInfo)
      ).subscribe(
        (res) =>{
          let listInfo = {
            name: "PendingApproval",
            rId: res[0].ID,
            item: itemData
          }    
          this.sharepointworkflowService.updateListItem(listInfo);
         }
      )
  }

  approverAction(action){
    this.requestInfo.RnDLabTest.ReportNo = this.labReportNo;
    this.requestInfo.RnDLabTest.ReportReleaseDate = this.reportDate;
    this.requestInfo.RnDLabTest.ReportNote = this._form.controls.ReportNote.value;

    this.outputToParent.emit(this.requestInfo);
    this.btnClickAction.emit('Completed');    
  }

  onSubmitBtn(){
    
    // let myoutput = this.requestInfo;
    
    // let _status = 'Completed';

    // let _pendingWith = [];

    // let _itemData;

    // _itemData = {
    //   //RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),
    //   PendingWithId: {
    //     'results': _pendingWith
    //   },
    //   Status: _status
    // }
    
    // //======= update PendingApprovalList start=======
    // let item = {
    //   Status: _status,
    //   PendingWithId: {
    //     'results': _pendingWith
    //   },
    // }
    // this.updateInPendingApvrList(item);
    // //-----------update PendingApprovalList ends -----

    // let listInfo ={
    //   name: "RnDLabTestMaster",
    //   rId: this.requestInfo.ID,
    //   item: _itemData
    // }


    // this.sharepointworkflowService.updateListItem(listInfo);

   

    // setTimeout(function() {      
    //   window.location.href= 'https://portaldv.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
    // }, 4000);

    
  }
}
