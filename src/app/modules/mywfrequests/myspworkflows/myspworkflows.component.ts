import { Component, OnInit } from '@angular/core';

// import {
//   HttpClient
// } from '@angular/common/http';

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
import { Tablegrid } from 'src/app/shared/models/classes/tablegrid';

//==========import services starts==============
// import { ListWithSppnpjsService } from '../../../list-with-sppnpjs.service'; // activate only if use ListWithSpfxService and inject inside constructor
// import {
//   CmlistitemsService
// } from '../../../modules/changemanagement/cmlistitems.service';
// import { TmlistitemsService } from '../../trademerchandising/tmlistitems.service';
//----------- impot services ends -------

//==========import view btn cstm component ==========
import {
  MyprocessviewbtncstmComponent
} from '../../../shared/components/myprocessviewbtncstm/myprocessviewbtncstm.component';
import { LiActionBtnCstmComponent } from '../../../modules/WorkshopProposal/li-action-btn-cstm/li-action-btn-cstm.component';
// import {
//   TmliviewbtncstmComponent
// } from '../../../modules/trademerchandising/tmliviewbtncstm/tmliviewbtncstm.component';
//-----------ends ---------------

//===========for date formate ======
import * as moment from 'moment';
//---------date formate ends ---

import { SharepointlistService } from 'src/app/shared/services/sharepointlist.service';
import { Pipe } from '@angular/core';

import { groupBy, tap, mergeMap, reduce, map } from 'rxjs/operators';
import { GroupedObservable } from 'rxjs/internal/operators/groupBy';
//import { group } from '@angular/animations';
import { IValueItems, IMyProcessItems } from 'src/app/list-interface';
//import { LiactionbtncstmComponent } from 'src/app/shared/components/liactionbtncstm/liactionbtncstm.component';

//import {webSocket, WebSocketSubject} from 'rxjs/webSocket';




interface Workflow {
  ID?: number;
  Title: string; 
  ProcessName: string; 
  RequestedByName:string; 
  Status:string;
  EmployeeID?: string;
  RequestedByEmail?: string;
  RequestLink: string; 
  Modified: any;
  Created: any;
  PendingWith: any;
  Author: any;
  GUID: string;
}
interface WorkflowGroup{
  key: string;
  value: Array<Workflow>;
}

@Component({
  selector: 'app-myspworkflows',
  templateUrl: './myspworkflows.component.html',
  styleUrls: ['./myspworkflows.component.scss']
})


export class MyspworkflowsComponent implements OnInit { 
  public rowDataCM: string;
  public rowDataWP: any;

  // cmTG = new Tablegrid();
  // tmTG = new Tablegrid();
  // wpTG = new Tablegrid(); 

  mpTG = new Tablegrid(); 
  allMpTg = new Tablegrid();

  public workflows = [];

  rowData: any;

  public allGroups: Array<WorkflowGroup>;
  public allWF: Array<IMyProcessItems>;
  
  constructor(private sharepointlistService:SharepointlistService) { 
    
    //========for my Prcess =========
    this.mpTG.columnDefs = myProcessColDef;
    
    this.allMpTg.columnDefs = myProcessAllColDef;
    //-----------------ends --------
    //============for change Management start========
    this.mpTG.defaultColDef = {
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

    //this.cmTG.columnDefs = defaultCMBriefColDef;

    //===========for action btn link rendering start ===
    this.mpTG.frameworkComponents = {
      customizedAgeCell: MyprocessviewbtncstmComponent,
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
          checkbox: true
      },
    };
    //------------ subitem fetures ends -----------
    //----------------change Management ends --------

    //========== Workshop Proposal stat =========
    
    //this.wpTG.columnDefs = defaultWPBriefColDef;

    //===========for action btn link rendering start ===
    this.mpTG.frameworkComponents = {
      customizedAgeCell: LiActionBtnCstmComponent,
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
          checkbox: true
      },
    };
    //------------ subitem fetures ends -----------
    //---------------WP ends --------    
  }

  ngOnInit() {
    
    let data:Workflow[] = [];
    from(
      this.sharepointlistService.getLoggedInUsersDashboards()
      //this.sharepointlistService.getLoggedInUsersProcess()
      ).subscribe(
        (items) =>{ 
          this.allWF = items;
          let groups = [];
          //this.allGroups = groups;
          from(this.allWF)
          .pipe(
            groupBy((workflow: Workflow) => workflow.ProcessName),
            mergeMap((workflowsGroup$: GroupedObservable<string, Workflow>) =>
              workflowsGroup$.pipe(
                reduce((acc: Array<Workflow>, cur: Workflow) => [...acc, cur], []),
                map((arr: Array<Workflow>) => {
                  return {
                    key: arr[0].ProcessName,
                    value: [...arr]
                  };
                }),
                //tap((data: WorkflowGroup) => {this.allGroups.push(data); console.log(data); console.log(this.allGroups.length)})
                tap((data: WorkflowGroup) => {groups.push(data); console.log(data); console.log(groups.length)})
              )
            )
          )
          .subscribe(()=>{
            this.allGroups = groups;
          
          });

           
        },
        (err) => {
            console.log(err)
        },
      );
   
  }

  onGridReady(params) {
    this.mpTG.gridApi = params.api;
    this.mpTG.gridColumnApi = params.columnApi;

    this.mpTG.gridApi = params.api;
    this.mpTG.gridColumnApi = params.columnApi;

   
  }


}

let myProcessColDef = [  
  {
  headerName: 'RequestID',
  field: 'Title',
  sortable: true,
  rowGroup: false,
  enableRowGroup: false,  
  filter: 'agSetColumnFilter',
  //filter: 'agTextColumnFilter',
  filterParams: {
      //applyButton: true,
      resetButton: true,
  },
  headerCheckboxSelection: true, //for appearing in Grid
  headerCheckboxSelectionFilteredOnly: true,
  checkboxSelection: true, //for appearing in each row
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
  minWidth: 120,
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
  minWidth: 130,
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
}, 
{
  headerName: 'PendingWith',
  field: 'PendingWith',
  sortable: true,
  enableRowGroup: true,
  filter: 'agSetColumnFilter',
  //filter: 'agTextColumnFilter',
  filterParams: {
      //applyButton: true,
      resetButton: true,
  },
  minWidth: 160,
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
},
{
  headerName: 'Last Modified',
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
          // if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          //     return 0;
          // }
          // if (cellDate < filterLocalDateAtMidnight) {
          //     return -1;
          // }
          // if (cellDate > filterLocalDateAtMidnight) {
          //     return 1;
          // }
      },
      applyButton: true,
      resetButton: true,
  },
  valueFormatter: function(params) {
      return moment(params.value).format('DD MMM, YYYY');
  },
  minWidth: 140,
  columnGroupShow: 'open',
  // cellEditor: 'datePicker',
  // cellStyle: function(params) {
  //   if(params.data.RequestStatus != 'Completed' && ((new Date().getTime() - new Date(params.data.Modified).getTime())/(1000 * 60 * 60 * 24)) > 3){
  //     return { backgroundColor: '#ffaaaa' };
  //   }
  // },
  
  //hide:true,
  // editable: true,
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
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
          // if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          //     return 0;
          // }
          // if (cellDate < filterLocalDateAtMidnight) {
          //     return -1;
          // }
          // if (cellDate > filterLocalDateAtMidnight) {
          //     return 1;
          // }
      },
      applyButton: true,
      resetButton: true,
  },
  valueFormatter: function(params) {
      return moment(params.value).format('DD MMM, YYYY');
  },
  columnGroupShow: 'open',
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
},
{
  headerName: 'View/Action',
  field: 'RequestLink',
  cellRendererFramework: MyprocessviewbtncstmComponent,
  //cellRendererFramework: LiactionbtncstmComponent,
  enableRowGroup: false,
  menuTabs: ['generalMenuTab', 'columnsMenuTab'],
}
];

let myProcessAllColDef = [
  {
    headerName: 'SP Workflow Name',
    field: 'ProcessName',
    sortable: true,
    rowGroup: false,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
  //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    headerCheckboxSelection: true, //for appearing in Grid
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true, //for appearing in each row
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    minWidth: 140,
  },
  {
  headerName: 'RequestID',
  field: 'Title',
  sortable: true,
  rowGroup: false,
  enableRowGroup: false,  
  filter: 'agSetColumnFilter',
  //filter: 'agTextColumnFilter',
  filterParams: {
      //applyButton: true,
      resetButton: true,
  },
  //headerCheckboxSelection: true, //for appearing in Grid
  //headerCheckboxSelectionFilteredOnly: true,
  //checkboxSelection: true, //for appearing in each row
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
  minWidth: 120,
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
  minWidth: 130,
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
}, 
{
  headerName: 'PendingWith',
  field: 'PendingWith',
  sortable: true,
  enableRowGroup: true,
  filter: 'agSetColumnFilter',
  //filter: 'agTextColumnFilter',
  filterParams: {
      //applyButton: true,
      resetButton: true,
  },
  minWidth: 160,
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
},
{
  headerName: 'Last Modified',
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
          // if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          //     return 0;
          // }
          // if (cellDate < filterLocalDateAtMidnight) {
          //     return -1;
          // }
          // if (cellDate > filterLocalDateAtMidnight) {
          //     return 1;
          // }
      },
      applyButton: true,
      resetButton: true,
  },
  valueFormatter: function(params) {
      return moment(params.value).format('DD MMM, YYYY');
  },
  minWidth: 140,
  columnGroupShow: 'open',
  // cellEditor: 'datePicker',
  // cellStyle: function(params) {
  //   if(params.data.RequestStatus != 'Completed' && ((new Date().getTime() - new Date(params.data.Modified).getTime())/(1000 * 60 * 60 * 24)) > 3){
  //     return { backgroundColor: '#ffaaaa' };
  //   }
  // },
  
  //hide:true,
  // editable: true,
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
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
          // if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          //     return 0;
          // }
          // if (cellDate < filterLocalDateAtMidnight) {
          //     return -1;
          // }
          // if (cellDate > filterLocalDateAtMidnight) {
          //     return 1;
          // }
      },
      applyButton: true,
      resetButton: true,
  },
  valueFormatter: function(params) {
      return moment(params.value).format('DD MMM, YYYY');
  },
  columnGroupShow: 'open',
  menuTabs: ['filterMenuTab', 'generalMenuTab'],
},
{
  headerName: 'View/Action',
  field: 'RequestLink',
  cellRendererFramework: MyprocessviewbtncstmComponent,
  //cellRendererFramework: LiactionbtncstmComponent,
  enableRowGroup: false,
  menuTabs: ['generalMenuTab', 'columnsMenuTab'],
}
];
