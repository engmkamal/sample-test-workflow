import {
    Component,
    OnInit
  } from '@angular/core';
  
  import {
    HttpClient
  } from '@angular/common/http';
  
  import {
    Grid,
    GridOptions,
    AllModules
  }
  from "@ag-grid-enterprise/all-modules";
  
  import {
    ClientSideRowModelModule
  } from '@ag-grid-community/client-side-row-model';
  import {
    MenuModule
  } from '@ag-grid-enterprise/menu';
  import {
    SetFilterModule
  } from '@ag-grid-enterprise/set-filter';
  import {
    ColumnsToolPanelModule
  } from '@ag-grid-enterprise/column-tool-panel';
  import {
    ExcelExportModule
  } from '@ag-grid-enterprise/excel-export';
  import {
    RangeSelectionModule
  } from '@ag-grid-enterprise/range-selection';
  import {
    ClipboardModule
  } from '@ag-grid-enterprise/clipboard';
  import {
    GridChartsModule
  } from '@ag-grid-enterprise/charts';
  
  import {
    AccesswiselistitemsService
  } from '../../../accesswiselistitems.service';
  import {
    TmlistitemsService
  } from './../tmlistitems.service';
  
  //========for date formating start =======
  import {
    Inject,
    LOCALE_ID
  } from '@angular/core';
  import {
    formatDate
  } from '@angular/common';
  import * as moment from 'moment';
  //----for date formating ends ------
  
  import {
    TmliviewbtncstmComponent
  } from '../tmliviewbtncstm/tmliviewbtncstm.component';
   
  import '@ag-grid-community/core/dist/styles/ag-grid.css';
  import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
  
  import {
    mergeMap
  } from 'rxjs/operators';
  import { MyprocessviewbtncstmComponent } from 'src/app/shared/components/myprocessviewbtncstm/myprocessviewbtncstm.component';
  import {
    from,
    forkJoin,
    combineLatest
  } from 'rxjs';
  
  import { map, mergeAll } from 'rxjs/operators';
  //----------promise to observer ends -----
  
  @Component({
    selector: 'app-tmadvancedashboard',
    templateUrl: './tmadvancedashboard.component.html',
    styleUrls: ['./tmadvancedashboard.component.scss']
  })
  export class TmadvancedashboardComponent implements OnInit {
    public gridOptions: GridOptions = < GridOptions > {}; //adding for TMDB implementation
    public columnDefs;
    public rowGroupPanelShow;
    public sideBar;
    public statusBar;
    public frameworkComponents;
    public gridApi;
    public gridColumnApi;
    public txtOfQuickSearchInpFld;
    //public onGridReady;
    //public modules;
    public defaultColDef;
    //public modules: any[] = AllModules;
    public modules: any[] = [
        ClientSideRowModelModule,
        MenuModule,
        ExcelExportModule,
        RangeSelectionModule,
        ClipboardModule,
        GridChartsModule,
        SetFilterModule,
        ColumnsToolPanelModule,
        AllModules,
    ];
    public masterGridOptions;
    rowData: any;
    testData: any;
    public autoGroupColumnDef;
    public components;
  
    public logedInUser = {
      aDId: "",
      name: "",
      email: "",
      empID: "",
      office: "",
      access: "",
      //GetRecordsApiUrl:"",
    };
  
    masterTblData;
    exclusiveTblData;
    regularTblData;
    belsignTblData;
    walpaintingTblData;

    

    public exclusiveListInfo = {
        name: "",
        query: "",
        expand: "",
        select: "",
        filterBy: "",
        filterWith: "",
        top: 100000,   
      };

      public regularListInfo = {
        name: "",
        query: "",
        expand: "",
        select: "",
        filterBy: "",
        filterWith: "",
        top: 100000,   
      };

      public bellsignListInfo = {
        name: "",
        query: "",
        expand: "",
        select: "",
        filterBy: "",
        filterWith: "",
        top: 100000,   
      };

      public paintingListInfo = {
        name: "",
        query: "",
        expand: "",
        select: "",
        filterBy: "",
        filterWith: "",
        top: 100000,   
      };    
  
    constructor(private tmlistitemsService: TmlistitemsService) {
  
        this.defaultColDef = {
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
  
        this.columnDefs = allMasDetColDef;
        //this.columnDefs = defaultBriefColDef;
        
        //===========for action btn link rendering start ===
        this.frameworkComponents = {
            customizedAgeCell: TmliviewbtncstmComponent,
        }
        //--------for action btn link rendering start -------
        this.rowGroupPanelShow = 'always';
  
        //=========for setting features on every subgroup items start=======
        this.autoGroupColumnDef = {
            headerName: 'Group',
            field: 'RequestStatus',
            minWidth: 250,
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
                checkbox: true
            },
        };
        //------------ subitem fetures ends -----------   
  
        this.sideBar = {
            toolPanels: [
                'filters',
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    toolPanelParams: {
                        suppressSyncLayoutWithGrid: true,
                        suppressRowGroups: true,
                        suppressValues: true,
                    },
                },
            ],
            defaultToolPanel: 'filters',
        };
        this.statusBar = {
            statusPanels: [{
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
  
        this.components = {
            datePicker: getDatePicker()
        };
  
  
  
    }
  
    ngOnInit() {
        this.tmlistitemsService.getLoggedUserAuth().then(res => {
            this.logedInUser = res;
            // from(
            //     this.tmlistitemsService.getMasterListItems(res)
            // ).subscribe(
            //     (Response) => {
            //         this.masterTblData = JSON.parse(JSON.stringify(Response));
            //     },
            //     (err) => {
            //         console.log(err)
            //     },
            // );

            //===========get details tbl data=======
            this.exclusiveListInfo.expand = 'Author';
            this.exclusiveListInfo.top = 200;            
            this.exclusiveListInfo.name = "ShopMerchandizingExclusive";
            this.exclusiveListInfo.select = 'MasterID' + "," + 'RequestCode' + "," + 'CustomerAddress' + "," + 'ContactPersonName' + "," + 'ContactNumber'+ "," + 'ColorBank' + "," + 'NatureOfBusiness' + "," + 'Description' + "," + 'TotalSpaceArea';
            
            // from(
            //     this.tmlistitemsService.getDetailListItems(this.logedInUser, this.exclusiveListInfo)   
            // ).subscribe(
            //     (Response) => {
            //         this.exclusiveTblData = Response;
            //     },
            //     (err) => {
            //         console.log(err)
            //     },
            // );
            //-------------------------------------

            //===========get details tbl data=======
            this.regularListInfo.expand = 'Author';
            this.regularListInfo.top = 200000;          
            this.regularListInfo.filterBy = "RequestCode";
            this.regularListInfo.name = "ShopMerchandizingRegular";
            this.regularListInfo.select = 'MasterID' + "," + 'RequestCode' + "," + 'CustomerAddress' + "," + 'ContactPersonName' + "," + 'ContactNumber'+ "," + 'TypeOfWork' + "," + 'PreferredBrand' + "," + 'TotalAreaApproxByRequestor'+ "," + 'TotalAreaApproxByVendor';
        
            // from(
            //     this.tmlistitemsService.getDetailListItems(this.logedInUser, this.regularListInfo)   
            // ).subscribe(
            //     (Response) => {
            //         this.regularTblData = Response;                    
            //     },
            //     (err) => {
            //         console.log(err)
            //     },
            // );
            //-------------------------------------

            //===========get details tbl data=======
            this.bellsignListInfo.expand = 'Author';
            this.bellsignListInfo.top = 200;          
            this.bellsignListInfo.name = "ShopSignRequestDetail";
            this.bellsignListInfo.select = 'RequestCode' + "," + 'CustomerType' + "," + 'RequestType' + "," + 'SubDealerName' + "," + 'TaggedDelearCode' + "," + 'CustomerCodeOrName' + "," + 'CustomerAddress' + "," + 'ContactPerson' + "," + 'ContactNumber' + "," + 'YearlyTarget' + "," + 'WorkType' + "," + 'SignboardType' + "," + 'WidthByRequestor' + "," + 'HeightByRequestor' + "," + 'NumberOfSignboard' + "," + 'ExistingBrand' + "," + 'PreferredBrand' + "," + 'TentativeDate' + "," + 'WidthByVendor' + "," + 'HeightByVendor' + "," + 'TotalSizeByVendor' + "," + 'PerSFTRate' + "," + 'TotalRate' + "," + 'VendorCode' + "," + 'OtherCost';  
            
              
            // from(
            //     this.tmlistitemsService.getDetailListItems(this.logedInUser, this.bellsignListInfo)   
            // ).subscribe(
            //     (Response) => {
            //         this.belsignTblData = Response;                    
            //     },
            //     (err) => {
            //         console.log(err)
            //     },
            // );
            //-------------------------------------

            //===========get details tbl data=======
            this.paintingListInfo.expand = 'Author';
            this.paintingListInfo.top = 200;          
            this.paintingListInfo.name = "ShutterWallPaintingDetail";
            this.paintingListInfo.select = 'MasterID' + "," + 'RequestCode' + "," + 'CustomerAddress' + "," + 'ContactPerson' + "," + 'ContactNumber'; 
          
            // from(
            //     this.tmlistitemsService.getDetailListItems(this.logedInUser, this.paintingListInfo)   
            // ).subscribe(
            //     (Response) => {
            //         this.walpaintingTblData = Response;
            //     },
            //     (err) => {
            //         console.log(err)
            //     },
            // );
            //-------------------------------------  

             //==========implementing forkJoin ============
            from(forkJoin({
                masterTbl: this.tmlistitemsService.getMasterListItems(this.logedInUser),
                exclusiveTbl: this.tmlistitemsService.getDetailListItems(this.logedInUser, this.exclusiveListInfo),
                regularTbl: this.tmlistitemsService.getDetailListItems(this.logedInUser, this.regularListInfo)   ,
                belsignTbl: this.tmlistitemsService.getDetailListItems(this.logedInUser, this.bellsignListInfo),
                walpaintingTbl: this.tmlistitemsService.getDetailListItems(this.logedInUser, this.paintingListInfo)
            }))
            .subscribe(({masterTbl, exclusiveTbl, regularTbl, belsignTbl, walpaintingTbl}) => {
                
                let allDetailTblsData = [
                    ...exclusiveTbl,
                    ...regularTbl,
                    ...belsignTbl,
                    ...walpaintingTbl];

                let detailMasterData = allDetailTblsData.map(t1 => ({                      
                    ...t1,
                    ...masterTbl.find(t2 => t2.RequestID === t1.RequestCode)
                }));

                this.rowData = detailMasterData;
            });
            //----------- forkJoin ends -------

           
        });       
    }
  
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
  
    //=============== Quick central filter function starts ==========
    //--------method-1: (with angular)--------
    quickSearch() {
      this.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
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
  
        this.gridApi.exportDataAsExcel({
            processRowGroupCallback: rowGroupCallback,
        });
    }
    //===================== Export Table data to Excel end ==============
  
    //===========include all columns ==========
    onBtnIncludeAllColumns() {      
  
       // this.gridApi.setColumnDefs(allMasDetColDef);
  
        from(
            this.tmlistitemsService.getDetailListItems(this.logedInUser)   
        ).subscribe(
            (Response) => {
                let detailTblData = JSON.parse(JSON.stringify(Response));
                let detailMasterData = detailTblData.map(t1 => ({
                    ...t1,
                    ...this.rowData.find(t2 => t2.RequestCode === t1.RequestID)
                }));
  
                this.rowData.forEach(element => {
                    if (detailMasterData.some((eachElement) => eachElement.RequestCode != element.RequestID)) {
                        detailMasterData.push(element);
                    }
                });
  
                this.rowData = detailMasterData;
            },
            (err) => {
                console.log(err)
            },
        );
    }
  
    onBtnShowDefaultColumns() {
  
        this.gridApi.setColumnDefs(defaultBriefColDef);
    }
    //---------------ends ---------
  
  }
  
  function getDatePicker() {
    function Datepicker() {}
    Datepicker.prototype.init = function(params) {
        this.eInput = document.createElement('input');
        this.eInput.value = params.value;
        this.eInput.classList.add('ag-input');
        this.eInput.style.height = '100%';
        //$(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
    };
    Datepicker.prototype.getGui = function() {
        return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function() {
        this.eInput.focus();
        this.eInput.select();
    };
    Datepicker.prototype.getValue = function() {
        return this.eInput.value;
    };
    Datepicker.prototype.destroy = function() {};
    Datepicker.prototype.isPopup = function() {
        return false;
    };
    return Datepicker;
  }
  
  let defaultBriefColDef = [
    {
      headerName: 'RequestID',
      field: 'RequestCode',
     // cellRendererFramework: MyprocessviewbtncstmComponent,
      sortable: true,
      //rowGroup: true,
      enableRowGroup: false,
      //filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
      filter: 'agTextColumnFilter',
      filterParams: {
          //applyButton: true,
          resetButton: true,
      },
      headerCheckboxSelection: true, //for appearing in Grid
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true, //for appearing in each row
      menuTabs: ['filterMenuTab', 'generalMenuTab'],
      minWidth: 165,
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
      //columnGroupShow: 'open',  
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
      minWidth: 100,
      menuTabs: ['filterMenuTab', 'generalMenuTab'],
    },  
    {
      headerName: 'Requestor Details',
      children: [
          {
              headerName: 'Emp.ID',
              field: 'RequestorEmployeeID',
              //cellRendererFramework: MyprocessviewbtncstmComponent,
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 165,
          },
          {
              headerName: 'Employee Name',
              field: 'RequestorName',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
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
              minWidth: 250,
          },
          {
              headerName: 'Employee Office',
              field: 'RequestorLocation',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 180,
          },
          {
              headerName: 'Employee Email',
              field: 'RequestorEmail',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 180,
          },
          {
              headerName: 'Bus.Area',
              field: 'RequestorBusinessArea',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 120,
          },
          
    ]}, 
    {
      headerName: 'Division',
      field: 'Division',
      sortable: true,
      //rowGroup: true,
      enableRowGroup: true,
      filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
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
      minWidth: 110,
  },
  {
      headerName: 'MerchandizingType',
      field: 'MerchandizingType',
      sortable: true,
      //rowGroup: true,
      enableRowGroup: true,
      filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
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
      minWidth: 180,
  },       
    {
      headerName: 'Vendor Details',
      children: [
          {
              headerName: 'Vendor Name',
              field: 'VendorName',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
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
              minWidth: 200,
          },
          {
              headerName: 'Vendor Code',
              field: 'VendorCode',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 140,
          },
          {
              headerName: 'Vendor Address',
              field: 'VendorAddress',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,            
              filter: 'agTextColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 280,
          },
          {
              headerName: 'Vendor Email',
              field: 'VendorEmail',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agTextColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 240,
          },
          {
              headerName: 'Vendor Status',
              field: 'VendorStatus',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agTextColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 140,
          },        
      ]
    },
    {
      headerName: 'Total Amount',
      field: 'TotalAmount',
      sortable: true,
      //rowGroup: true,
      enableRowGroup: true,
      filter: 'agNumberColumnFilter',
      //filter: 'agSetColumnFilter',
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
      columnGroupShow: 'open',
      minWidth: 110,
    },   
    {
      headerName: 'Request Status',
      children: [
          {
              headerName: 'Request Status',
              field: 'RequestStatus',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agTextColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 200,
          },
          {
              headerName: 'Approval Status',
              field: 'ApprovalStatus',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
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
              minWidth: 200,
          },
          {
              headerName: 'Pending With',
              field: 'PendingTo',
              sortable: true,
              //rowGroup: true,
              enableRowGroup: true,
              //filter: 'agNumberColumnFilter',
              //filter: 'agSetColumnFilter',
              filter: 'agTextColumnFilter',
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
              columnGroupShow: 'open',
              minWidth: 200,
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
      ]
    },
    {
        headerName: 'View/Action',
        field: 'ID',
        cellRenderer: function(params) {
          return '<a href="https://portal.bergerbd.com/_layouts/15/ShopSignboard/RequestPage.aspx?Id='+params.value+'#view" target="_blank">View</a>'
        },
        //cellRendererFramework: MyprocessviewbtncstmComponent,
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
    },
    {
      headerName: 'View/Action',
      field: 'ID',
      //cellRendererFramework: TmliviewbtncstmComponent,
      cellRendererFramework: MyprocessviewbtncstmComponent,
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
    }
  ];
  
  let allMasDetColDef = [
   
      {
        headerName: 'RequestID',
        field: 'RequestID',
        //cellRendererFramework: MyprocessviewbtncstmComponent,
        sortable: true,
        //rowGroup: true,
        enableRowGroup: false,
        //filter: 'agNumberColumnFilter',
        //filter: 'agSetColumnFilter',
        filter: 'agTextColumnFilter',
        filterParams: {
            //applyButton: true,
            resetButton: true,
        },
        // headerCheckboxSelection: true, //for appearing in Grid
        // headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true, //for appearing in each row
        menuTabs: ['filterMenuTab', 'generalMenuTab'],
        minWidth: 165,
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
        //columnGroupShow: 'open',  
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
        minWidth: 100,
        menuTabs: ['filterMenuTab', 'generalMenuTab'],
      },  
      {
        headerName: 'Requestor Details',
        children: [
            {
                headerName: 'Emp.ID',
                field: 'RequestorEmployeeID',
                //cellRendererFramework: MyprocessviewbtncstmComponent,
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 165,
            },
            {
                headerName: 'Employee Name',
                field: 'RequestorName',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
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
                minWidth: 280,
            },
            {
                headerName: 'Employee Office',
                field: 'RequestorLocation',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 180,
            },
            {
                headerName: 'Employee Email',
                field: 'RequestorEmail',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 180,
            },
            {
                headerName: 'Bus.Area',
                field: 'RequestorBusinessArea',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 120,
            },
            
      ]}, 
      {
        headerName: 'Division',
        field: 'Division',
        sortable: true,
        //rowGroup: true,
        enableRowGroup: true,
        filter: 'agNumberColumnFilter',
        //filter: 'agSetColumnFilter',
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
        minWidth: 100,
    },
    {
        headerName: 'MerchandizingType',
        field: 'MerchandizingType',
        sortable: true,
        //rowGroup: true,
        enableRowGroup: true,
        filter: 'agNumberColumnFilter',
        //filter: 'agSetColumnFilter',
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
        minWidth: 180,
      },       
      {
        headerName: 'Vendor Details',
        children: [
            {
                headerName: 'Vendor Name',
                field: 'VendorName',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
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
                minWidth: 200,
            },
            {
                headerName: 'Vendor Code',
                field: 'VendorCode',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 140,
            },
            {
                headerName: 'Vendor Address',
                field: 'VendorAddress',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,            
                filter: 'agTextColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 280,
            },
            {
                headerName: 'Vendor Email',
                field: 'VendorEmail',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agTextColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 240,
            },
            {
                headerName: 'Vendor Status',
                field: 'VendorStatus',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agTextColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 140,
            },        
        ]
      },
      {
        headerName: 'Total Amount',
        field: 'TotalAmount',
        sortable: true,
        //rowGroup: true,
        enableRowGroup: true,
        filter: 'agNumberColumnFilter',
        //filter: 'agSetColumnFilter',
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
        columnGroupShow: 'open',
        minWidth: 100,
      },   
      {
        headerName: 'Request Status',
        children: [
            {
                headerName: 'Request Status',
                field: 'RequestStatus',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agTextColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 200,
            },
            {
                headerName: 'Approval Status',
                field: 'ApprovalStatus',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
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
                minWidth: 200,
            },
            {
                headerName: 'Pending With',
                field: 'PendingTo',
                sortable: true,
                //rowGroup: true,
                enableRowGroup: true,
                //filter: 'agNumberColumnFilter',
                //filter: 'agSetColumnFilter',
                filter: 'agTextColumnFilter',
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
                columnGroupShow: 'open',
                minWidth: 200,
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
        ]
      },
      {
          headerName: 'Customer Info',
          children: [
              {
                  headerName: 'CustomerType',
                  field: 'CustomerType',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  //filter: 'agTextColumnFilter',
                  filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 200,
              },
              {
                  headerName: 'RequestType',
                  field: 'RequestType',
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
                  headerName: 'SubDealerName',
                  field: 'SubDealerName',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              },
              {
                  headerName: 'CustomerCodeOrName',
                  field: 'CustomerCodeOrName',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  //filter: 'agTextColumnFilter',
                  filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 200,
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
                  headerName: 'ContactPerson',
                  field: 'ContactPerson',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  //filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
                  filter: 'agTextColumnFilter',
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
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
                  headerName: 'YearlyTarget',
                  field: 'YearlyTarget',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
          ]
      },
      {
          headerName: 'Work Info',
          children: [
              {
                  headerName: 'WorkType',
                  field: 'WorkType',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  //filter: 'agTextColumnFilter',
                  filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 200,
              },
              {
                  headerName: 'SignboardType',
                  field: 'SignboardType',
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
                  headerName: 'WidthByRequestor',
                  field: 'WidthByRequestor',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              },
              {
                  headerName: 'HeightByRequestor',
                  field: 'HeightByRequestor',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  //filter: 'agTextColumnFilter',
                  filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 200,
              },
              {
                  headerName: 'NumberOfSignboard',
                  field: 'NumberOfSignboard',
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
                  headerName: 'ExistingBrand',
                  field: 'ExistingBrand',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  //filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
                  filter: 'agTextColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              }, 
              {
                  headerName: 'PreferredBrand',
                  field: 'PreferredBrand',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              }, 
              {
                  headerName: 'Created',
                  field: 'TentativeDate',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
      
              }, 
              {
                  headerName: 'WidthByVendor',
                  field: 'WidthByVendor',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              },
              {
                  headerName: 'HeightByVendor',
                  field: 'HeightByVendor',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              },
              {
                  headerName: 'TotalSizeByVendor',
                  field: 'TotalSizeByVendor',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              },
              {
                  headerName: 'PerSFTRate',
                  field: 'PerSFTRate',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              },
              {
                  headerName: 'TotalRate',
                  field: 'TotalRate',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              },
              {
                  headerName: 'VendorCode',
                  field: 'VendorCode',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  //filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
                  filter: 'agTextColumnFilter',
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
                  headerName: 'OtherCost',
                  field: 'OtherCost',
                  sortable: true,
                  //rowGroup: true,
                  enableRowGroup: true,
                  filter: 'agNumberColumnFilter',
                  //filter: 'agSetColumnFilter',
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
                  columnGroupShow: 'open',
                  minWidth: 100,
              },   
          ]
      },
      {
        headerName: 'View/Action',
        field: 'ID',
        cellRenderer: function(params) {
            return '<a href="https://portal.bergerbd.com/_layouts/15/ShopSignboard/RequestPage.aspx?Id='+params.value+'#view" target="_blank">View</a>'
          },
        //cellRendererFramework: MyprocessviewbtncstmComponent,
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
      }
    ];
  
  