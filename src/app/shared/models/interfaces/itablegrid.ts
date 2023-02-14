import {
    Grid,
    GridOptions,
    AllModules
} 
from "@ag-grid-enterprise/all-modules"; 


export interface ITablegrid {
    autoGroupColumnDef?: any;
    columnDefs?: any;
    components?: any;
    defaultColDef?: any;
    frameworkComponents?: any;
    gridApi?: any;
    gridColumnApi?: any;
    gridOptions?: GridOptions;
    masterGridOptions?: any;
    modules?: any[]; 
    rowData?: any;    
    rowGroupPanelShow?: any;
    sideBar?: any;
    statusBar?: any;
    testData?: any;    
    txtOfQuickSearchInpFld?: any;

}
