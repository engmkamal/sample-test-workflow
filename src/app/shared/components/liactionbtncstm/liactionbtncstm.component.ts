import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liactionbtncstm',
  templateUrl: './liactionbtncstm.component.html',
  styleUrls: ['./liactionbtncstm.component.scss']
})
export class LiactionbtncstmComponent implements OnInit {
  data:any;
  public webAbsoluteUrl = window.location.origin + "/leaveauto";
  constructor() { }

  ngOnInit() {
  }

  agInit(params){
    this.data = params.value;
  }
  viewFullAplication(item) {
    var Url = ""; 
    //=========for production environment =========
    Url = window.location.origin + "/leaveauto/SitePages/ChangeManagement.aspx?UniqueId=" + item + "&mode=read";   
    //========for localhost dev environment ==
    //Url = "https://portaldv.bergerbd.com/leaveauto/SitePages/ChangeManagement.aspx?UniqueId=" + item + "&mode=read";
    
    var Title = "Request Details";
    window.open(Url, '_blank').focus();
    //this.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }

}
