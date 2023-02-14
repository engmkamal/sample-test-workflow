import { Component, Input, Output, OnInit, VERSION, ViewEncapsulation, AfterViewInit, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormArray } from "@angular/forms";
import { from } from "rxjs";
import { SharepointworkflowService } from "src/app/shared/services/sharepointworkflow.service";
//import { TmlistitemsService } from "../../trademerchandising/tmlistitems.service";
import { data } from "../data";

import { IItem} from "src/app/shared/models/interfaces/isplist";
import { IWorkflowrequestor } from "src/app/shared/models/interfaces/iworkflowrequestor";

import pnp, { sp, Item, ItemAddResult, ItemUpdateResult } from "sp-pnp-js";
import { MatSnackBar } from '@angular/material';
//D:\Practice\BpblReactiveAngularMaterialForm\src\app\shared\models\interfaces\iworkflowrequestor.ts

@Component({
  selector: 'app-customerfeedbackst',
  templateUrl: './customerfeedbackst.component.html',
  styleUrls: ['./customerfeedbackst.component.scss', 
  '../../../../assets/css/indigo-pink.css',
  '../../../../assets/css/material.theme.scss'],
  encapsulation: ViewEncapsulation.Emulated  
})
export class CustomerfeedbackstComponent implements OnInit, AfterViewInit{

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

  //============for customer feedback ======
  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 7;
  @Input('color') public color: string = 'primary';
  @Output() private ratingUpdated = new EventEmitter();
  
  

  private snackBarDuration: number = 2000;
  public ratingArr = [];
  public infoAvailability = [];
  public serviceResponse = [];
  public repClarification = [];
  public servReliability = [];
  public presentationMode = [];

  public infoAvailabilityC = 5;
  public serviceResponseC = 5;
  public repClarificationC = 5;
  public servReliabilityC = 5;
  public presentationModeC = 5;

  // public feedback = {
  //   infoAvailabilityR : 3,
  //   serviceResponseR : 3,
  //   repClarificationR : 3,
  //   servReliabilityR : 3,
  //   presentationModeR : 3
  // }

  public infoAvaCol = 'CornflowerBlue';
  public serResCol = 'CornflowerBlue'; 
  public repClarCol = 'CornflowerBlue'; 
  public servRelCol = 'CornflowerBlue'; 
  public preModCol = 'CornflowerBlue';

  constructor(private fb: FormBuilder, public sharepointworkflowService: SharepointworkflowService, private snackBar: MatSnackBar) {
  }

  ngOnInit(){
    
    //========for customer feedback start ==========
    //console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    for (let index = 0; index < this.infoAvailabilityC; index++) {
      this.infoAvailability.push(index);
    }
    for (let index = 0; index < this.serviceResponseC; index++) {
      this.serviceResponse.push(index);
    }
    for (let index = 0; index < this.repClarificationC; index++) {
      this.repClarification.push(index);
    }
    for (let index = 0; index < this.servReliabilityC; index++) {
      this.servReliability.push(index);
    }
    for (let index = 0; index < this.presentationModeC; index++) {
      this.presentationMode.push(index);
    }

    //-----------------cfb ends -------------
    
    
    this._createForm();

    //this.reqInfo = this._form.controls.Customerfeedback.value;

    if(this.requestInfo.uId != "" && this.requestInfo.RnDLabTest.hasOwnProperty('Customerfeedback')){
      setTimeout(() => {
        this._form.controls.Customerfeedback.patchValue({          
          InfoAvailabilityR : [this.requestInfo.RnDLabTest.Customerfeedback.InfoAvailabilityR],
          ServiceResponseR : [this.requestInfo.RnDLabTest.Customerfeedback.ServiceResponseR],
          RepClarificationR : [this.requestInfo.RnDLabTest.Customerfeedback.RepClarificationR],
          ServReliabilityR : [this.requestInfo.RnDLabTest.Customerfeedback.ServReliabilityR],
          PresentationModeR : [this.requestInfo.RnDLabTest.Customerfeedback.PresentationModeR],       
          Suggestion: [this.requestInfo.RnDLabTest.Customerfeedback.Suggestion]
        });

        let infoAva = this.requestInfo.RnDLabTest.Customerfeedback.InfoAvailabilityR;
        this.infoAvaCol = infoAva>3?'green':infoAva==3?'CornflowerBlue':infoAva==2?'CornflowerBlue':infoAva<3?'SandyBrown':'green';
    
        let serRes = this.requestInfo.RnDLabTest.Customerfeedback.ServiceResponseR;
        this.serResCol = serRes>3?'green':serRes==3?'CornflowerBlue':serRes==2?'CornflowerBlue':serRes<3?'SandyBrown':'green';
    
        let repClar = this.requestInfo.RnDLabTest.Customerfeedback.RepClarificationR;
        this.repClarCol = repClar>3?'green':repClar==3?'CornflowerBlue':repClar==2?'CornflowerBlue':repClar<3?'SandyBrown':'green';
    
        let preMod = this.requestInfo.RnDLabTest.Customerfeedback.PresentationModeR;
        this.preModCol = preMod>3?'green':preMod==3?'CornflowerBlue':preMod==2?'CornflowerBlue':preMod<3?'SandyBrown':'green';
    
        let servRel = this.requestInfo.RnDLabTest.Customerfeedback.ServReliabilityR;
        this.servRelCol = servRel>3?'green':servRel==3?'CornflowerBlue':servRel==2?'CornflowerBlue':servRel<3?'SandyBrown':'green';
      }, 100);
    }

   
    
    
    // setTimeout(() => {
    //   this._addGroup();
    // }, 100);

    // setTimeout(() => {
    //   if(this.requestInfo.hasOwnProperty('RnDLabTest') && this.requestInfo.RnDLabTest.TestParameters.length > 0){
    //     this._buildFormFromData()
    //   }else{setTimeout(() => {
    //     if(this.requestInfo.hasOwnProperty('RnDLabTest') && this.requestInfo.RnDLabTest.TestParameters.length > 0){
    //       this._buildFormFromData()
    //     }else{setTimeout(() => {
    //       if(this.requestInfo.hasOwnProperty('RnDLabTest') && this.requestInfo.RnDLabTest.TestParameters.length > 0){
    //         this._buildFormFromData()
    //       }else{
    //         this._addGroup();
    //         setTimeout(() => {
    //           this._form.get('Requestor').patchValue(this.requestInfo.RnDLabTest.Requestor);
        
    //           this._form.patchValue(this.requestInfo.RnDLabTest);
    //         }, 50); 
            
    //         // return false;
    //       }
    //     }, 1000);}
    //   }, 1000);}
    // }, 1000);    
  }

  ngAfterViewInit(){   

    // let day = (this.date.getDate() < 10 ? '0' : '') + this.date.getDate(); 
    // let month = (this.date.getMonth() < 10 ? '0' : '') + (this.date.getMonth() + 1); 
    // let year = this.date.getFullYear();

    // this.labReportNo = "STR-BPBL-" + year + month + day + "-" +this.requestInfo.Title;

    // this.reportDate = document.getElementById('rDate').innerHTML; 

    // this._form.get('ReportNo').patchValue(this.labReportNo);
    // this._form.get('ReportReleaseDate').patchValue(this.reportDate);
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
      Customerfeedback: this.fb.group({ 
        InfoAvailabilityR : [3],
        ServiceResponseR : [3],
        RepClarificationR : [3],
        ServReliabilityR : [3],
        PresentationModeR : [3],       
        Suggestion: ['']
      })
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
    //this.requestInfo.RnDLabTest.ReportNo = this.labReportNo;
    this.requestInfo.RnDLabTest.Customerfeedback = this._form.controls.Customerfeedback.value;
    this.requestInfo.RnDLabTest.Customerfeedback.Suggestion = this._form.controls.Customerfeedback.value.Suggestion;
   
    //this.requestInfo.RnDLabTest.ReportReleaseDate = this.reportDate;
    //this.requestInfo.RnDLabTest.ReportNote = this._form.controls.ReportNote.value;
    
    this.outputToParent.emit(this.requestInfo);
    this.btnClickAction.emit('FeedbackSubmit');    
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

  onClick(rating:number, cat:string) {
    
    if(cat == "infoAvailability"){      
      this._form.controls.Customerfeedback.patchValue({
        InfoAvailabilityR: rating
      });
      //this._form.controls.Customerfeedback.value.InfoAvailabilityR = rating;
    }
    else if(cat == "serviceResponse"){
      this._form.controls.Customerfeedback.patchValue({
        ServiceResponseR: rating
      });
      //this._form.controls.Customerfeedback.value.ServiceResponseR = rating;
      
    }
    else if(cat == "repClarification"){
      this._form.controls.Customerfeedback.patchValue({
        RepClarificationR: rating
      });
      //this._form.controls.Customerfeedback.value.RepClarificationR = rating;
      
    }
    else if(cat == "servReliability"){
      this._form.controls.Customerfeedback.patchValue({
        ServReliabilityR: rating
      });
      //this._form.controls.Customerfeedback.value.ServReliabilityR = rating;
      //this.ratingUpdated.emit(this.feedback);
    }
    else if(cat == "presentationMode"){
      this._form.controls.Customerfeedback.patchValue({
        PresentationModeR: rating
      });
      //this._form.controls.Customerfeedback.value.PresentationModeR = rating;
      
    }
    else {
      this.ratingUpdated.emit(this._form.controls.Customerfeedback);
    }
    this.ratingUpdated.emit(this._form.controls.Customerfeedback.value);
    return false;
  }

  infoAvailabilityR(index:number) {
    if (this._form.controls.Customerfeedback.value.InfoAvailabilityR >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  serviceResponseR(index:number) {
    if (this._form.controls.Customerfeedback.value.ServiceResponseR >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  repClarificationR(index:number) {
    if (this._form.controls.Customerfeedback.value.RepClarificationR >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  servReliabilityR(index:number) {
    if (this._form.controls.Customerfeedback.value.ServReliabilityR >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  presentationModeR(index:number) {
    if (this._form.controls.Customerfeedback.value.PresentationModeR >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showFeedbackSubmit(){
    if(this.requestInfo.uId != "" && !(this.requestInfo.RnDLabTest.hasOwnProperty('Customerfeedback'))){
      return true;
    }
    return false;
  }
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}


