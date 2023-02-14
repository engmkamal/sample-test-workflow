import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, ViewContainerRef } from '@angular/core';
//import { PlaceholderDirective } from '../../Placeholder.directive';

export interface AdComponent {
  data?: any;
}

@Component({
  selector: 'app-myprocessviewbtncstm',
  templateUrl: './myprocessviewbtncstm.component.html',
  styleUrls: ['./myprocessviewbtncstm.component.scss']
})
export class MyprocessviewbtncstmComponent implements OnInit {
  // data:any;
  // wfName:any;

  // public params: any;
  // private Url: string;

  //private domain = "https://portal.bergerbd.com";
  public domain = window.location.origin;

  public data:any;
  public wfName:any;
  //private params: any;
  public Url: string;
  public rText: string;

  public DelUrl: string;
  public rDelText: string;
  
 // @ViewChild(PlaceholderDirective, {static: true, read: PlaceholderDirective}) adHost: PlaceholderDirective;
  
  constructor(
    //private componentFactoryResolver?: ComponentFactoryResolver,
    //public viewContainerRef?: ViewContainerRef
    ) {}

  ngOnInit() {      
  }

  // agInit(params: any): void {
  //   this.params = params;
  // }

  // loadComponent() {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PlaceholderDirective);

  //   //const viewContainerRef = 
  //   //this.adHost.viewContainerRef.clear();
    

  //   //const componentRef = 
  //   this.adHost.viewContainerRef.createComponent(componentFactory);
  //   //componentRef.instance.
  // }

  // agInit(params){
  //   this.data = params.value;
  // }

  // viewFullAplication(item) {
  //   var Url = "";

  //   //=========for production environment =========
  //   Url = item;   
  //   //========for localhost dev environment ==
  //   //Url = "https://portaldv.bergerbd.com/leaveauto/SitePages/ChangeManagement.aspx?UniqueId=" + item + "&mode=read";
    
  //   var Title = "Request Details";
  //   window.open(Url, '_blank').focus();
  //   //this.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  // }


  agInit(params){
    //===========
    switch(params.data.__metadata.type) { 
      case "SP.Data.ReimburseMasterListItem": { 
        this.wfName = "EmployeeReimbursement";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.ITAssetManagementListItem": { 
        this.wfName = "ITAssetManagement"; 
        //this.wfName = "ITServiceRequest_copy(1)"; 
        if(params.colDef.headerName == "View/Action"){
          this.rText = "Update";          
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          
          this.rDelText = "Delete";
          this.DelUrl = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.ID;
        }; 
        break; 
      }
      case "SP.Data.AssetDisposalInfoListItem": { 
        this.wfName = "AssetDisposalProcess";
        if(params.colDef.headerName == "View/Action" || params.colDef.headerName == "RequestID"){
          this.rText = params.data.RequestId;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.BOECheckPaymentProcessInfoListItem": { 
        this.wfName = "BOECheckPaymentProcess";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.RequestId;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.CreditDiscountApprovalMainListItem": { 
        this.wfName = "creditDiscountApproval";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?creditID=" + params.data.ID;                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?creditID=" + params.data.ID;                  
        }; 
        break; 
      }
      case "SP.Data.ChangeItemsListItem": { 
        this.wfName = "ChangeManagement";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.EmployeeAdvanceRequestsListItem": {
        this.wfName = "EmployeeAdvanceRequest";
        if(params.colDef.headerName == "View/Action"){        
          if(params.data.Status == "OPMApproved" || params.data.Status == "MDApproved" || params.data.Status == "ReimbursementSaved"|| params.data.Status == "CashOfficerProcessed"){
            this.rText = "View/Raise Reimbursement";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          }else{
            this.rText = "View";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
          }
        }
        else if(params.colDef.headerName == "RequestID"){        
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
        }; 
        break;    
      }
      case "SP.Data.EmpPaintDiscountRequestListItem": { 
        this.wfName = "EmployeePaintDiscount";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.FBPTrackerInfoListItem": { //FBPTrackerInfo//FBPTrackerProcess
        this.wfName = "FBPTrackerProcess";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.RequestId;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.FixedAssetAcquisitionInfoListItem": { 
        this.wfName = "FixedAssetAcquisition";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.RequestId;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.FreeFGRequestsListItem": { 
        this.wfName = "FreeFGIssue";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.FundRequestFromFieldInfoListListItem": { 
        this.wfName = "FundRequestFromField";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.RequestId;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.HRServicesListItem": { 
        this.wfName = "HRServices";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      // case "SP.Data.ITAssetManagementListItem": { 
      //   this.wfName = "ITAssetManagement";
      //   if(params.colDef.headerName == "RequestID"){
      //     this.rText = params.data.Title;
      //     this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
      //   }
      //   else if(params.colDef.headerName == "View/Action"){
      //     this.rText = "View";
      //     this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
      //   }; 
      //   break; 
      // }
      case "SP.Data.ITServiceRequestsListItem": { 
        this.wfName = "ITServiceRequest";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.ManpowerRequisitionInfoListItem": { 
        this.wfName = "ManpowerRequisition";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.RequestId;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.MobileHandsetRequestsListItem": { 
        this.wfName = "MobileHandsetRequests";
        if(params.colDef.headerName == "View/Action"){
          
          if(params.data.Status == "OPMApproved" || params.data.Status == "MDApproved" || params.data.Status == "ReimbursementSaved"|| params.data.Status == "CashOfficerProcessed"){
            this.rText = "View/Raise Reimbursement";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          }else{
            this.rText = "View";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
          }
        }
        else if(params.colDef.headerName == "RequestID"){
          
          if(params.data.Status == "OPMApproved" || params.data.Status == "MDApproved" || params.data.Status == "ReimbursementSaved"|| params.data.Status == "CashOfficerProcessed"){
            this.rText = params.data.Title;
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          }else{
            this.rText = params.data.Title;
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
          }
        }; 
        break; 
      }
      case "SP.Data.PoolCarRequisitionInfoListItem": { 
        this.wfName = "PoolCarRequisition";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.ProvisionForExpensesInfoListListItem": { 
        this.wfName = "ProvisionForExpenses";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.RequestId;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }      
      case "SP.Data.SecurityIncidenceListItem": { 
        this.wfName = "SecurityIncidence";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.SupplementaryBudgetRequestListItem": {   
        this.wfName = "SupplementaryBudgetRequest";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.SupplementaryBudgetFormListItem": { 
        this.wfName = "SupplementaryBudgetRequest";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.SupplementaryBudgetExpenseListItem": { 
        this.wfName = "SupplementaryBudgetExpense";
        if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }
        else if(params.colDef.headerName == "View/Action"){
          this.rText = "View";
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";                  
        }; 
        break; 
      }
      case "SP.Data.TravelRequestsListItem": { 
        this.wfName = "TravelRequest";
        if(params.colDef.headerName == "View/Action"){        
          if(params.data.Status == "OPMApproved" || params.data.Status == "MDApproved" || params.data.Status == "ReimbursementSaved"|| params.data.Status == "CashOfficerProcessed"){
            this.rText = "View/Raise Reimbursement";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          }else{
            this.rText = "View";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
          }
        }
        else if(params.colDef.headerName == "RequestID"){          
          if(params.data.Status == "OPMApproved" || params.data.Status == "MDApproved" || params.data.Status == "ReimbursementSaved"|| params.data.Status == "CashOfficerProcessed"){
            this.rText = params.data.Title;
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          }else{
            this.rText = params.data.Title;
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
          }
        }; 
        break; 
      }
      case "SP.Data.VendorComplainListItem": { 
        this.wfName = "VendorComplaint";
        if(params.colDef.headerName == "View/Action"){        
          if(params.data.Status == "OPMApproved" || params.data.Status == "MDApproved" || params.data.Status == "ReimbursementSaved"|| params.data.Status == "CashOfficerProcessed"){
            this.rText = "View/Raise Reimbursement";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          }else{
            this.rText = "View";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
          }
        }
        else if(params.colDef.headerName == "RequestID"){
          this.rText = params.data.Title;
          this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
        }; 
        break; 
      } 
      case "SP.Data.WorkshopProposalMasterListItem": { 
        this.wfName = "WorkshopProposal";
        if(params.colDef.headerName == "View/Action"){        
          if(params.data.Status == "ProposalApproved&ActualBillSubmissionRequest"){
            this.rText = "View/Raise Reimbursement";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          }else{
            this.rText = "View";
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
          }
        }
        else if(params.colDef.headerName == "RequestID"){        
          if(params.data.Status == "ProposalApproved&ActualBillSubmissionRequest"){
            this.rText = params.data.Title;
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
          }else{
            this.rText = params.data.Title;
            this.Url = this.domain + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
          }
        }; 
        break; 
      } 
       
      
       
    }
    //-----------

    this.data = params.value;    
  }
  
  viewFullAplication(item) {  
    var Title = "Request Details";
    window.open(this.Url, '_blank').focus();
  }

  deleteRowItem(data){
    var Title = "Request Details";
    window.open(this.Url, '_blank').focus();
  }

}
