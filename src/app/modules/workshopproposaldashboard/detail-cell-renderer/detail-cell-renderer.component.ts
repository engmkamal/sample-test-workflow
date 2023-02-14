import {Component} from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

import { Tablegrid } from 'src/app/shared/models/classes/tablegrid';

//===========for date formate ======
import * as moment from 'moment';
//---------date formate ends ---
import { LiactionbtncstmComponent } from 'src/app/shared/components/liactionbtncstm/liactionbtncstm.component';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import {Module} from '@ag-grid-community/core';

// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
// import { MenuModule } from '@ag-grid-enterprise/menu';
// import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { SharepointlistService } from 'src/app/shared/services/sharepointlist.service';
import {
  from,
  combineLatest
} from 'rxjs';

@Component({
  selector: 'app-detail-cell-renderer',
  templateUrl: './detail-cell-renderer.component.html',
  styleUrls: ['./detail-cell-renderer.component.scss']
})
export class DetailCellRendererComponent implements ICellRendererAngularComp {
  
  public firstRecord;

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
  
  public modules: Module[] = [
    InfiniteRowModelModule,
    //ClientSideRowModelModule,
    MasterDetailModule,
    //MenuModule,
    //ColumnsToolPanelModule,
  ];

  public detListInfo = {
    name: "",
    query: "",
    expand: "",
    select: "",
    filterBy: "",
    filterWith: "",
    top: 100000,   
  };


  
  constructor(private sharepointlistService:SharepointlistService) { 
    this.mpTG.columnDefs = myProcessColDef; 
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
      //customizedAgeCell: LiactionbtncstmComponent,
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


   // called on init
  agInit(params: any): void {
    this.detListInfo.name = "WorkshopProposalInfo";
    this.detListInfo.select = 'ExpectedDate' + "," + 'Author/ID'+ "," + 'Author/Office'+ "," + 'WorkshopLocation' + "," + 'ExpectedParticipant' + "," + 'Purpose' + "," + 'TotalAmount'+ "," + 'Title'
    + "," + 'GLCode' + "," + 'CostCenter' + "," + 'IONumber' + "," + 'FoodCost' + "," + 'HallOrVenueRent'+ "," + 'PromotionalItem'+ "," + 'DecorationCost'+ "," + 'OtherCost'
    + "," + 'BudgetedExpenditure' + "," + 'ActualLocation' + "," + 'ActualParticipant' + "," + 'ActualFoodCost' + "," + 'ActualDecorationCost'+ "," + 'ActualHallOrVenueRent'+ "," + 'ActualPromotionalItem'+ "," + 'ActualExpenditure'+ "," + 'ActualOtherCost';
    this.detListInfo.expand = 'Author';
    this.detListInfo.top = 100000;

    this.detListInfo.filterBy = "Title";
    this.detListInfo.filterWith = params.data.Title;

    this.sharepointlistService.getEmpIdNdOffice().then((res)=> {
      
      from(
        this.sharepointlistService.fetchListItemsWithFilterExpand(this.detListInfo, res)       
        ).subscribe(
          (items) =>{
            //this.rowData = [{WorkshopLocation: "Dhaka"}];
            this.rowData = items;
          },
          (err) => {
              console.log(err)
          },
        );

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

          
    });

    //this.rowData = [params.data];
  }

  //agInit(params: any): void {}
  
  // called when the cell is refreshed
  refresh(params: any): boolean {
    return false;
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
    headerName: 'Date',
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
    minWidth: 70,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
  },
  {
    headerName: 'Location',
    field: 'WorkshopLocation',
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
    headerName: 'PromotionalItem',
    field: 'PromotionalItem',
    sortable: true,
    //enableRowGroup: true,
    enableRowGroup: false,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 130,
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
    headerName: 'Ex.Participant',
    field: 'ExpectedParticipant',
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
  },
  {
    headerName: 'Ac.Participant',
    field: 'ActualParticipant',
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
    minWidth: 145,
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
    headerName: 'Expected Cost',
    field: 'TotalAmount',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    filterParams: {
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
    } 
  }, 
  {
    headerName: 'Actual Cost',
    field: 'ActualExpenditure',
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
  }
 ];