import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crdiscountvwbtncstm',
  templateUrl: './crdiscountvwbtncstm.component.html',
  styleUrls: ['./crdiscountvwbtncstm.component.scss']
})
export class CrdiscountvwbtncstmComponent implements OnInit {

  data:any;
  wfName:any;

  constructor() { }

  ngOnInit() {
    this.wfName = "creditDiscountApproval";
  }

  agInit(params){
    this.data = params.value;
  }
  
  viewFullAplication(item) {
    //alert("the items are: "+item);
    var Url = ""; 
    //=========for production environment =========
    Url = window.location.origin + "/leaveauto/SitePages/"+this.wfName+".aspx?creditID=" + item;   
    //========for localhost dev environment ==
    //Url = "https://portaldv.bergerbd.com/leaveauto/SitePages/"+this.wfName+".aspx?creditID=" + item;
    
    var Title = "Request Details";
    window.open(Url, '_blank').focus();
    //this.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }

}
