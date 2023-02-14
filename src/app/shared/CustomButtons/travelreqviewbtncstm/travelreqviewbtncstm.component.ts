import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travelreqviewbtncstm',
  templateUrl: './travelreqviewbtncstm.component.html',
  styleUrls: ['./travelreqviewbtncstm.component.scss']
})
export class TravelreqviewbtncstmComponent implements OnInit {
  data:any;
  wfName:any;
  public params: any;
  public Url: string;
  public rText: string;

  constructor() { }

  ngOnInit() {
    //this.wfName = "TravelRequest";
  }

  agInit(params){
    if(params.data.__metadata.type == "SP.Data.TravelRequestsListItem"){
      this.wfName = "TravelRequest";
      if(params.colDef.headerName == "View/Action"){
        this.rText = "View/Raise Reimbursement";
        if(params.data.Status == "OPMApproved"){
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
        }else{
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
        }
      }
      else if(params.colDef.headerName == "Reimbursement"){
        this.rText = "Raise Request";
        if(params.data.Status == "OPMApproved"){
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
        }
      }
    }
    else if(params.data.__metadata.type == "SP.Data.MobileHandsetRequestsListItem"){
      this.wfName = "MobileHandsetRequests";
      if(params.colDef.headerName == "View/Action"){
        this.rText = "View/Raise Reimbursement";
        if(params.data.Status == "OPMApproved"){
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
        }else{
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
        }
      }
    }
    else if(params.data.__metadata.type == "SP.Data.EmployeeAdvanceRequestsListItem"){
      this.wfName = "EmployeeAdvanceRequest";
      if(params.colDef.headerName == "View/Action"){
        this.rText = "View/Raise Reimbursement";
        if(params.data.Status == "OPMApproved"){
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
        }else{
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
        }
      }
    }
    else if(params.data.__metadata.type == "SP.Data.EmpPaintDiscountRequestListItem"){
      this.wfName = "EmployeePaintDiscount";
      if(params.colDef.headerName == "View/Action"){
        this.rText = "View/Raise Reimbursement";
        if(params.data.Status == "OPMApproved"){
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
        }else{
          this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
        }
      }
    }    

    this.data = params.value;

    if(params.colDef.headerName == "View/Action"){
      this.rText = "View/Raise Reimbursement";
      //this.Url = "https://portaldv.bergerbd.com/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
      if(params.data.Status == "OPMApproved"){
        this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID;
      }else{
        this.Url = window.location.origin + "/leaveauto/SitePages/" +this.wfName+ ".aspx?UniqueId=" + params.data.GUID+ "&mode=read";
      }
    }
    
  }
  
  viewFullAplication(item) {
    //alert("the items are: "+item);
    //var Url = ""; 
    //=========for production environment =========
    //Url = window.location.origin + "/leaveauto/SitePages/"+this.wfName+".aspx?UniqueId=" + item + "&mode=read";   
    //========for localhost dev environment ==
    //Url = "https://portaldv.bergerbd.com/leaveauto/SitePages/"+this.wfName+".aspx?UniqueId=" + item;
    
    var Title = "Request Details";
    window.open(this.Url, '_blank').focus();
    //this.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }

}
