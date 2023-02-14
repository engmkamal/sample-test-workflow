import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-li-action-btn-cstm',
  templateUrl: './li-action-btn-cstm.component.html',
  styleUrls: ['./li-action-btn-cstm.component.scss']
})
export class LiActionBtnCstmComponent implements OnInit {
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
    //Url = _spPageContextInfo.webAbsoluteUrl + SupplementaryBudgetExpenseURL + "?UniqueId=" + item.GUID + "&mode=read";
    //Url = "https://portaldv.bergerbd.com/leaveauto/SitePages/SupBudgetExpenseDashboard.aspx";
    //alert("Argument value: "+item);
    //alert("Argument ID: "+item);
    
    Url = window.location.origin + "/_layouts/15/ShopSignboard/RequestPage.aspx?Id=" + item;
    var Title = "Request Details";
    window.open(Url, '_blank').focus();
    //this.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }

}
