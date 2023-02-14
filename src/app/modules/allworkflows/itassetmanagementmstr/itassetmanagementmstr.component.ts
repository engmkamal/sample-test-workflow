import { Component, OnInit } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
//========to covert promise to observer======
import {
  from,
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
import { LiactionbtncstmComponent } from 'src/app/shared/components/liactionbtncstm/liactionbtncstm.component';


@Component({
  selector: 'app-itassetmanagementmstr',
  templateUrl: './itassetmanagementmstr.component.html',
  styleUrls: ['./itassetmanagementmstr.component.scss']
})

export class ItassetmanagementmstrComponent implements OnInit { 
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
    //GetRecordsApiUrl:"",
  };

  public listInfo = {
    name: "",
    select: "",
    expand: "",
    filter: "",
    top: 100,

  };

  
  constructor(private sharepointlistService:SharepointlistService) { 
    this.mpTG.columnDefs = myProcessAllColDef;
    this.mpTG.defaultColDef = {
      flex: 1,
      minWidth: 150,
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
      customizedAgeCell: LiactionbtncstmComponent,
      //customizedAgeCell: MyprocessviewbtncstmComponent, 
    }
    //--------for action btn link rendering start -------
    this.mpTG.rowGroupPanelShow = 'always';

    //=========for setting features on every subgroup items start=======
    this.mpTG.autoGroupColumnDef = {
      headerName: 'Group',
      minWidth: 30,
      cellRendererParams: {
          checkbox: true,
          suppressCount: true
      }
    };

    this.rowHeight = 20;
    //------------ subitem fetures ends -----------
  }

  ngOnInit() {     
    //=================fetching few data by fetchListItems service start start ====================    
    this.listInfo.name = "ITAssetManagement"; 
    this.listInfo.select = 'Title'+","+'EmployeeID'+","+'AssetSubCategory'+","+'AssetAcquisitionType'+","+'AssetTitle'+","+'AssetModel'+","+'AssetDescription'+","+'AssetNumber'+","+'ResidualPriceAfterDepreciation'+","+'UserAcqusitionDate'+","+'Vendor'+","+'WarrantyFrom'+","+'WarrantyExpDate'+","+'UsefulLife'+","+'AssetUserName'+","+'AssetUserPosition'+","+'AssetUserEmail'+","+'AssetUserEmployeeID'+","+'AssetUsercostCenter'+","+'BusinessArea'+","+'PurchaseDate'+","+'Manufacturer'+","+'ProductSLNo'+","+'Comments'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created';
    this.listInfo.expand = '';
    this.listInfo.top = 100;

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
            this.rowData = items; 
          },
          (err) => {
              console.log(err)
          },
        );      
    });
    //--------------------fetching few data by fetchListItems service ends ---------------
    
    // this.sharepointlistService.getSPLoggedInUser().then((res)=> {     
    //   from(
    //     this.sharepointlistService.getUsersWFMasterListItems(this.listInfo, res)        
    //     ).subscribe(
    //       (items) =>{ 
    //         this.rowData = items;            
    //       },
    //       (err) => {
    //           console.log(err)
    //       },
    //     );      
    // });
  }


  onGridReady(params) {
    this.mpTG.gridApi = params.api;
    this.mpTG.gridColumnApi = params.columnApi;

    //=================fetching few data by fetchListItems service start start ====================    
    this.sharepointlistService.getEmpIdNdOffice().then((res)=> {
      // if(res.Office == "Corporate"){
      //   this.listInfo.filter = '';
      //   this.listInfo.top = 100000;         
      // }
      // else{
      //   this.listInfo.filter = "substringof('"+ res.Office +"' ,Author/Office)";            
      // }

      this.listInfo.top = 100000;

      from(
        this.sharepointlistService.fetchListItems(this.listInfo, res)        
        ).subscribe(
          (items) =>{
            this.rowData = items; 
          },
          (err) => {
              console.log(err)
          },
        );      
    });
    //--------------------fetching few data by fetchListItems service ends ---------------
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


}

var rowHeight, groupHeight;

let myProcessAllColDef = [ 
  // {
  // headerName: 'EmployeeID',
  // field: 'EmployeeID',
  // sortable: true,
  // rowGroup: false,
  // enableRowGroup: false,  
  // filter: 'agSetColumnFilter',
  // //filter: 'agTextColumnFilter',
  // filterParams: {
  //     //applyButton: true,
  //     resetButton: true,
  // },
  // //headerCheckboxSelection: true, //for appearing in Grid
  // //headerCheckboxSelectionFilteredOnly: true,
  // //checkboxSelection: true, //for appearing in each row
  // menuTabs: ['filterMenuTab', 'generalMenuTab'],
  // minWidth: 115,
  // cellClass: "ag-header-group-cell-label",
  //   cellStyle: function(params) {
  //     if (params.value !='') {
  //         return {
  //         //color: 'red', 
  //         //backgroundColor: 'green',
  //         textAlign: 'center', 
  //         display: 'flex',
  //       };
  //     } else {
  //         return {
  //           textAlign: 'center',
  //         }
  //       }
  //   }
  // },
  {
    headerName: 'AssetSubCategory',
    field: 'AssetSubCategory',
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
    headerName: 'AcquisitionType',
    field: 'AssetAcquisitionType',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 155,
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
    headerName: 'AssetTitle',
    field: 'AssetTitle',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 140,
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
    hide: true,
  },
  {
    headerName: 'AssetModel',
    field: 'AssetModel',
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
    }
  },
  {
    headerName: 'AssetDescription',
    field: 'AssetDescription',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 155,
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
    headerName: 'AssetNumber',
    field: 'AssetNumber',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
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
    }
  },
  {
    headerName: 'BusinessArea',
    field: 'BusinessArea',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 155,
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
    headerName: 'RPriceADepreciation',
    field: 'ResidualPriceAfterDepreciation',
    sortable: true,
    enableRowGroup: true,
    filter: 'agNumberColumnFilter',
    //filter: 'agSetColumnFilter',
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
            display: 'flex',
          }
        }
    },
    hide: true,
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
    minWidth: 100,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
    hide: true
  },
  {
    headerName: 'AcqusitionDate',
    field: 'UserAcqusitionDate',
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
    headerName: 'WarrantyFrom',
    field: 'WarrantyFrom',
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
    hide: true
  },
  {
    headerName: 'Wr.ExpDate',
    field: 'WarrantyExpDate',
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
      //resetButton: true,
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
    headerName: 'Vendor',
    field: 'Vendor',
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
    headerName: 'UsefulLife',
    field: 'UsefulLife',
    sortable: true,
    enableRowGroup: true,
    filter: 'agNumberColumnFilter',
    //filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 140,
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
    hide: true,
  },
  {
    headerName: 'AssetUserName',
    field: 'AssetUserName',
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
    }
  },
  {
    headerName: 'UserPosition',
    field: 'AssetUserPosition',
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
    hide: true,
  },
  {
    headerName: 'UserEmail',
    field: 'AssetUserEmail',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 140,
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
    headerName: 'UserEmpID',
    field: 'AssetUserEmployeeID',
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
    headerName: 'UserCostCenter',
    field: 'AssetUsercostCenter',
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
    }
  },
  {
    headerName: 'PurchaseDate',
    field: 'PurchaseDate',
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
    headerName: 'Manufacturer',
    field: 'Manufacturer',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
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
    }
  },
  {
    headerName: 'ProductSLNo',
    field: 'ProductSLNo',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
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
    //hide: true,
  },
  {
    headerName: 'Comments',
    field: 'Comments',
    sortable: true,
    enableRowGroup: true,
    filter: 'agSetColumnFilter',
    //filter: 'agTextColumnFilter',
    filterParams: {
        //applyButton: true,
        resetButton: true,
    },
    minWidth: 140,
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
    hide: true,
  },
  // {
  //   headerName: 'Status',
  //   field: 'Status',
  //   sortable: true,
  //   enableRowGroup: true,
  //   filter: 'agSetColumnFilter',
  //   filterParams: {
  //       resetButton: true,
  //   },
  //   minWidth: 160,
  //   menuTabs: ['filterMenuTab', 'generalMenuTab'],
  // },  
  {
    headerName: 'LastModifiedOn',
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
    hide: true,
  },
  // {
  //   headerName: 'PendingWith',
  //   field: 'PendingWith.Title',
  //   sortable: true,
  //   enableRowGroup: true,
  //   filter: 'agSetColumnFilter',
  //   //filter: 'agTextColumnFilter',
  //   filterParams: {
  //       //applyButton: true,
  //       resetButton: true,
  //   },
  //   minWidth: 180,
  //   menuTabs: ['filterMenuTab', 'generalMenuTab'],
  // },
  {
    headerName: 'View/Action',
    field: 'GUID',
    cellRendererFramework: MyprocessviewbtncstmComponent,
    //cellRendererFramework: LiActionBtnCstmComponent,
    enableRowGroup: false,
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
    }
  }
  
];
 























