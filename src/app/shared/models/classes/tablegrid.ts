import { ITablegrid } from '../interfaces/itablegrid';

export class Tablegrid implements ITablegrid{
    constructor(
        public autoGroupColumnDef?,
        public columnDefs?,
        public components?,
        public defaultColDef?,
        public frameworkComponents?,
        public gridApi?,
        public gridColumnApi?,
        public gridOptions?,
        public masterGridOptions?,
        public modules?, 
        public rowData?,
        public masterTblData?,
        public masterDetTblData?,    
        public rowGroupPanelShow?,
        public sideBar?,
        public statusBar?,
        public testData?,    
        public txtOfQuickSearchInpFld?){
            this.defaultColDef = {
                flex: 1,
                minWidth: 120,
                resizable: true,
                enableValue: true,
                enableRowGroup: true,
                enablePivot: true,
                sortable: true,
                filter: true,
                //editable: true,
            };
        
            //===========for action btn link rendering start ===
            // this.frameworkComponents = {
            //     customizedAgeCell: LiactionbtncstmComponent,
            // };
            //--------for action btn link rendering start -------
            this.rowGroupPanelShow = 'always';
            
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
