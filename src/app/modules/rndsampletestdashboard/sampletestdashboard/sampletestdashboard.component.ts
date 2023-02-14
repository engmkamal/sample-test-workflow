import { 
  Component, 
  OnInit, 
  ViewChild} from '@angular/core';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
//========to covert promise to observer======
import {
  from
} from 'rxjs';

import { Tablegrid } from 'src/app/shared/models/classes/tablegrid';
//==========import view btn cstm component ==========

//===========for date formate ======
import * as moment from 'moment';
//---------date formate ends ---
import { SharepointlistService } from 'src/app/shared/services/sharepointlist.service';
import { LiactionbtncstmComponent } from 'src/app/shared/components/liactionbtncstm/liactionbtncstm.component';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { HttpClient } from '@angular/common/http';

import {Module} from '@ag-grid-community/core';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { TestparamrendererComponent } from '../testparamrenderer/testparamrenderer.component';
// import { MenuModule } from '@ag-grid-enterprise/menu';
// import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';


@Component({
  selector: 'app-sampletestdashboard',
  templateUrl: './sampletestdashboard.component.html',
  styleUrls: ['./sampletestdashboard.component.scss']
})
export class SampletestdashboardComponent implements OnInit { 
  public rowDataCM: string;
  public rowDataWP: any;
  mpTG = new Tablegrid();  
  public workflows = [];
  rowData: any;
  public txtOfQuickSearchInpFld;
  public rowHeight;

  public logedInUser = {
    aDId: "",
    name: "",
    email: "",
    empID: "",
    office: "",
    access: "",
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
  public components; 

  public detailCellRendererParams;
  
  public modules: Module[] = [
    InfiniteRowModelModule,
    //ClientSideRowModelModule,
    MasterDetailModule,
    //MenuModule,
    //ColumnsToolPanelModule,
  ];

  public detailCellRenderer;
  public frameworkComponents;  

  @ViewChild('filterTextBox') filterTextBox;
  
  constructor(
    private sharepointlistService:SharepointlistService, 
    private http: HttpClient) { 

      //=======for master-details ====
      this.detailCellRenderer = 'myDetailCellRenderer';
      this.frameworkComponents = { myDetailCellRenderer: TestparamrendererComponent };
      //this.frameworkComponents = { myDetailCellRenderer: DetailCellRendererComponent };
      //----------master details ends ---
    
    //========for my Prcess =========
    this.mpTG.columnDefs = myProcessColDef;    
    
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
   
  }

  ngOnInit() { 
    this.listInfo.select = 'Title'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created'+","+'Author/ID'+","+'Author/Title'+","+'RequestFor'+","+'RequestPickedDate'+","+'EmployeeId'+","+'Department'+","+'Location'+","+'ResolvedBy/Id'+","+'ResolvedBy/Title'+","+'EstimatedCD'+","+'PCReceivedDateByIT'+","+'OnBehalfOf/Title'+","+'OnBehalfOf/EMail'+","+'OnBehalfOf/Office'+","+'OnBehalfOf/JobTitle'+","+'ID'+","+'ProblemDescription'+","+'Author/Office'+","+'Author/JobTitle';     
    this.listInfo.name = "RnDLabTestMaster";
    this.listInfo.select = 'Status' + "," + 'RequestorEmpId' + "," + 'RnDLabTest' + "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title'+","+'Author/Office'+","+'Author/JobTitle';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    this.listInfo.top = 1;   

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
            let allData = items;
            allData.RnDLabTest = JSON.parse(items[0].RnDLabTest);            
            this.rowData = allData; 
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

    //=================fetching all data by fetchListItems service start ====================
    this.listInfo.select = 'Title'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created'+","+'Author/ID'+","+'Author/Title'+","+'RequestFor'+","+'RequestPickedDate'+","+'EmployeeId'+","+'Department'+","+'Location'+","+'ResolvedBy/Id'+","+'ResolvedBy/Title'+","+'EstimatedCD'+","+'PCReceivedDateByIT'+","+'OnBehalfOf/Title'+","+'OnBehalfOf/EMail'+","+'OnBehalfOf/Office'+","+'OnBehalfOf/JobTitle'+","+'ID'+","+'ProblemDescription'+","+'Author/Office'+","+'Author/JobTitle';     
    this.listInfo.name = "RnDLabTestMaster";
    this.listInfo.select = 'Status' + "," + 'RequestorEmpId' + "," + 'RnDLabTest' + "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title'+","+'Author/Office'+","+'Author/JobTitle';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    
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
            let allData = items;
            allData.RnDLabTest = JSON.parse(items[0].RnDLabTest);            
            this.rowData = allData;
            this.onFirstDataRendered(params);
          },
          (err) => {
              console.log(err)
          },
        );      
    });
    //--------------------fetching all data by fetchListItems service start ---------------
        
  }

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

  onFirstDataRendered(params) {
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  }

}

var rowHeight, groupHeight;

let myProcessColDef = [
  {
    headerName: 'RequestID',
    field: 'Title',
    cellRenderer: 'agGroupCellRenderer',
    //cellRendererFramework: MyprocessviewbtncstmComponent,
    sortable: true,
    //enableRowGroup: true,
    enableRowGroup: false,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 80,
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
    minWidth: 80,
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
    headerName: 'Location',
    field: 'Author.Office',
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
    hide: true   
  },
  {
    headerName: 'Job Title',
    field: 'Author.JobTitle',
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
    hide: true    
  },
  {
    headerName: 'JobTitle',
    field: 'Author.JobTitle',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 50,
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
    headerName: 'Office',
    field: 'Author.Office',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 50,
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
    headerName: 'View',
    field: 'GUID',
    //cellRendererFramework: MyprocessviewbtncstmComponent,
    cellRenderer: function(params) {
      return '<a href="https://portal.bergerbd.com/leaveauto/SitePages/SampleTest.aspx/?UniqueId='+params.value+'&mode=read" target="_blank">View</a>'
    },
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


