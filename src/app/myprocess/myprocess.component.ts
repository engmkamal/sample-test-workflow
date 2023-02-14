import { Component, OnInit } from '@angular/core';
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
//==========import view btn cstm component ==========
import {
  MyprocessviewbtncstmComponent
} from '../shared/components/myprocessviewbtncstm/myprocessviewbtncstm.component';
//===========for date formate ======
import * as moment from 'moment';
//---------date formate ends ---
import { SharepointlistService } from 'src/app/shared/services/sharepointlist.service';
import { Pipe } from '@angular/core';
import { groupBy, tap, mergeMap, reduce, map } from 'rxjs/operators';
import { GroupedObservable } from 'rxjs/internal/operators/groupBy';
import { IValueItems, IMyProcessItems } from 'src/app/list-interface';
import * as shareddata from '../shared/localfiles/processwiserecords.json';
import * as testdata from '../../app/data.json';

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
  selector: 'app-myprocess',
  templateUrl: './myprocess.component.html',
  styleUrls: ['./myprocess.component.scss']
})



export class MyprocessComponent implements OnInit { 
  public rowDataCM: string;
  public rowDataWP: any;
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
  }

  ngOnInit() {
    console.log(testdata);
    console.log(shareddata);
    
    // let fs2 = this.require('fs');

    // fs2.writeFile("../shared/localfiles/processwiserecords.json", JSON.stringify(this.obj), function(err) {
    //   if(err) {
    //     return console.log(err);
    //   }
    //   console.log("The file was saved!");
    // });

    
    let data:Workflow[] = [];
    // this.allGroups = this.sharepointlistService.getMasterListItems().then(data=>{
    //   this.allGroups = data.grouped;
    //   this.allWF = data.all;
    // });

    from(
      this.sharepointlistService.getLoggedInUsersProcess()
      //this.sharepointlistService.getAllWFListItems()
      //this.sharepointlistService.getMasterListItems()
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


            // const obj = {
            //   name: "Mr. A",
            //   address: "Com"
            // }
            // write JSON string to a file
            //var fs = require('fs');
            // fs.writeFile("../shared/localfiles/processwiserecords.json", "obj", function(err) {
            //     if(err) {
            //         return console.log(err);
            //     }

            //     console.log("The file was saved!");
            // });
          });

            // //================
            // from(this.output$).pipe(
            //   groupBy((workflow: Workflow) => workflow.ProcessName),
            //   // tap(console.log)
            //     mergeMap((workflowsGroup$: GroupedObservable<string, Workflow>) =>
            //     workflowsGroup$.pipe(
            //       reduce((acc: Array<Workflow>, cur: Workflow) => [...acc, cur], []),
            //       map((arr: Array<Workflow>) => {
            //         return {
            //           key: arr[0].ProcessName,
            //           value: [...arr]
            //         };
            //       }),
            //       tap((data: WorkflowGroup) => {this.allGroups.push(data); console.log(data); console.log("Total Workflows: "+this.allGroups.length)})
            //     )
            //   )
            // )
            // .subscribe();
            // //-------------
        },
        (err) => {
            console.log(err)
        },
      );

    // from(
    //   this.sharepointlistService.getGroupedListItems()
    //   ).subscribe(
    //     (Response)=>{
    //       //this.allGroups = JSON.parse(JSON.stringify(Response));
    //       this.allWF = JSON.parse(JSON.stringify(Response));
    //       //console.log(this.allGroups.length);
    //       //console.log("Total Groups: "+this.allGroups[0].key);
    //     },
    //     (err) => {
    //         console.log(err)
    //     },
    //   );



    // from(
    //   this.sharepointlistService.getGroupedListItems().group
    //   //this.sharepointlistService.getMasterListItems()
    //   ).subscribe(
    //     (Response) => {
    //       this.rowData = JSON.parse(JSON.stringify(Response));
    //       //console.log("Total Records: " + this.rowData.length);
    //       //console.log("Fetched Items: " + JSON.stringify(Response));
    //     },
    //     (err) => {
    //         console.log(err)
    //     },
    //   );

    // from(
    //   this.cmlistitemsService.getMasterListItems()
    //   ).subscribe(
    //       (Response) => {
    //           //this.cmTG.rowData = JSON.parse(JSON.stringify(Response));
    //           //=========for live streaming sart ========
    //           var mockServer = createMockServer();
    //           mockServer.init(JSON.parse(JSON.stringify(Response)));
    //           var viewportDatasource = createViewportDatasource(mockServer);
    //           params.api.setViewportDatasource(viewportDatasource);
    //           setTimeout(function () {
    //             params.api.sizeColumnsToFit();
    //           }, 100);
    //           //-----------live straming ends -----------
    //       },
    //       (err) => {
    //           console.log(err)
    //       },
    //   );  
      
      // from(
      //   this.listWithSppnpjsService.getWPListItems()
      //   ).subscribe(
      //       (Response) => {
      //         this.wpTG.rowData = JSON.parse(JSON.stringify(Response));
      //       },
      //       (err) => {
      //           console.log(err)
      //       },
      //   );
    //==============worked 100% OK star==================
    // forkJoin([
    //   //this.cmlistitemsService.getMasterListItems(),
    //   this.cmlistitemsService.getMasterListItems(), 
    //   this.listWithSppnpjsService.getWPListItems()
    // ])
    //   .subscribe(result => {
    //       this.cmTG.rowData = result[0];
    //       //this.tmTG.rowData = result[1];
    //       this.wpTG.rowData = result[1];          
    //       //building your dataSource here

    //       this.workflows = [
    //         {name:"Change Management", cols:this.cmTG.columnDefs, rData:result[0],},
    //         {name:"Workshop Proposal", cols:this.wpTG.columnDefs, rData:result[1],}    
    //       ];
    //   });
    //--------------ends 100% OK---------
      
      // forkJoin([this.cmlistitemsService.getMasterListItems(), this.tmlistitemsService.getMasterListItems(), this.listWithSppnpjsService.getWPListItems()])
      //   .subscribe(result => {
      //     this.cmTG.rowData = result[0];
      //     this.tmTG.rowData = result[1];
      //     this.wpTG.rowData = result[2]; 
      // });
  }

  onGridReady(params) { }


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
  field: 'PendingWith',
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
  minWidth: 80,
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
  minWidth: 80,
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
 



