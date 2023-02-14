import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tmliviewbtncstm',
  templateUrl: './tmliviewbtncstm.component.html',
  styleUrls: ['./tmliviewbtncstm.component.scss']
})
export class TmliviewbtncstmComponent implements OnInit {

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
    //========= activate for prod environment =====
    Url = window.location.origin + "/_layouts/15/ShopSignboard/RequestPage.aspx?Id=" + item;
    //=========activate for dev environment =====
    //Url = "https://portal.bergerbd.com/_layouts/15/ShopSignboard/RequestPage.aspx?Id=" + item;
    var Title = "Request Details";
    window.open(Url, '_blank').focus();
  }

}
