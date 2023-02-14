import { Component, OnInit } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
//========to covert promise to observer======
import {
  forkJoin,
  //of,
  from,
  //observable, 
  //Observable, 
  //Subject,
  //pipe
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
import { Pipe } from '@angular/core';
//import { groupBy, tap, mergeMap, reduce, map } from 'rxjs/operators';
//import { GroupedObservable } from 'rxjs/internal/operators/groupBy';
import { 
  //IValueItems, 
  IMyProcessItems 
} from 'src/app/list-interface';
//import { LiactionbtncstmComponent } from 'src/app/shared/components/liactionbtncstm/liactionbtncstm.component';
//import { SuplycapexvwbtncstmComponent } from 'src/app/shared/CustomButtons/suplycapexvwbtncstm/suplycapexvwbtncstm.component';


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
  selector: 'app-mobilehandsetmstr',
  templateUrl: './mobilehandsetmstr.component.html',
  styleUrls: ['./mobilehandsetmstr.component.scss']
})



export class MobilehandsetmstrComponent implements OnInit { 
  public rowDataCM: string;
  public rowDataWP: any;
  mpTG = new Tablegrid(); 
  allMpTg = new Tablegrid();  
  public workflows = [];
  rowData: any;
  public allGroups: Array<WorkflowGroup>;
  public allWF: Array<IMyProcessItems>;

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
  };
  
  constructor(private sharepointlistService:SharepointlistService) { 
    
    //========for my Prcess =========
    this.mpTG.columnDefs = myProcessColDef;
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
      editable: true,
    };

     //===========for action btn link rendering start ===
    this.mpTG.frameworkComponents = {
      //customizedAgeCell: LiactionbtncstmComponent,
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
         // checkbox: true
      },
    };
    //------------ subitem fetures ends -----------
  }

  ngOnInit() { 
    //==============for merging old list star==================
    let oldList ={
      name: "MobileHandsetRequests",
      query: 'Title'+","+'ID'+","+'ItemStatus'+","+'GUID'+","+'Modified'+","+'Created'+","+'Author/ID'+","+'Author/Title', 
      expand: 'Author',
    };

    

    this.listInfo.name = "MobileHandsetRequests";
    this.listInfo.query = 'Title'+","+'PendingWith'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created'+","+'PendingWith/ID'+","+'PendingWith/Title'+","+'Author/ID'+","+'Author/Title';
    this.sharepointlistService.getSPLoggedInUser().then((res)=> {
      from(
        this.sharepointlistService.getUsersWFMasterListItems(this.listInfo, res)
        ).subscribe(
          (items) =>{ 
            //var listItems = items;
            this.rowData = items;             
          },
          (err) => {
              console.log(err)
          },
        );
    });
  }


  onGridReady(params) {
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
    // headerCheckboxSelection: true, //for appearing in Grid
    // headerCheckboxSelectionFilteredOnly: true,
    // checkboxSelection: true, //for appearing in each row
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    minWidth: 60,
  },
  {
    headerName: 'Created on',
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
    minWidth: 60,
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
    minWidth: 60,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
  },
  {
    headerName: 'Last modified on',
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
    minWidth: 80,
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
    headerName: 'Pending with',
    field: 'PendingWith.Title',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 80,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
  },
  {
    headerName: 'View/Action',
    field: 'GUID',
    cellRendererFramework: MyprocessviewbtncstmComponent,
    //cellRendererFramework: SuplycapexvwbtncstmComponent,
    enableRowGroup: false,
    menuTabs: ['generalMenuTab', 'columnsMenuTab'],
  }
];
