import { Component, OnInit } from '@angular/core';
import {  
  GlobalObjectService  
} from '../app/global-object.service';

declare const _spPageContextInfo; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export class AppComponent {
//   title = 'dashboard';
// }

export class AppComponent implements OnInit { 
  title = 'dashboard'; 
  constructor(public globalObject: GlobalObjectService) {}  
  ngOnInit() {  
      this.globalObject.sharePointPageObject.userId = 1026;  
      this.globalObject.sharePointPageObject.webAbsoluteUrl = "https://portaldv.bergerbd.com/leaveauto";  

      // this.globalObject.sharePointPageObject.userId = window.location.href.indexOf('localhost') > -1 ? yourID : _spPageContextInfo.userId;  
      // this.globalObject.sharePointPageObject.webAbsoluteUrl = window.location.href.indexOf('localhost') > -1 ? '/sites/yoursiteurl' : _spPageContextInfo.webAbsoluteUrl;  
  }  
} 
