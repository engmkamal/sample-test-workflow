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
import {
  MyprocessviewbtncstmComponent
} from '../../../shared/components/myprocessviewbtncstm/myprocessviewbtncstm.component';
//===========for date formate ======
import * as moment from 'moment';
//---------date formate ends ---
import { SharepointlistService } from 'src/app/shared/services/sharepointlist.service';
import { LiactionbtncstmComponent } from 'src/app/shared/components/liactionbtncstm/liactionbtncstm.component';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-itservicerequestdashboard',
  templateUrl: './itservicerequestdashboard.component.html',
  styleUrls: ['./itservicerequestdashboard.component.scss']
})
export class ItservicerequestdashboardComponent implements OnInit { 
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
  public modules: any[] = [InfiniteRowModelModule];
  public components;  
  

  @ViewChild('filterTextBox') filterTextBox;
  
  constructor(
    private sharepointlistService:SharepointlistService, 
    private http: HttpClient) { 
    
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

    this.listInfo.name = "ITServiceRequests"; 
    this.listInfo.select = 'Title'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created'+","+'Author/ID'+","+'Author/Title'+","+'RequestFor'+","+'RequestPickedDate'+","+'EmployeeId'+","+'Department'+","+'Location'+","+'ResolvedBy/Id'+","+'ResolvedBy/Title'+","+'EstimatedCD'+","+'PCReceivedDateByIT'+","+'OnBehalfOf/Title'+","+'OnBehalfOf/EMail'+","+'OnBehalfOf/Office'+","+'OnBehalfOf/JobTitle'+","+'ID'+","+'ProblemDescription'+","+'Author/Office'+","+'Author/JobTitle';     
    this.listInfo.expand = 'Author'+","+'ResolvedBy'+","+'OnBehalfOf';
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

    //=================fetching all data by fetchListItems service start ====================
    this.listInfo.name = "ITServiceRequests"; 
    this.listInfo.select = 'Title'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created'+","+'Author/ID'+","+'Author/Title'+","+'RequestFor'+","+'RequestPickedDate'+","+'EmployeeId'+","+'Department'+","+'Location'+","+'ResolvedBy/Id'+","+'ResolvedBy/Title'+","+'EstimatedCD'+","+'PCReceivedDateByIT'+","+'OnBehalfOf/Title'+","+'OnBehalfOf/EMail'+","+'OnBehalfOf/Office'+","+'OnBehalfOf/JobTitle'+","+'ID'+","+'ProblemDescription'+","+'Author/Office'+","+'Author/JobTitle';     
    this.listInfo.expand = 'Author'+","+'ResolvedBy'+","+'OnBehalfOf';    

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
  //------- set row height methods ends ---------------r 

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
    headerName: 'Department', 
    field: 'Department',
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
    field: 'RequestFor',
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
    headerName: 'ResolvedBy',
    field: 'ResolvedBy.Title',
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
    headerName: 'Action/Assign',
    field: 'GUID',
    //cellRendererFramework: MyprocessviewbtncstmComponent,
    cellRenderer: function(params) {
      return '<a href="https://portaldv.bergerbd.com/leaveauto/SitePages/AssignTask.aspx?UniqueId='+params.value+'" target="_blank">AssignTask</a>'
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

 
















