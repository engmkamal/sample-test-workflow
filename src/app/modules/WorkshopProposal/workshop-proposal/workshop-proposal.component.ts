import { Component, OnInit } from '@angular/core';
import { ListWithSppnpjsService } from '../../../list-with-sppnpjs.service'; // activate only if use ListWithSpfxService and inject inside constructor


import {Observable} from 'rxjs';
import {
  AgGridAngular
} from 'ag-grid-angular';
// import {
//   AllModules
// } from '@ag-grid-enterprise/all-modules';
import {
  HttpClient
} from '@angular/common/http';
import {
  initialiseAgGridWithWebComponents
} from 'ag-grid-community';

// or, if using Enterprise features
import {
  Grid,
  GridOptions,
  AllModules
} 
from "@ag-grid-enterprise/all-modules"; 
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

import { LiActionBtnCstmComponent } from '../../../modules/WorkshopProposal/li-action-btn-cstm/li-action-btn-cstm.component';
import { ValueItems } from '../workshop-proposal-list';

//========for date formating =======
import {Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

import * as moment from 'moment';

import { of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';



@Component({
  selector: 'app-workshop-proposal',
  templateUrl: './workshop-proposal.component.html',
  styleUrls: ['./workshop-proposal.component.scss']
})
export class WorkshopProposalComponent implements OnInit {

  public gridOptions: GridOptions = < GridOptions > {};

  rowData: any[] = [];
  //valueWithRowData:WorkshopProposal;
  columnDefs: any;
  autoGroupColumnDef: any;
  rowGroupPanelShow: any;
  

  public gridApi;
  public gridColumnApi;
  public modules: any[] = AllModules;
  public defaultColDef;
  public txtOfQuickSearchInpFld;

  public detailCellRendererParams;

  private frameworkComponents;
  public masterGridOptions;

  public sideBar;
  public statusBar;

  // WorkshopProposal:WorkshopProposal[] = [];

  // WorkshopProposalTest: WorkshopProposalTest[] =[];
  ValueItems:ValueItems[] = [];

  constructor(private http: HttpClient, private ListWithSppnpjsService:ListWithSppnpjsService) {
    this.masterGridOptions = {
      columnDefs: [{
          headerName: 'Title',
          field: 'Title',
          //rowGroup: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          // getQuickFilterText: function(params) {
          //   return params.value.name;
          // },       

      },
      {
          headerName: 'EmployeeID',
          field: 'EmployeeID',
          enableRowGroup: true,
          sortable: true,
          filter: 'agTextColumnFilter', 
          filterParams: {
              applyButton: true,
              resetButton: true,
          },
          //cellRenderer:'CustomViewComponent',
          ////cellRendererFramework:CustomViewComponent,
      },
      
      {
          headerName: 'Employee Name',
          field: 'Author.Title',
          sortable: true,
          filter: true
      },
      {
        headerName: 'Status',
        field: 'Status', 
        sortable: true,
        filter: true,
        aggFunc: 'sum',
      },
      {
        headerName: 'PendingWith',
        field: 'PendingWith.Title',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Created',
        field: 'Created',
        sortable: true,
        filter: true
      },
      {
        headerName: 'View/Action',
        field: 'GUID',
        cellRenderer: 'agGroupCellRenderer',          
      }
  ],
      //rowData: null,
  
      // enable master detail
      masterDetail: true,  
      
    }

    this.gridOptions = {
        defaultColDef: {
            sortable: true,
        },          
        rowData: null,
        autoGroupColumnDef: {
            headerName: 'Status',
            field: 'Status',
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
                //footerValueGetter: '"Total (" + x + ")"',  
                //footerValueGetter: params => 'Footer' + params.price,
                //footerValueGetter: function(params) { return 'Total (' + params.value + ')'; },
                checkbox: true,
            },
            sortable: true,
        },
        groupIncludeFooter: true,
        groupIncludeTotalFooter: true,
        //suppressDragLeaveHidesColumns:true,
        //suppressMakeColumnVisibleAfterUnGroup: true,
        
    };

  //   this.autoGroupColumnDef = {
  //       headerName: 'Model',
  //       field: 'model',
  //       cellRenderer: 'agGroupCellRenderer',
  //       cellRendererParams: {
  //           checkbox: true,
  //       },
  //       sortable: true,
  //   };

  // this.columnDefs = [
  //     {
  //       headerName: 'RequestID',
  //       field: 'Title',
  //       sortable: true,
  //       //rowGroup: true,
  //       enableRowGroup: false,            
  //       filter: 'agTextColumnFilter',
  //       filterParams: {
  //           applyButton: true,
  //           resetButton: true,
  //       }, 
  //       menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
  //       }, {
  //           headerName: 'EmployeeID',
  //           field: 'EmployeeID',
  //           sortable: true,
  //           enableRowGroup: true,            
  //           filter: 'agTextColumnFilter',
  //           filterParams: {
  //               applyButton: true,
  //               resetButton: true,
  //           },
  //       }, {
  //           headerName: 'Employee Name',
  //           field: 'Author.Title',
  //           sortable: true,
  //           enableRowGroup: true,
  //           filter: 'agTextColumnFilter',
  //           filterParams: {
  //             applyButton: true,
  //             resetButton: true,
  //           },
  //       }, {
  //           headerName: 'Request Status',
  //           field: 'Status',
  //           sortable: true,
  //           enableRowGroup: true,
  //           filter: 'agTextColumnFilter',
  //           filterParams: {
  //             applyButton: true,
  //             resetButton: true,
  //           },
  //       }, {
  //         headerName: 'Pending With',
  //         field: 'PendingWith.Title',
  //         sortable: true,
  //         enableRowGroup: true,
  //         filter: 'agTextColumnFilter',
  //         filterParams: {
  //           applyButton: true,
  //           resetButton: true,
  //         },
  //     }, {
  //       headerName: 'Created',
  //       field: 'Created',
  //       sortable: true,
  //       enableRowGroup: true,
  //       filter: 'agDateColumnFilter',
  //       filterParams: {
  //         comparator: function(filterLocalDateAtMidnight, cellValue) {
  //           //var dateAsString = cellValue;
  //           var dateAsString = moment(cellValue).format('DD/MM/YYYY');
  //           var dateParts = dateAsString.split('/');
  //           var cellDate = new Date(
  //             Number(dateParts[2]),
  //             Number(dateParts[1]) - 1,
  //             Number(dateParts[0])
  //           );
  //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
  //             return 0;
  //           }
  //           if (cellDate < filterLocalDateAtMidnight) {
  //             return -1;
  //           }
  //           if (cellDate > filterLocalDateAtMidnight) {
  //             return 1;
  //           }
  //         },
  //       },        
  //       valueFormatter: function (params){
  //         return moment (params.value).format ('DD MMM, YYYY');
  //       }
        
  //   }, {
  //     headerName: 'View/Action',
  //     field: 'GUID',
  //     // //cellRenderer: 'agGroupCellRenderer', 
  //     cellRendererFramework:LiActionBtnCstmComponent,        
      
  //   }
  // ];

    this.columnDefs = [{
            headerName: 'Title',
            field: 'Title',
            sortable: true,
            //rowGroup: true,
            enableRowGroup: false,            
            filter: 'agTextColumnFilter',
            filterParams: {
                applyButton: true,
                resetButton: true,
            }, 
			menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],			
            // getQuickFilterText: function(params) {
            //   return params.value.name;
            // }, 
            
            //cellRenderer:'CustomViewComponent',
              

        },
        {
            headerName: 'EmployeeID',
            field: 'EmployeeID',
            sortable: true,
            enableRowGroup: true,            
            filter: 'agTextColumnFilter',
            filterParams: {
                applyButton: true,
                resetButton: true,
            },
        },
        {
            headerName: 'Employee Name',
            field: 'Author.Title',
            sortable: true,
            enableRowGroup: true,
            filter: 'agTextColumnFilter',
            filterParams: {
              applyButton: true,
              resetButton: true,
            },
        },
        {
            headerName: 'Status',
            field: 'Status',
            sortable: true,
            enableRowGroup: true,
            filter: 'agTextColumnFilter',
            filterParams: {
              applyButton: true,
              resetButton: true,
            },
        },{
          headerName: 'PendingWith',
          field: 'PendingWith.Title',
          sortable: true,
          enableRowGroup: true,
          filter: 'agTextColumnFilter',
          filterParams: {
            applyButton: true,
            resetButton: true,
          },
      },{
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
        valueFormatter: function (params){
          return moment (params.value).format ('DD MMM, YYYY');
        }
        
    },
        {
          headerName: 'View/Action',
          field: 'GUID',
          // //cellRenderer: 'agGroupCellRenderer', 
          cellRendererFramework:LiActionBtnCstmComponent, 
          //cellRendererFramework:MyprocessviewbtncstmComponent,       
          
        }
    ];

    this.defaultColDef = {
        flex: 1,
        minWidth: 150,
    };
    //======== to display the header panel of 'drag here to set row groups' 
    this.rowGroupPanelShow = 'always';

    //========implementing master details start==========
    // specify params for default detail cell renderer
    this.detailCellRendererParams = {
      // provide detail grid options
      detailGridOptions: {
          columnDefs: [
              { field: 'callId' },
              { field: 'direction' },
              {
                  field: 'number',
                  minWidth: 150,
              },
              {
                  field: 'duration',
                  valueFormatter: "x.toLocaleString() + 's'",
              },
              // {
              //     field: 'switchCode',
              //     minWidth: 150,
              // },
          ],
          defaultColDef: {
              flex: 1,
              sortable: true,
          },
      },
      // extract and supply row data for detail
      getDetailRowData: function(params) {
          params.successCallback([{
                callId: 555678,
                direction: 'Out',
                number: '(0045798)',
              //   duration: '23s',
              //   switchCode:'SW5',
            },
            {
                callId: 555678,
                direction: 'Out',
                number: '(0045798)',
              //   duration: '23s',
              //   switchCode:'SW5',
            },]);
      },
    }; 
  
    this.sideBar = 'columns';
    this.sideBar = {
      toolPanels: [
        'filters',
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: { suppressSyncLayoutWithGrid: true },
        },
      ],
    };
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'left',
          key: 'totalRowComponent',
        },
        {
          statusPanel: 'agFilteredRowCountComponent',
          align: 'left',
        },
        {
          statusPanel: 'agSelectedRowCountComponent',
          align: 'center',
        },
        {
          statusPanel: 'agAggregationComponent',
          align: 'right',
        },
      ],
    };
    this.frameworkComponents ={
      customizedAgeCell: LiActionBtnCstmComponent,
    }

    let eGridDiv: HTMLElement = < HTMLElement > document.querySelector('#myGrid');
    new Grid(eGridDiv, this.gridOptions);
  }

  ngOnInit() { 
   
    
      from(
        this.ListWithSppnpjsService.getWPListItems()
      ).subscribe(Response => this.rowData = Response);

     

   
    // this.ListWithSppnpjsService.getListItems().subscribe (
    //   (Response) => {
    //     this.rowData = JSON.parse(JSON.stringify(Response));
        
    //       console.log("Fetched from Componet with stringify: "+JSON.parse(JSON.stringify(Response)));
        
    //        console.log("Fetched Title from Componet: "+this.rowData[3].Title);
    //        console.log("Fetched Created from Componet: "+this.rowData[3].Created);
    //        console.log("Fetched GUID from Componet: "+this.rowData[3].GUID);
    //        console.log("Fetched from Componet: "+this.rowData[3].Status);
    //        console.log("Fetched from Componet--PendingWith--"+this.rowData[3].PendingWith.Title);
    //        console.log("Fetched from Componet--Author--"+this.rowData[3].Author.Title);
         
    //   },
    //   (err) =>{console.log(err)},
    //   );


      // this.rowData =
      // [
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-82",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-81",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-80",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-79",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-78",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-77",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-76",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-75",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-82",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-81",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-80",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-79",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-78",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-77",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-76",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-75",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-82",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-81",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-80",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-79",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-78",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-77",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-76",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-75",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-82",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-81",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-80",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-79",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-78",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-77",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-76",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-75",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-82",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-81",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-80",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-79",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-78",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-77",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-76",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-75",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-82",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-81",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-80",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-79",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      //   {
          
      //     PendingWith: {Title: "Workflow 2nd Approver"},
      //     Author: {Title: "Workflow Requestor"},
      //     Title: "WP-78",
      //     Status: "Submitted",
      //     EmployeeID: "9001",
      //     Created: '2019-12-02T13:10:12Z',
      //     GUID: "36bcd5bb-f25b-46a7-b7d9-541a912e13bb",
         
      //   },
      //   {
          
      //     PendingWith: {Title: "First Approver"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-77",
      //     EmployeeId: 1026,
      //     Status: "ReimbursementUserToGMMarketing",
      //     EmployeeID: "9009",
      //     Created: "2019-12-02T13:10:12Z",
      //     GUID: "e63cba5a-c8f3-4667-b774-c34ba82293a9"
      //   },
      //   {
          
      //     PendingWith: {Title: "Operational Manager"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-76",
      //     EmployeeId: 1026,
      //     Status: "GMMarketingToMarketingAccountant",
      //     EmployeeID: "9009",
      //     Created: "2019-11-04T06:50:46Z",
      //     GUID: "b83bbe61-41cc-447f-a928-36d82a2a69fa",
      //   },
      //   {
          
      //     PendingWith: {Title: "Mostafa Kamal"},
      //     Author: {Title: "Mostafa Kamal"},
      //     Title: "WP-75",
      //     EmployeeId: 9009,
      //     Status: "ProposalApproved&ActualBillSubmissionRequest",
      //     EmployeeID: null,
      //     Created: "2019-11-03T05:40:25Z",
      //     GUID: "3b5bf2bb-47be-4cd6-94d5-7de37280a734",
      //   },
      // ];
  }

  //===================== Export Table data to Excel start ==============
  onBtnExportDataAsExcel() {
    function rowGroupCallback(params) {
        return params.node.key;
    }

    this.gridApi.exportDataAsExcel({
        processRowGroupCallback: rowGroupCallback,
    });
  }
  //===================== Export Table data to Excel end ==============

  //=============== Quick central filter function start ========== 
  //--------method-1: (with angular)--------
  quickSearch() {
    this.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }
  //--------method-2: (with Jquery)--------required to include oninput=onFilterTextBoxChanged() in html file--------
  // onFilterTextBoxChanged(){
  //   this.gridApi.setQuickFilter(document.querySelector('#filter-text-box'));
  // }
  //=============== Quick central filter function ends ==========

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;   



    //======================= can be get list Items with TS =====================
    // this.http
    //     .get("https://mkspworld.sharepoint.com/_api/web/lists/getByTitle('WorkshopProposalMaster')/items?&$top=20000&$select=Title,EmployeeID,Author/Title,Status,PendingWith/Title,Created,GUID&$expand=Author/ID,PendingWith/ID&$orderby= Created desc")
    //     .toPromise()
    //     .then(
    //       res => {
    //         //this.WorkshopProposal =  JSON.stringify(res)
    //         //params.api.setRowData(JSON.stringify(res));
    //         console.log("The Output from onGridReady (after implicitly stringify) is----------------:" + JSON.stringify(res));
            
    //       }
    //     )
    //--------------------successfully working ---------------------------------
  }

}
