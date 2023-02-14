import { 
  Component, 
  OnInit, 
  ViewChild,
  AfterViewInit} from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
//========to covert promise to observer======
import {
  //forkJoin,
  //of,
  from,
  //observable, 
  //Observable, 
  //Subject,
  //pipe
} from 'rxjs';
import { filter, map} from 'rxjs/operators';

import { Tablegrid } from 'src/app/shared/models/classes/tablegrid';
//==========import view btn cstm component ==========
import {
  MyprocessviewbtncstmComponent
} from '../../../shared/components/myprocessviewbtncstm/myprocessviewbtncstm.component';
//===========for date formate ======
import * as moment from 'moment';
//---------date formate ends ---
import { SharepointlistService } from 'src/app/shared/services/sharepointlist.service';
// import { Pipe } from '@angular/core';
// import { groupBy, tap, mergeMap, reduce, map } from 'rxjs/operators';
// import { GroupedObservable } from 'rxjs/internal/operators/groupBy';
// import { IValueItems, IMyProcessItems } from 'src/app/list-interface';
import { LiactionbtncstmComponent } from 'src/app/shared/components/liactionbtncstm/liactionbtncstm.component';
//import { ReimbursementvwbtncstmComponent } from 'src/app/shared/CustomButtons/reimbursementvwbtncstm/reimbursementvwbtncstm.component';
// import * as shareddata from '../shared/localfiles/processwiserecords.json';
// import * as testdata from '../../app/data.json';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';


import { HttpClient } from '@angular/common/http';
//=========for voice recognition ===========
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
const configKey = makeStateKey('CONFIG');
//------------
//import { IReimbursementList, IReimburselist } from '../../../shared/models/interfaces/isplist';

declare var webkitSpeechRecognition: any; // for voice recognition


@Component({
  selector: 'app-reimbursementmstr',
  templateUrl: './reimbursementmstr.component.html',
  styleUrls: ['./reimbursementmstr.component.scss']
})
export class ReimbursementmstrComponent implements OnInit, AfterViewInit { 
  public rowDataCM: string;
  public rowDataWP: any;
  mpTG = new Tablegrid(); 
  //allMpTg = new Tablegrid();  
  public workflows = [];
  rowData: any;
  //public allGroups: Array<WorkflowGroup>;
  //public allWF: Array<IMyProcessItems>;
  public txtOfQuickSearchInpFld;
  public rowHeight;

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
    query: "",
    expand: "",
    select: "",
    filter: "",
    top: 100,   
  };

  //=========for infinite scrolling and lazy loading start=========
  public rowBuffer;
  public rowSelection;
  public rowModelType;
  public paginationPageSize;
  public cacheOverflowSize;
  public maxConcurrentDatasourceRequests;
  public infiniteInitialRowCount;
  public maxBlocksInCache;
  //public modules: Module[] = [InfiniteRowModelModule];
  public modules: any[] = [InfiniteRowModelModule];
  public components;
  //-----------for infinite scrolling and lazy loading ends----

  private onGridReadyParamsApi;

  private roll = 110250;

  //=========for voice recognition ===
  @ViewChild('gSearch') formSearch;
  @ViewChild('searchKey') hiddenSearchHandler;

  @ViewChild('filterTextBox') filterTextBox;
  
  constructor(
    private sharepointlistService:SharepointlistService, 
    private http: HttpClient) { 
    
    //========for my Prcess =========
    this.mpTG.columnDefs = myProcessColDef;
    
    //this.allMpTg.columnDefs = myProcessAllColDef;
    //-----------------ends --------
    //============for change Management start========
    this.mpTG.defaultColDef = {
      flex: 1,
      minWidth: 50,
      resizable: true, //to resize; add resizable: false to any individual column to disable resizingng that col only
      enableValue: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      filter: true,
      //editable: true,
    };

     //===========for action btn link rendering start ===
    this.mpTG.frameworkComponents = {
      customizedAgeCell: LiactionbtncstmComponent,
      //customizedAgeCell: MyprocessviewbtncstmComponent, 
    }
    //--------for action btn link rendering start -------
    this.mpTG.rowGroupPanelShow = 'always';

    //=========for setting features on every subgroup items start=======
    this.mpTG.autoGroupColumnDef = {
      headerName: 'Group',
      field: 'RequestStatus',
      minWidth: 30,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        //  checkbox: true
      },
    };
    //------------ subitem fetures ends -----------
    this.rowHeight = 20;   
   
    this.components = {
      loadingRenderer: function (params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return "<img src=\"https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/images/loading.gif\">";
        }
      },
    };
    
    // //=========== uncomment for activating data loading on infinite scrolling start=========
    // this.rowBuffer = 0;
    // //this.rowSelection = 'multiple';
    // this.rowModelType = 'infinite';
    // this.paginationPageSize = 100;
    // this.cacheOverflowSize = 2;
    // this.maxConcurrentDatasourceRequests = 1;
    // this.infiniteInitialRowCount = 10000;
    // this.maxBlocksInCache = 10;
    // //-------- uncomment for activating data loading on infinite scrolling ends---------
  }

  ngOnInit() { 
    //=================fetching few data by fetchListItems service start start ====================
    this.listInfo.name = "ReimburseMaster";
    this.listInfo.select = 'Title'+","+'PendingWith'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created'+","+'PendingWith/ID'+","+'PendingWith/Title'+","+'Author/ID'+","+'Author/Title'+","+'RequestFor'+","+'ItemName'+","+'Entitlement'+","+'GLCode'+","+'CostCenter'+","+'Created'+","+'TotalReimbursementAmount'+","+'RequestFor'+","+'ItemName'+","+'Entitlement'+","+'GLCode'+","+'CostCenter'+","+'TotalReimbursementAmount'+","+'EmployeeId'+","+'ID';
    this.listInfo.expand = 'PendingWith'+","+'Author';
    this.listInfo.top = 100;

    this.sharepointlistService.getEmpIdNdOffice().then((res)=> {
      if(res.Office == "Corporate"){
        this.listInfo.filter = '';         
      }
      else{
        this.listInfo.filter = "substringof('"+ res.Office +"' ,Author/Office)";            
      }

      from(
        this.sharepointlistService.fetchListItems(this.listInfo, res)        
        ).subscribe(
          (items) =>{
            this.rowData = items; 
          },
          (err) => {
              console.log(err)
          },
        );      
    });
    //--------------------fetching few data by fetchListItems service ends ---------------

  }

  onGridReady(params) {
    
    this.mpTG.gridApi = params.api;
    this.mpTG.gridColumnApi = params.columnApi;
    this.onGridReadyParamsApi = this.mpTG.gridApi;
    

    //=================fetching all data by fetchListItems service start ====================
    this.listInfo.name = "ReimburseMaster";
    this.listInfo.select = 'Title'+","+'PendingWith'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created'+","+'PendingWith/ID'+","+'PendingWith/Title'+","+'Author/ID'+","+'Author/Title'+","+'RequestFor'+","+'ItemName'+","+'Entitlement'+","+'GLCode'+","+'CostCenter'+","+'Created'+","+'TotalReimbursementAmount'+","+'RequestFor'+","+'ItemName'+","+'Entitlement'+","+'GLCode'+","+'CostCenter'+","+'TotalReimbursementAmount'+","+'EmployeeId'+","+'ID';
    this.listInfo.expand = 'PendingWith'+","+'Author';    

    this.sharepointlistService.getEmpIdNdOffice().then((res)=> {
      if(res.Office == "Corporate"){
        this.listInfo.filter = '';
        this.listInfo.top = 100000;         
      }
      else{
        this.listInfo.filter = "substringof('"+ res.Office +"' ,Author/Office)"; 
        this.listInfo.top = 100000;           
      }

      from(
        this.sharepointlistService.fetchListItems(this.listInfo, res)        
        ).subscribe(
          (items) =>{
            this.rowData = items;            
          },
          (err) => {
              console.log(err)
          },
        );      
    });
    //--------------------fetching all data by fetchListItems service start ---------------

    
    
    //================= ###100% working## working uncomment upto this for activating lazy loading ###100% working## ==============
    // //================= if activate this then disable all methood inside ngOnInit() ==============
    // this.listInfo.name = "ReimburseMaster";
    // this.listInfo.query = 'Title'+","+'PendingWith'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created'+","+'PendingWith/ID'+","+'PendingWith/Title'+","+'Author/ID'+","+'Author/Title'+","+'RequestFor'+","+'ItemName'+","+'Entitlement'+","+'GLCode'+","+'CostCenter'+","+'Created'+","+'TotalReimbursementAmount'+","+'RequestFor'+","+'ItemName'+","+'Entitlement'+","+'GLCode'+","+'CostCenter'+","+'TotalReimbursementAmount'+","+'EmployeeId'+","+'ID';
    
    // this.sharepointlistService.getEmpIdNdOffice().then((res)=> {
    //   from(
    //     this.sharepointlistService.fetchListItems(this.listInfo, res)        
    //     ).subscribe(
    //       (items) =>{    
    //         var dataSource = {
    //           rowCount: null,
    //           getRows: function (params) {
    //             console.log(
    //               'asking for ' + params.startRow + ' to ' + params.endRow
    //             );
    //             setTimeout(function () {
    //               var rowsThisPage;                  
    //               rowsThisPage = items.slice(params.startRow, params.endRow);
    //               var lastRow = -1;
    //               if (items[0].ID <= params.endRow) {
    //                 lastRow = items[0].ID;
    //                 //lastRow = items.length;
    //               }
    //               params.successCallback(rowsThisPage, lastRow);
    //             }, 500);
    //           },
    //         };
    //         params.api.setDatasource(dataSource);
    //         this.rowData = items; 
    //         //this.mpTG.gridOptions.rowData = items;
    //       },
    //       (err) => {
    //           console.log(err)
    //       },
    //     );      
    // });
    // //---------------------uncomment upto this for activating lazy loading -----------------
     
        

  }

  ngAfterViewInit() {}

  //===================== Export Table data to Excel start ==============
  onBtnExportDataAsExcel() {
    function rowGroupCallback(params) {
      return params.node.key;
    }

    this.mpTG.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }
  //===================== Export Table data to Excel end ==============

  //=============== Quick central filter function start ========== 
  //--------method-1: (with angular)--------
  quickSearch() {    
    //this.mpTG.gridApi.setQuickFilter('ReimbursementID-9090');
    this.mpTG.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }
  //--------method-2: (with Jquery)--------required to include oninput=onFilterTextBoxChanged() in html file--------
  // onFilterTextBoxChanged(){
  //   this.gridApi.setQuickFilter(document.querySelector('#filter-text-box'));
  // }
  //=============== Quick central filter function ends ==========

  
  //============= set row height methods starts 100% working ==============
  getRowHeight(params) {
    return groupHeight;
    // if (params.node.group) {
    //   return groupHeight;
    // }
  }

  setGroupHeight(height) {
    groupHeight = height;
    rowHeight = height;
    this.mpTG.gridApi.resetRowHeights();
  }

  setRowHeight(height){
    // rowHeight = height;
    // this.mpTG.gridApi.resetRowHeights();

    this.mpTG.gridApi.forEachNode(function (rowNode) {
      //if (rowNode.data && rowNode.data.country === 'Russia') {
        // rowHeight = height;
        // this.mpTG.gridApi.resetRowHeights();  
      rowNode.setRowHeight(height);
      //}
    });
    this.mpTG.gridApi.onRowHeightChanged();
  }
  //------- set row height methods ends ---------------

  //=========== voice recognition start ==========
  

  voiceSearch(){
    
    alert("Please say any word that you want to search with");

    

    let quickVoiceSearch = (txt) => {
      this.onGridReadyParamsApi.setQuickFilter(txt);
    }

    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.continuous = false;
        vSearch.interimresults = false;
        vSearch.lang = 'en-US';
        vSearch.start();
        //const voiceSearchForm = this.formSearch.nativeElement;
        //const voiceHandler = this.hiddenSearchHandler.nativeElement;
        //const srcTxtVoiceHandler = this.filterTextBox.nativeElement; // for filter
        //console.log(voiceSearchForm);
        vSearch.onresult = function(e){
          //console.log(voiceSearchForm);
          //voiceHandler.value = e.results[0][0].transcript;
            vSearch.stop();
            //console.log(voiceHandler);
            //alert(e.results[0][0].transcript);
            
            this.txtOfQuickSearchInpFld = e.results[0][0].transcript;
            (document.getElementById('filter-text-box') as HTMLInputElement).value = this.txtOfQuickSearchInpFld;
            quickVoiceSearch(this.txtOfQuickSearchInpFld);

            
            //voiceSearchForm.submit();
        }
  
        vSearch.onerror = function(e){
            console.log(e);
            vSearch.stop();
        }

        
        
    } else {
      alert("webkitSpeechRecognition is not available.");
      //console.log(this.state.get(configKey, undefined as any));
      }
  }

  viewByVoice(){
    
    alert("Please say only the number of your request/application within 2-seconds");

    

    let quickVoiceSearch = (txt) => {
      this.onGridReadyParamsApi.setQuickFilter(txt);
           
      let itm = this.rowData.filter(item => item.Title == 'ReimbursementID-' + txt);
        //alert(itm[0].GUID);
        let url = "https://portal.bergerbd.com/leaveauto/SitePages/EmployeeReimbursement.aspx?UniqueId="+ itm[0].GUID + "&mode=read";
        window.open(url, "_blank");
    }

    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.continuous = false;
        vSearch.interimresults = false;
        vSearch.lang = 'en-US';
        vSearch.start();
        //const voiceSearchForm = this.formSearch.nativeElement;
        //const voiceHandler = this.hiddenSearchHandler.nativeElement;
        //const srcTxtVoiceHandler = this.filterTextBox.nativeElement; // for filter
        //console.log(voiceSearchForm);
        vSearch.onresult = function(e){
          //console.log(voiceSearchForm);
          //voiceHandler.value = e.results[0][0].transcript;
            vSearch.stop();
                        
            this.txtOfQuickSearchInpFld = e.results[0][0].transcript;
            //(document.getElementById('filter-text-box') as HTMLInputElement).value = this.txtOfQuickSearchInpFld;
            quickVoiceSearch(this.txtOfQuickSearchInpFld);

            
            //voiceSearchForm.submit();
        }
  
        vSearch.onerror = function(e){
            console.log(e);
            vSearch.stop();
        }

        
        
    } else {
      alert("webkitSpeechRecognition is not available.");
      //console.log(this.state.get(configKey, undefined as any));
      }
  }

  hscByVoice(){
    
   // alert("Please say only the number of your CAPTCHA within 2-seconds");

    

    let quickVoiceSearch = (txt) => {
      this.onGridReadyParamsApi.setQuickFilter(txt);
           
      //let itm = this.rowData.filter(item => item.Title == 'ReimbursementID-' + txt);
        //alert(itm[0].GUID);
        
        let url = "https://eboardresults.com/v2/getres?exam=hsc&year=2001&board=dhaka&result_type=1&reg=&eiin=&dcode=&ccode=&captcha="+ txt + "&roll="+ this.roll ;
        window.open(url, "_blank");
        this.roll ++; 
        //this.roll = this.roll + 10; 
    }

    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.continuous = false;
        vSearch.interimresults = false;
        vSearch.lang = 'en-US';
        vSearch.start();
        //const voiceSearchForm = this.formSearch.nativeElement;
        //const voiceHandler = this.hiddenSearchHandler.nativeElement;
        //const srcTxtVoiceHandler = this.filterTextBox.nativeElement; // for filter
        //console.log(voiceSearchForm);
        vSearch.onresult = function(e){
          //console.log(voiceSearchForm);
          //voiceHandler.value = e.results[0][0].transcript;
            vSearch.stop();
                        
            this.txtOfQuickSearchInpFld = e.results[0][0].transcript;
            //(document.getElementById('filter-text-box') as HTMLInputElement).value = this.txtOfQuickSearchInpFld;
            quickVoiceSearch(this.txtOfQuickSearchInpFld);

            
            //voiceSearchForm.submit();
        }
  
        vSearch.onerror = function(e){
            console.log(e);
            vSearch.stop();
        }

        
        
    } else {
      alert("webkitSpeechRecognition is not available.");
      //console.log(this.state.get(configKey, undefined as any));
      }
  }
//---------------------voice recognition ends --------  

}

var rowHeight, groupHeight;

let myProcessColDef = [
  {
    headerName: 'RequestID',
    field: 'Title',
    cellRendererFramework: MyprocessviewbtncstmComponent,
    sortable: true,
    //enableRowGroup: true,
    enableRowGroup: false,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 165,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },    
  },   
  {
    headerName: 'Created',
    field: 'Created',
    sortable: true,
    enableRowGroup: true,
    filter: 'agDateColumnFilter',
    filterParams: {
        comparator: function(filterLocalDateAtMidnight, cellValue) {
            //var dateAsString = cellValue;
            var dateAsString = moment(cellValue).format('DD/MM/YYYY');
            var dateParts = dateAsString.split('/');
            var cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
            );
            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            }
        },
        //applyButton: true,
      resetButton: true,
    },
    valueFormatter: function(params) {
        return moment(params.value).format('DD MMM, YYYY');
    },
    columnGroupShow: 'open',  
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },
    minWidth: 100,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
  },  
  {
    headerName: 'Requested by',
    field: 'Author.Title',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 165,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },    
  },
  {
    headerName: 'Emp.Id',
    field: 'EmployeeId',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 100,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },
    //hide: true,    
  },
  {
    headerName: 'GLCode',
    field: 'GLCode',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 100,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },
    hide: true,    
  },
  {
    headerName: 'CostCenter',
    field: 'CostCenter',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 120,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },
    hide: true,    
  },
  {
    headerName: 'Request for',
    //field: 'RequestFor',
    field: 'ItemName',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 165,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },    
  },
  {
    headerName: 'Amount',
    field: 'TotalReimbursementAmount',
    sortable: true,
    //enableRowGroup: true,
    enableRowGroup: false,
    filter: 'agNumberColumnFilter',
    //filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 110,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },
    //valueFormatter: params => params.data.TotalReimbursementAmount.toFixed(2),
  },
  {
    headerName: 'Status',
    field: 'Status',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 165,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },    
  },
  {
    headerName: 'LastUpdated',
    field: 'Modified',
    sortable: true,
    enableRowGroup: true,
    filter: 'agDateColumnFilter',
    filterParams: {
        comparator: function(filterLocalDateAtMidnight, cellValue) {
            //var dateAsString = cellValue;
            var dateAsString = moment(cellValue).format('DD/MM/YYYY');
            var dateParts = dateAsString.split('/');
            var cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
            );
            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            }
        },
        //applyButton: true,
      resetButton: true,
    },
    valueFormatter: function(params) {
        return moment(params.value).format('DD MMM, YYYY');
    },
    columnGroupShow: 'open',  
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
        if((params.data.Status != 'Completed' && params.data.Status != 'Rejected' && params.data.Status != 'Saved' && params.data.Status != '') && ((new Date().getTime() - new Date(params.data.Modified).getTime())/(1000 * 60 * 60 * 24)) > 3){
          return { backgroundColor: '#ffaaaa', textAlign: 'center', display: 'flex',};
        } 
        else{
          return {
            //color: 'red', 
            //backgroundColor: 'green',
            textAlign: 'center', 
            display: 'flex',             
          };
        }           
        
      } else {
          return {
            textAlign: 'center',
          }
        }
    },
    // cellStyle: function(params) {
    //   if(params.data.RequestStatus != 'Completed' && ((new Date().getTime() - new Date(params.data.Modified).getTime())/(1000 * 60 * 60 * 24)) > 3){
    //     return { backgroundColor: '#ffaaaa' };
    //   }
    // },
    minWidth: 130,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    hide: true,
  },  
  {
    headerName: 'PendingWith with',
    field: 'PendingWith.Title',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 165,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },    
  },
  {
    headerName: 'View/Action',
    field: 'GUID',
    cellRendererFramework: MyprocessviewbtncstmComponent,
    //cellRendererFramework: LiActionBtnCstmComponent,
    enableRowGroup: false,
    menuTabs: ['generalMenuTab', 'columnsMenuTab'],
    cellClass: "ag-header-group-cell-label",
    cellStyle: function(params) {
      if (params.value !='') {
          return {
          //color: 'red', 
          //backgroundColor: 'green',
          textAlign: 'center', 
          display: 'flex',
        };
      } else {
          return {
            textAlign: 'center',
          }
        }
    },
    minWidth: 120,
  } 
];

 















