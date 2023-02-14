import { 
  Component, 
  OnInit, 
  ViewChild} from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
//========to covert promise to observer======
import {
  from,
  forkJoin,
  combineLatest
} from 'rxjs';

import { map, mergeAll } from 'rxjs/operators';

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
  selector: 'app-workshopproposalreport',
  templateUrl: './workshopproposalreport.component.html',
  styleUrls: ['./workshopproposalreport.component.scss']
})
export class WorkshopproposalreportComponent implements OnInit { 
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
    top: 100000,   
  };

  public detListInfo = {
    name: "",
    query: "",
    expand: "",
    select: "",
    filter: "",
    top: 100000,   
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

  onGridReady(params) {
    this.mpTG.gridApi = params.api;
    this.mpTG.gridColumnApi = params.columnApi;    
  }

  ngOnInit() { 
    let detailTblData;

    this.listInfo.name = "WorkshopProposalMaster";
    this.listInfo.select = 'Status' + "," + 'EmployeeID'+ "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title'+","+'Author/Office'+","+'Author/JobTitle';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    this.listInfo.top = 100000;   

    this.detListInfo.name = "WorkshopProposalInfo";
    this.detListInfo.select = 'ExpectedDate' + "," + 'Author/ID'+ "," + 'Author/Office'+ "," + 'WorkshopLocation' + "," + 'ExpectedParticipant' + "," + 'Purpose' + "," + 'TotalAmount'+ "," + 'Title'
    + "," + 'GLCode' + "," + 'CostCenter' + "," + 'IONumber' + "," + 'FoodCost' + "," + 'HallOrVenueRent'+ "," + 'PromotionalItem'+ "," + 'DecorationCost'+ "," + 'OtherCost'
    + "," + 'BudgetedExpenditure' + "," + 'ActualLocation' + "," + 'ActualParticipant' + "," + 'ActualFoodCost' + "," + 'ActualDecorationCost'+ "," + 'ActualHallOrVenueRent'+ "," + 'ActualPromotionalItem'+ "," + 'ActualExpenditure'+ "," + 'ActualOtherCost';
    this.detListInfo.expand = 'Author';
    this.detListInfo.top = 100000;

    
    this.sharepointlistService.getEmpIdNdOffice().then((res)=> {
      if(res.Office == "Corporate"){
        this.listInfo.filter = '';         
      }
      else{
        this.listInfo.filter = "substringof('"+ res.Office +"' ,Author/Office)";            
      }

      // //===========forkJoin =========
      // this.rowData = combineLatest(
      //   [
      //     from(
      //       this.sharepointlistService.fetchListItems(this.listInfo, res)   
      //     ),
      //     from(
      //       this.sharepointlistService.fetchListItems(this.detListInfo, res)   
      //     )
      //   ]
      // ).pipe(
      //   map(([first, second]) => {

      //     let detailTblData = second;
      //     //let detailTblData = JSON.parse(JSON.stringify(first));
      //     this.rowData = first;
      //     return detailTblData;

      //         let detailMasterData = detailTblData.map(t1 => ({
      //             ...t1,
      //             ...first.find(t2 => t2.Title === t1.Title)
      //         }));
  
      //         first.forEach(element => {
      //             if (detailMasterData.some((eachElement) => eachElement.RequestCode != element.RequestID)) {
      //                 detailMasterData.push(element);
      //             }
      //         });           

      //     // combineLatest returns an array of values, here we map those values to an object
          

      //     //return detailMasterData;
      //   })
      // );

      // //---------------fork join ends ------

      from(
        this.sharepointlistService.fetchListItems(this.detListInfo, res)   
      ).subscribe(
          (Response) => {
            //this.rowData = Response;
            //this.rowData = JSON.parse(JSON.stringify(Response));
              detailTblData = JSON.parse(JSON.stringify(Response));             
          },
          (err) => {
              console.log(err)
          },
      );     
    });

    this.listInfo.name = "WorkshopProposalMaster";
    this.listInfo.select = 'Status' + "," + 'EmployeeID'+ "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title'+","+'Author/Office'+","+'Author/JobTitle';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    this.listInfo.top = 100000;          
    

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
            this.rowData = detailTblData.map(t1 => ({
              ...t1,
              ...items.find(t2 => t2.Title === t1.Title)
            }));
            
          },
          (err) => {
              console.log(err)
          },
        );
        
        
     });
    //--------------------fetching few data by fetchListItems service ends ---------------

    this.rowData = combineLatest([this.rowData, detailTblData]).pipe(
         map(([first, second]) => {
           let detailMasterData = detailTblData.map(t1 => ({
                  ...t1,
                  ...this.rowData.find(t2 => t2.Title === t1.Title)
              }));

              return detailMasterData;
         }))

    //==============
   
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
    //cellRenderer: 'agGroupCellRenderer',
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
    minWidth: 120,
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
    headerName: 'Employee Id',
    field: 'EmployeeID',
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
    minWidth: 150,
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
    minWidth: 150,
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
    }   
  },
  
    {
      headerName: 'Workshop Date',
      field: 'ExpectedDate',
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
      minWidth: 130,
      menuTabs: ['filterMenuTab', 'generalMenuTab'],
    },
    {
      headerName: 'Workshop Location',
      field: 'ActualLocation',
      sortable: true,
      enableRowGroup: true,
      //enableRowGroup: false,
      filter: 'agSetColumnFilter',
      //filter: 'agTextColumnFilter',
      filterParams: {
          //applyButton: true,
          resetButton: true,
      },
      minWidth: 180,
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
      headerName: 'Ac.Participants',
      field: 'ActualParticipant',
      sortable: true,
      enableRowGroup: true,
      //filter: 'agSetColumnFilter',
      filter: 'agTextColumnFilter',
      filterParams: {
          //applyButton: true,
          resetButton: true,
      },
      minWidth: 135,
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
      headerName: 'Purpose', //TotalAmount
      field: 'Purpose',
      sortable: true,
      enableRowGroup: true,
      filter: 'agSetColumnFilter',
      filterParams: {
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
      } 
    },
    {
      headerName: 'ActualFoodCost',
      field: 'ActualFoodCost',
      sortable: true,
      enableRowGroup: true,
      filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
      filterParams: {
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
      } 
    },
    {
      headerName: 'ActualDecorationCost',
      field: 'ActualDecorationCost',
      sortable: true,
      enableRowGroup: true,
      filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
      filterParams: {
          resetButton: true,
      },
      minWidth: 185,
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
      } 
    },
    {
      headerName: 'ActualHallOrVenueRent',
      field: 'ActualHallOrVenueRent',
      sortable: true,
      enableRowGroup: true,
      filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
      filterParams: {
          resetButton: true,
      },
      minWidth: 185,
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
      } 
    },
    {
      headerName: 'ActualOtherCost',
      field: 'ActualOtherCost',
      sortable: true,
      enableRowGroup: true,
      filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
      filterParams: {
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
      } 
    },
    {
      headerName: 'ActualPromotionalItem',
      field: 'ActualPromotionalItem',
      sortable: true,
      enableRowGroup: true,
      filter: 'agSetColumnFilter',
      filterParams: {
          resetButton: true,
      },
      minWidth: 195,
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
      } 
    },    
    {
      headerName: 'ActualExpenditure',
      field: 'ActualExpenditure',
      sortable: true,
      enableRowGroup: true,
      filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
      filterParams: {
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
      } 
    }, 
  
];





