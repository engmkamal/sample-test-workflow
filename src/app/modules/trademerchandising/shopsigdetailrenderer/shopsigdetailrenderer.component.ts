import {Component} from '@angular/core';
import { Tablegrid } from 'src/app/shared/models/classes/tablegrid';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import {Module} from '@ag-grid-community/core';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
  from,
  combineLatest
} from 'rxjs';
import { TmlistitemsService } from '../tmlistitems.service';
//===========for date formate ======
import * as moment from 'moment';
//---------date formate ends ---

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-shopsigdetailrenderer',
  templateUrl: './shopsigdetailrenderer.component.html',
  styleUrls: ['./shopsigdetailrenderer.component.scss']
})
export class ShopsigdetailrendererComponent implements ICellRendererAngularComp {
  
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


  
  constructor(private tmlistitemsService: TmlistitemsService) { 
    this.mpTG.columnDefs = allMasDetColDef; 
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

    this.detListInfo.expand = 'Author';
    this.detListInfo.top = 200;

    this.detListInfo.filterBy = "RequestCode";
    this.detListInfo.filterWith = params.data.RequestID;

    if( params.data.MerchandizingType == "SHOP_MERCHANDIZING_EX"){
      this.detListInfo.name = "ShopMerchandizingExclusive";
      this.detListInfo.select = 'MasterID' + "," + 'RequestCode' + "," + 'CustomerAddress' + "," + 'ContactPersonName' + "," + 'ContactNumber';
    }
    else if( params.data.MerchandizingType == "SHOP_MERCHANDIZING_REG"){
      this.detListInfo.name = "ShopMerchandizingRegular";
      this.detListInfo.select = 'MasterID' + "," + 'RequestCode' + "," + 'CustomerAddress' + "," + 'ContactPersonName' + "," + 'ContactNumber';
    }
    else if( params.data.MerchandizingType == "SHOP_BELL_SIGN"){
      this.detListInfo.name = "ShopSignRequestDetail"; 
      this.detListInfo.select = 'MasterID' + "," + 'RequestCode' + "," + 'CustomerAddress' + "," + 'ContactPerson' + "," + 'ContactNumber' + "," + 'PreferredBrand';
    }
    else if( params.data.MerchandizingType == "WALL_SHUTTER_PAINTING"){
      this.detListInfo.name = "ShutterWallPaintingDetail";
      this.detListInfo.select = 'MasterID' + "," + 'RequestCode' + "," + 'CustomerAddress' + "," + 'ContactPerson' + "," + 'ContactNumber'; 
    }


    from(
      this.tmlistitemsService.fetchListItemsWithFilterExpand(this.detListInfo)   
    ).subscribe(
        (Response) => {
            this.rowData = Response;
        },
        (err) => {
            console.log(err)
        },
    );
    
  }

  
  
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


  
let allMasDetColDef = [
  {
    headerName: 'ContactPerson',
    field: 'ContactPerson',
    sortable: true,
    //rowGroup: true,
    enableRowGroup: true,
    //filter: 'agNumberColumnFilter',
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
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
                display: 'flex',
            }
        }
    },
    //columnGroupShow: 'open',
    minWidth: 100,
  },
  {
    headerName: 'ContactNumber',
    field: 'ContactNumber',
    sortable: true,
    //rowGroup: true,
    enableRowGroup: true,
    //filter: 'agNumberColumnFilter',
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
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
                display: 'flex',
            }
        }
    },
    //columnGroupShow: 'open',
    minWidth: 100,
  },
  {
    headerName: 'CustomerAddress',
    field: 'CustomerAddress',
    sortable: true,
    //rowGroup: true,
    enableRowGroup: true,
    //filter: 'agNumberColumnFilter',
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
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
                display: 'flex',
            }
        }
    },
    //columnGroupShow: 'open',
    minWidth: 100,
  },
  {
    headerName: 'ContactPersonName',
    field: 'ContactPersonName',
    sortable: true,
    //rowGroup: true,
    enableRowGroup: true,
    //filter: 'agNumberColumnFilter',
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
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
                display: 'flex',
            }
        }
    },
    //columnGroupShow: 'open',
    minWidth: 100,
  }
];
