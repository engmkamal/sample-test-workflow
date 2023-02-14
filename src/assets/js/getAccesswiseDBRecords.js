
	//===========getAccess and dashboard records start========
	function getAccesswiseRecords(){
		var logedInUser = {   
			ADID:"",
			Name:"",
			Email:"",
			EmpID:"",
			Office:"",
			DashboardAccess:"NoAccess",
		  };
		var workflowName = "TradeMerchandisingDashboard";
		var masterList = "ShopSignboardRequestMaster";
		var fullAccess = 0;
		var userAccess = 0;

		var getRecordsUrl = "";
		

		logedInUser.ADID = _spPageContextInfo.userId;
			var fullAccessUsers = [];
			var locationwiseAccessUsers = [];
			var dashboardRecords = [];
			$.ajax({  
				async: true,  
				url: "https://portaldv.bergerbd.com/leaveauto/_api/web/lists/getByTitle('UserAccessMappingforWorkflow')/items?&$top=2000&$select=ID,WorkflowName,MembersOfFullAccess/ID,MembersOfUserAccess/ID,MembersOfFullAccess/Title,MembersOfUserAccess/Title&$expand=MembersOfFullAccess/ID,MembersOfUserAccess/ID&$filter=WorkflowName eq '"+workflowName+"'",
				method: "GET",
			
				headers: {  
					"accept": "application/json;odata=verbose",
					"content-type": "application/json;odata=verbose"
				},  
				success: function(data) {  
					if (data.d.results.length > 0) {
						fullAccessUsers = data.d.results[0].MembersOfFullAccess.results;
						locationwiseAccessUsers = data.d.results[0].MembersOfUserAccess.results;
						
						if(fullAccessUsers.some(fullAccessUsers => fullAccessUsers.ID === _spPageContextInfo.userId)){
							 fullAccess = 1;
							 logedInUser.DashboardAccess = "fullAccess";
							 getRecordsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$top=2000&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
						}
						else if(locationwiseAccessUsers.some(locationwiseAccessUsers => locationwiseAccessUsers.ID === _spPageContextInfo.userId)){
							userAccess = 1;
							logedInUser.DashboardAccess = "locationwiseAccess";
							getRecordsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$filter=RequestorLocation eq '"+logedInUser.Office+"'&$top=2000&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
						}
						else if(fullAccess != 1 && userAccess != 1 ){						
							getRecordsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$top=2000&$filter=WorkflowName eq '"+logedInUser.EmpID+"'&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
							
						}
					}
						//=========fetching dashboard row Items start =========
						$.ajax({  
							async: true,  
							url: getRecordsUrl,
							method: "GET",
						
							headers: {  
								"accept": "application/json;odata=verbose",
								"content-type": "application/json;odata=verbose"
							},  
							success: function(data) {  
								if (data.d.results.length > 0) {
									dashboardRecords = data.d.results;
								}	
							},  
							error: function(error) {  
								debugger;
								console.log(JSON.stringify(error));  
							}  
						})

						//---------ends ---------
				},  
				error: function(error) {  
					debugger;
					console.log(JSON.stringify(error));  
				}  
			})
			return dashboardRecords;
	};
		//------------ getAccess and dashboard records start --------
		
		
	var exernalJS = new getAccesswiseRecords();

	export { exernalJS };

