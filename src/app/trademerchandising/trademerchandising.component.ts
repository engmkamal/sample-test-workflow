import { Component, OnInit } from '@angular/core';
import {
  TmlistitemsService
} from '../modules/trademerchandising/tmlistitems.service';
import * as moment from 'moment';
import {
  TmliviewbtncstmComponent
} from '../modules/trademerchandising/tmliviewbtncstm/tmliviewbtncstm.component'; 
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  of ,
  from
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import '../../../node_modules/@ag-grid-community/core/dist/styles/ag-grid.css';
import '../../../node_modules/@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {Observable} from 'rxjs';
import { Tablegrid } from 'src/app/shared/models/classes/tablegrid';

//========importing js file =========
//import { exernalJS } from "../../assets/js/getAccesswiseDBRecords";
//import "../../assets/js/getAccesswiseDBRecords";
//import { path } from './lib/navbarReformerUserAccessGetRecords.js';
//--------js file importing ends -----

@Component({
  selector: 'app-trademerchandising',
  templateUrl: './trademerchandising.component.html',
  styleUrls: ['./trademerchandising.component.scss']
})

export class TrademerchandisingComponent implements OnInit {

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

  constructor(private tmlistitemsService: TmlistitemsService) {

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
      customizedAgeCell: TmliviewbtncstmComponent,
    }
    //--------for action btn link rendering start -------
    this.tg.rowGroupPanelShow = 'always';

    //=========for setting features on every subgroup items start=======
    this.tg.autoGroupColumnDef = {
      headerName: 'Group',
      field: 'RequestStatus',
      minWidth: 250,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
          checkbox: true
      },
    };
    //------------ subitem fetures ends -----------
  }
  
  ngOnInit() {
    this.tmlistitemsService.getLoggedUserAuth().then(res => {
      this.logedInUser = res;
      from(
          this.tmlistitemsService.getMasterListItems(res)
      ).subscribe(
          (Response) => {
              this.tg.rowData = JSON.parse(JSON.stringify(Response));
              console.log("Total Records: " + this.tg.rowData.length);
              //console.log("Fetched Items: " + JSON.stringify(Response));
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

  //=============== Quick central filter function start ========== 
  //--------method-1: (with angular)--------
  quickSearch() {
    this.tg.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }
  //--------method-2: (with Jquery)--------required to include oninput=onFilterTextBoxChanged() in html file--------
  // onFilterTextBoxChanged(){
  //   this.gridApi.setQuickFilter(document.querySelector('#filter-text-box'));
  // }
  //=============== Quick central filter function ends ==========

  //===========include all columns ==========
  onBtnIncludeAllColumns() {      
    this.tg.gridApi.setColumnDefs([]);
    this.tg.gridApi.setColumnDefs(allMasDetColDef);

    from(
      this.tmlistitemsService.getDetailListItems(this.logedInUser)   
    ).subscribe(
        (Response) => {
          let detailTblData = JSON.parse(JSON.stringify(Response));
          let detailMasterData = detailTblData.map(t1 => ({
              ...t1,
              ...this.tg.rowData.find(t2 => t2.RequestCode === t1.RequestID)
          }));

          this.tg.rowData.forEach(element => {
              if (detailMasterData.some((eachElement) => eachElement.RequestCode != element.RequestID)) {
                  detailMasterData.push(element);
                  // var api = this.tg.gridApi;
                  // api.applyTransaction({ update: [element] });
              }
          });
          
          this.tg.rowData = detailMasterData;
          console.log("Total Master-Details Records: " + this.tg.rowData.length);
          //console.log("All Master-Details Items: " + JSON.stringify(this.rowData));
        },
        (err) => {
          console.log(err)
        },
    );
  }

onBtnShowDefaultColumns() {
  this.tg.gridApi.setColumnDefs(defaultBriefColDef);
  this.tmlistitemsService.getLoggedUserAuth().then(res => {
      this.logedInUser = res;
      from(
          this.tmlistitemsService.getMasterListItems(res)
      ).subscribe(
          (Response) => {
              this.tg.rowData = JSON.parse(JSON.stringify(Response));
              console.log("Total Records: " + this.tg.rowData.length);
              //console.log("Fetched Items: " + JSON.stringify(Response));
          },
          (err) => {
              console.log(err)
          },
      );
    });
}
//---------------ends ---------

  getSelectedRows() {
    // const selectedNodes = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNodes.map( node => node.data );
    // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
  
}

let defaultBriefColDef = [{
  headerName: 'RequestID',
  field: 'RequestID',
  sortable: true,
  //rowGroup: true,
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

},
{
  headerName: 'Requestor Details',
  children: [{
          headerName: 'Emp.ID',
          field: 'RequestorEmployeeID',
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
          headerName: 'Employee Name',
          field: 'RequestorName',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 220,
          //columnGroupShow: 'open',
          //cellEditor: 'agRichSelectCellEditor', 
      },
      {
          headerName: 'Employee Email',
          field: 'RequestorEmail',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 280,
          columnGroupShow: 'open',
          //hide:true
      },
      {
          headerName: 'Employee Office',
          field: 'RequestorLocation',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 180,
          columnGroupShow: 'open',
      },
      {
          headerName: 'Bus.Area',
          field: 'RequestorBusinessArea',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          columnGroupShow: 'open',
          minWidth: 120,
          //hide:true
      },
  ]
},

{
  headerName: 'Division',
  field: 'Division',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
}, {
  headerName: 'MerchandizingType',
  field: 'MerchandizingType',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 180,
},
{
  headerName: 'Vendor Details',
  children: [{
          headerName: 'Vendor Name',
          field: 'VendorName',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 200,
          //columnGroupShow: 'open',
      },
      {
          headerName: 'Vendor Code',
          field: 'VendorCode',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 140,
          columnGroupShow: 'open',
          //hide:true
      }, {
          headerName: 'Vendor Address',
          field: 'VendorAddress',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 280,
          columnGroupShow: 'open',
          //hide:true
      }, {
          headerName: 'Vendor Email',
          field: 'VendorEmail',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 250,
          columnGroupShow: 'open',
          //cellEditor: 'agLargeTextCellEditor',
          //hide:true
      }, {
          headerName: 'Vendor Status',
          field: 'VendorStatus',
          sortable: true,
          //enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 140,
          columnGroupShow: 'open',
          //hide:true
      },
  ]
},
{
  headerName: 'Total Amount',
  field: 'TotalAmount',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  hide: true
},
{
  headerName: 'Request Status',
  children: [{
          headerName: 'Request Status',
          field: 'RequestStatus',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          cellEditorParams: {
              values: ['Submitted', 'Completed', 'Rejected'],
          },
          minWidth: 150,
          //columnGroupShow: 'closed'
      },
      {
          headerName: 'Approval Status',
          field: 'ApprovalStatus',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 200,
          columnGroupShow: 'open',
          hide: true
      },
      {
          headerName: 'Pending With',
          field: 'PendingTo', 
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          minWidth: 200,
          columnGroupShow: 'open'
      },
      {
          headerName: 'Last Modified',
          field: 'Modified',
          sortable: true,
          enableRowGroup: false,
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
          },
          valueFormatter: function(params) {
              return moment(params.value).format('DD MMM, YYYY');
          },
          minWidth: 140,
          columnGroupShow: 'open',
          cellEditor: 'datePicker',
          cellStyle: function(params) {
            if(params.data.RequestStatus != 'Completed' && ((new Date().getTime() - new Date(params.data.Modified).getTime())/(1000 * 60 * 60 * 24)) > 3){
              return { backgroundColor: '#ffaaaa' };
            }
          },
          //hide:true,
          // editable: true,
      },

      {
          headerName: 'Created',
          field: 'Created',
          sortable: true,
          //enableRowGroup: true,
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
          },
          valueFormatter: function(params) {
              return moment(params.value).format('DD MMM, YYYY');
          },
          columnGroupShow: 'open',
          // editable: true,
          // cellEditor: 'datePicker',
          // cellClassRules: {
          //   'rag-green-outer': function(params) {
          //     return params.value === 2008;
          //   },
          //   'rag-amber-outer': function(params) {
          //     return params.value === 2004;
          //   },
          //   'rag-red-outer': function(params) {
          //     return params.value === 2000;
          //   },
          // },

      },
  ]
},
{
  headerName: 'View/Action',
  field: 'ID',
  cellRendererFramework: TmliviewbtncstmComponent,
}
];

let allMasDetColDef = [
{
  headerName: 'RequestID',
  field: 'RequestID',
  sortable: true,
  rowGroup: false,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  headerCheckboxSelection: true, //for appearing in Grid
  headerCheckboxSelectionFilteredOnly: true,
  checkboxSelection: true, //for appearing in each row
  menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],

},
{
  headerName: 'Emp.ID',
  field: 'RequestorEmployeeID',
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
  headerName: 'Employee Name',
  field: 'RequestorName',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 200,
  //columnGroupShow: 'open',
  //cellEditor: 'agRichSelectCellEditor', 
},
{
  headerName: 'Employee Email',
  field: 'RequestorEmail',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 200,
  columnGroupShow: 'open',
  //hide:true
},
{
  headerName: 'Employee Office',
  field: 'RequestorLocation',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 160,
  columnGroupShow: 'open',
},
{
  headerName: 'Bus.Area',
  field: 'RequestorBusinessArea',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  columnGroupShow: 'open',
  minWidth: 120,
  //hide:true
},
{
  headerName: 'Division',
  field: 'Division',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
}, 
{
  headerName: 'MerchandizingType',
  field: 'MerchandizingType',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 180,
},
{
  headerName: 'Vendor Name',
  field: 'VendorName',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 200,
  //columnGroupShow: 'open',
},
{
  headerName: 'Vendor Code',
  field: 'VendorCode',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 140,
  columnGroupShow: 'open',
  //hide:true
}, {
  headerName: 'Vendor Address',
  field: 'VendorAddress',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 280,
  columnGroupShow: 'open',
  //hide:true
}, {
  headerName: 'Vendor Email',
  field: 'VendorEmail',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 200,
  columnGroupShow: 'open',
  //cellEditor: 'agLargeTextCellEditor',
  //hide:true
}, {
  headerName: 'Vendor Status',
  field: 'VendorStatus',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 140,
  columnGroupShow: 'open',
  //hide:true
},
{
  headerName: 'Total Amount',
  field: 'TotalAmount',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  hide: true
},
{
  headerName: 'Request Status',
  field: 'RequestStatus',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  cellEditorParams: {
      values: ['Submitted', 'Completed', 'Rejected'],
  },
  minWidth: 150,
  //columnGroupShow: 'closed'
},
{
  headerName: 'Approval Status',
  field: 'ApprovalStatus',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 200,
  columnGroupShow: 'open',
  hide: true
},
{
  headerName: 'Pending With',
  field: 'PendingTo',
  sortable: true,
  enableRowGroup: true,
  filter: 'agTextColumnFilter',
  filterParams: {
      applyButton: true,
      resetButton: true,
  },
  minWidth: 180,
  columnGroupShow: 'open'
},
{
  headerName: 'Last Modified',
  field: 'Modified',
  sortable: true,
  enableRowGroup: false,
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
  },
  valueFormatter: function(params) {
      return moment(params.value).format('DD MMM, YYYY');
  },
  minWidth: 140,
  columnGroupShow: 'open',            
  cellEditor: 'datePicker',
  cellStyle: function(params) {
    if(params.data.RequestStatus != 'Completed' && ((new Date().getTime() - new Date(params.data.Modified).getTime())/(1000 * 60 * 60 * 24)) > 3){
      return { backgroundColor: '#ffaaaa' };
    }
  },
  //hide:true,
  // editable: true,
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
  },
  valueFormatter: function(params) {
      return moment(params.value).format('DD MMM, YYYY');
  },
  columnGroupShow: 'open',
  // editable: true,
  // cellEditor: 'datePicker',
  // cellClassRules: {
  //   'rag-green-outer': function(params) {
  //     return params.value === 2008;
  //   },
  //   'rag-amber-outer': function(params) {
  //     return params.value === 2004;
  //   },
  //   'rag-red-outer': function(params) {
  //     return params.value === 2000;
  //   },
  // },

},
{
  field: 'CustomerType',
  columnGroupShow: 'open',
  minWidth: 150,
},
{
  field: 'RequestType',
  columnGroupShow: 'open',
  minWidth: 150,
},
{
  field: 'SubDealerName',
  columnGroupShow: 'open',
  minWidth: 180,
},
{
  field: 'TaggedDelearCode',
  columnGroupShow: 'open',
  minWidth: 180,
},
{
  field: 'CustomerCodeOrName',
  columnGroupShow: 'open',
  minWidth: 210,
},
{
  field: 'CustomerAddress',
  columnGroupShow: 'open',
  minWidth: 170,
},
{
  field: 'ContactPerson',
  columnGroupShow: 'closed',
  minWidth: 150,
},
{
  field: 'ContactNumber',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'YearlyTarget',
  columnGroupShow: 'open',
  minWidth: 150,
},
{
  field: 'WorkType',
  columnGroupShow: 'open',
  minWidth: 150,
},
{
  field: 'SignboardType',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'WidthByRequestor',
  columnGroupShow: 'open',
  minWidth: 175,
},
{
  field: 'HeightByRequestor',
  columnGroupShow: 'open',
  minWidth: 180,
},
{
  field: 'NumberOfSignboard',
  columnGroupShow: 'closed',
  minWidth: 160,
},
{
  field: 'ExistingBrand',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'PreferredBrand',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'TentativeDate',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'WidthByVendor',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'HeightByVendor',
  columnGroupShow: 'open',
  minWidth: 165,
},
{
  field: 'TotalSizeByVendor',
  columnGroupShow: 'open',
  minWidth: 180,
},
{
  field: 'PerSFTRate',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'TotalRate',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'VendorCode',
  columnGroupShow: 'open',
  minWidth: 160,
},
{
  field: 'OtherCost',
  columnGroupShow: 'open',
  minWidth: 160,
}
];

function handleError(error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const body = //error.json() || { error: null };
    error.json().then(body => {
      if (!body) {
          body = "";
      }
  
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  });
    //const err = body.error || JSON.stringify(body);
    //errMsg = `${error.status || ''} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}


