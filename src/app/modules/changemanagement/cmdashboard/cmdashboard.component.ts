import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

// import {
//   Grid,
//   GridOptions,
//   AllModules
// }
// from "@ag-grid-enterprise/all-modules";

// import {
//   ClientSideRowModelModule
// } from '@ag-grid-community/client-side-row-model';
// import {
//   MenuModule
// } from '@ag-grid-enterprise/menu';
// import {
//   SetFilterModule
// } from '@ag-grid-enterprise/set-filter';
// import {
//   ColumnsToolPanelModule
// } from '@ag-grid-enterprise/column-tool-panel';
// import {
//   ExcelExportModule
// } from '@ag-grid-enterprise/excel-export';
// import {
//   RangeSelectionModule
// } from '@ag-grid-enterprise/range-selection';
// import {
//   ClipboardModule
// } from '@ag-grid-enterprise/clipboard';
// import {
//   GridChartsModule
// } from '@ag-grid-enterprise/charts';

// import {
//   AccesswiselistitemsService
// } from '../../../accesswiselistitems.service';
import {
  CmlistitemsService
} from './../cmlistitems.service';

//========for date formating start =======
// import {
//   Inject,
//   LOCALE_ID
// } from '@angular/core';
// import {
//   formatDate
// } from '@angular/common';
// import * as moment from 'moment';
//----for date formating ends ------

import {
  LiactionbtncstmComponent
} from '../../../shared/components/liactionbtncstm/liactionbtncstm.component';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

//========to covert promise to observer======
import {
  of ,
  from
} from 'rxjs';
// import {
//   mergeMap
// } from 'rxjs/operators';
//----------promise to observer ends -----

//import { ITablegrid } from '../../../shared/models/interfaces/itablegrid';
import { Tablegrid } from 'src/app/shared/models/classes/tablegrid';

@Component({
  selector: 'app-cmdashboard',
  templateUrl: './cmdashboard.component.html',
  styleUrls: ['./cmdashboard.component.scss']
})
export class CmdashboardComponent implements OnInit {
  tg = new Tablegrid();
  public logedInUser = {
    aDId: "",
    name: "",
    email: "",
    empID: "",
    office: "",
    access: "",
    //GetRecordsApiUrl:"",
  };
  public txtOfQuickSearchInpFld;
  
  constructor(private http: HttpClient, private cmlistitemsService: CmlistitemsService) { 
    this.tg.defaultColDef = {
      flex: 1,
      minWidth: 120,
      resizable: true, //to resize; add resizable: false to any individual column to disable resizingng that col only
      enableValue: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      filter: true,
      editable: true,
    };

    this.tg.columnDefs = defaultBriefColDef;

    //===========for action btn link rendering start ===
    this.tg.frameworkComponents = {
      customizedAgeCell: LiactionbtncstmComponent,
    }
    //--------for action btn link rendering start -------
    this.tg.rowGroupPanelShow = 'always';

    //=========for setting features on every subgroup items start=======
    this.tg.autoGroupColumnDef = {
      headerName: 'Group',
      field: 'RequestStatus',
      minWidth: 30,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
          checkbox: true
      },
    };
    //------------ subitem fetures ends -----------
  }

  ngOnInit() {
    this.cmlistitemsService.getLoggedUserAuth().then(res => {
      this.logedInUser = res;
      from(
          this.cmlistitemsService.getMasterListItems(res)
      ).subscribe(
          (Response) => {
              this.tg.rowData = JSON.parse(JSON.stringify(Response));
              //console.log("Total Records: " + this.tg.rowData.length);
          },
          (err) => {
              console.log(err)
          },
      );
    });
  }

  onGridReady(params) {
    this.tg.gridApi = params.api;
    this.tg.gridColumnApi = params.columnApi;
  }

  //=============== Quick central filter function starts ==========
  //--------method-1: (with angular)--------
  quickSearch() {
    this.tg.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);    
  }
  //--------method-2: (with Jquery)--------required to include oninput=onFilterTextBoxChanged() in html file--------
  // onFilterTextBoxChanged(){
  //   this.gridApi.setQuickFilter(document.querySelector('#filter-text-box'));
  // }
  //=============== Quick central filter function ends ==========

  //===================== Export Table data to Excel start ==============
  onBtnExportDataAsExcel() {
    function rowGroupCallback(params) {
        return params.node.key;
    }

    this.tg.gridApi.exportDataAsExcel({
        processRowGroupCallback: rowGroupCallback,
    });
  }
  //===================== Export Table data to Excel end ==============


}

let defaultBriefColDef = [
  {
  headerName: 'RequestID',
  field: 'Title',
  sortable: true,
  rowGroup: false,
  enableRowGroup: false,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  headerCheckboxSelection: true, //for appearing in Grid
  headerCheckboxSelectionFilteredOnly: true,
  checkboxSelection: true, //for appearing in each row
  menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
  minWidth: 120,
},
{
  headerName: 'Requestor Details',
  children: [{
          headerName: 'Employee Name',
          field: 'Author.Title',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 180,
          //columnGroupShow: 'open',
          //cellEditor: 'agRichSelectCellEditor', 
      },
      {
          headerName: 'Emp.ID',
          field: 'EmployeeId',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          columnGroupShow: 'open',
          //hide:true
      },
      {
          headerName: 'Employee Office',
          field: 'Author.Office',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 180,
          columnGroupShow: 'open',
          //cellEditor: 'agRichSelectCellEditor', 
      }
  ]
},
{
  headerName: 'Details Info',
  children: [{
      headerName: 'Downtime',
      field: 'downtime',
      sortable: true,
      enableRowGroup: true,
      filter: 'agTextColumnFilter',
      filterParams: {
          applyButton: true,
          resetButton: true,
      },
      minWidth: 125,
  }, 
  {
      headerName: 'Impact',
      field: 'impact',
      sortable: true,
      enableRowGroup: true,
      filter: 'agTextColumnFilter',
      filterParams: {
          applyButton: true,
          resetButton: true,
      },
      minWidth: 80,
      columnGroupShow: 'open',
  }, 
  {
      headerName: 'Priority',
      field: 'priority',
      sortable: true,
      enableRowGroup: true,
      filter: 'agTextColumnFilter',
      filterParams: {
          applyButton: true,
          resetButton: true,
      },
      minWidth: 80,
      columnGroupShow: 'open',
  }]
},
{
  headerName: 'End Date',
  field: 'endDate',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 170,
}, 
{
  headerName: 'SystemName',
  field: 'SystemName',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 145,
}, 
{
  headerName: 'System Type',
  field: 'systemType',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 135,
}, 
{
  headerName: 'Status',
  field: 'status',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 130,
}, 
{
  headerName: 'PendingWith',
  field: 'PendingWith.Title',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 160,
},
{
  headerName: 'View/Action',
  field: 'GUID',
  cellRendererFramework: LiactionbtncstmComponent,
  enableRowGroup: false,
}
];
