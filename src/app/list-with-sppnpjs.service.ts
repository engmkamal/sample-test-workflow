import { Injectable } from '@angular/core';
import {Web, ConsoleListener} from "sp-pnp-js";
//import pnp, {Web} from "sp-pnp-js";
import { from, observable, Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ISPList, IValueItems, IUserAccess, AuthorItems, DashboardUsers} from "./list-interface";
import { JsonPipe } from '@angular/common';
import { ValueItems } from './modules/WorkshopProposal/workshop-proposal-list';
import { environment } from 'src/environments/environment';


import * as pnp from "sp-pnp-js";

// //=========added for Promise type ============
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})


export class ListWithSppnpjsService {
  public logedUserADId;

  // public logedInUser = {
  //   ADID:"",
  //   Name:"",
  //   Email:"",
  //   EmpID:"",
  //   Office:"",
  //   DashboardAccess:"NoAccess",
  // };

  public webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto";
  public users = [];

  public logedInUser = {  
    ADID:"",
    Name:"",
    Email:"",
    EmpID:"",
    Office:"",
    DashboardAccess:"NoAccess",
    GetRecordsApiUrl:"",
  };
  
  constructor(private http: HttpClient) { 
    this.spLoggedInUser();
    this.userAccessSearch();
    
    // this.getUserAccess().then(re => {
    //   alert("2. Constructor Fired ! DashboardAccess: ");
    //   this.logedInUser.DashboardAccess = re.dashboardAccess;
    //   alert("3. Constructor Fired ! DashboardAccess: " + this.logedInUser.DashboardAccess);
    // });
    

    // this.spLoggedInUserDetails().then((r)=>{
    //   this.logedInUser.ADID = r.Id;
    //   this.logedInUser.Name = r.Name;
    //   this.logedInUser.Email = r.Email;
    //   this.logedInUser.DashboardAccess = "fullAccess"
    //   alert("1. Constructor Fired ! logedInUser: " + this.logedInUser.ADID);

    //   if(this.logedInUser.DashboardAccess != "fullAccess"){
    //     this.getEmployeeInfo().then((r)=>{
    //       alert("2. Constructor Fired ! getEmployeeInfo(): ");
    //       this.logedInUser.EmpID = r.EmployeeId;
    //       this.logedInUser.Office = r.OfficeLocation;
    //       alert("1. Constructor Fired ! Emp Office: " + this.logedInUser.Office);
    //     });
    //   }
    // });    

    // if(this.logedInUser.DashboardAccess != "fullAccess"){
    //   this.getEmployeeInfo().then((r)=>{
    //     alert("2. Constructor Fired ! getEmployeeInfo(): ");
    //     this.logedInUser.EmpID = r.EmployeeId;
    //     this.logedInUser.Office = r.OfficeLocation;
    //     alert("1. Constructor Fired ! Emp Office: " + this.logedInUser.Office);
    //   });
    // }
    //alert("logedInUser from service constructor: " + this.logedInUser.ADID + "; EmpId:"+ this.logedInUser.Office +"; DB Acess: "+ this.logedInUser.DashboardAccess);
   }

   //=================imported from http service start ========
   spLoggedInUser(){
    let promise = new Promise((resolve, reject)=>{
      let apiUrl = "https://portal.bergerbd.com/leaveauto/_api/web/currentuser?$expand=Groups"; 
        //==================
        this.http
            .get(apiUrl)
            .toPromise()
            .then(
            (res) => {
              let sringify = JSON.stringify(res);
              let parse = JSON.parse(sringify);

              this.logedInUser.ADID = parse.Id;
              this.logedInUser.Email = parse.Email;
              this.logedInUser.Name = parse.Title;
              //alert("Loged In User's AD Id: " + this.logedInUser.ADID + "Loged In User's Email: " + this.logedInUser.Email + "Loged In User's Name: " + this.logedInUser.Name);
              console.log("Loged In User's AD Id: " + this.logedInUser.ADID + "Loged In User's Email: " + this.logedInUser.Email + "Loged In User's Name: " + this.logedInUser.Name);
              }            
              )
              return promise;
        //-------------
    });
}



search(){
  let promise = new Promise((resolve, reject)=>{
    let apiUrl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('BergerEmployeeInformation')/items?&$top=2000000&$select=EmployeeName,Email/ID,Email/Title,Email/EMail,OptManagerEmail/ID,OptManagerEmail/Title,DeptID,EmployeeId,EmployeeGrade,Department,Designation,OfficeLocation,Mobile,CostCenter,CompanyCode&$expand=Email/ID,OptManagerEmail/ID&$filter=Email/ID eq '1026'"; 
      //==================
      this.http
          .get(apiUrl)
          .toPromise()
          .then(
          (res) => {
            let sringify = JSON.stringify(res);
            let parse = JSON.parse(sringify);
            this.logedInUser.Office = parse.value[0].OfficeLocation;
            this.logedInUser.EmpID = parse.value[0].EmployeeId;
          //  alert( "Loged user's OfficeLocation: " + parse.value[0].OfficeLocation +"; Loged user's Emp ID: "+ parse.value[0].EmployeeId);

            console.log("Loged user's OfficeLocation: " + parse.value[0].OfficeLocation +"; Loged user's Emp ID: "+ parse.value[0].EmployeeId);


            // for (let i in res) {
            //   let u:DashboardUsers = new DashboardUsers();
            //   Object.assign(u , res[i]);
            //   this.users[i] = u;
            //   console.log("user:" + this.users[i].OfficeLocation);
            // }
            // console.log("res: " + res);            
                   
            //   console.log(JSON.stringify(res));
            }            
            )
            return promise;
      //-------------
  }); 
}

userAccessSearch(){
  let fullAccessUsers = [];
  let locationwiseAccessUsers = [];

  var fullAccess = 0;
  var userAccess = 0;

  var getRecordsUrl = "";
    
  let workflowName = "TradeMerchandisingDashboard";

  var masterList = "ShopSignboardRequestMaster";

  let promise = new Promise((resolve, reject)=>{
    let apiUrl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('UserAccessMappingforWorkflow')/items?&$top=2000&$select=ID,WorkflowName,Employee/ID,Employee/Title,AccessCategory,AccessibleLocations&$expand=Employee/ID&$filter=WorkflowName eq '"+workflowName+"'"; 
      //==================
      this.http
          .get(apiUrl)
          .toPromise()
          .then(
          (res) => {
            let sringify = JSON.stringify(res);
            let parse = JSON.parse(sringify);

            // console.log("All fullAccessUsers Info: " + sringify);

            // console.log("fullAccessUsers Length: " + parse.WorkflowName);
            // console.log("fullAccessUsers my ID: " + parse.value[0].MembersOfFullAccess[4].ID);
            

            // fullAccessUsers = parse.value[0].MembersOfFullAccess;
            // locationwiseAccessUsers = parse.value[0].MembersOfFullAccess;

            // console.log("fullAccessUsers Length: " + fullAccessUsers.length);

            // if(fullAccessUsers.some(fullAccessUser => fullAccessUser.ID === Number(this.logedInUser.ADID))){
            //   fullAccess = 1;
            //   this.logedInUser.DashboardAccess = "fullAccess";
            //   this.logedInUser.GetRecordsApiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$top=2000&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
            //   console.log("fullAccess inside if block: " + this.logedInUser.DashboardAccess);
            // }
            // else if(locationwiseAccessUsers.some(locationwiseAccessUser => locationwiseAccessUser.ID === Number(this.logedInUser.ADID))){
            //   userAccess = 1;
            //   this.logedInUser.DashboardAccess = "locationwiseAccess";
            //   this.logedInUser.GetRecordsApiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$filter=RequestorLocation eq '"+this.logedInUser.Office+"'&$top=2000&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
            // }
            // else if(fullAccess != 1 && userAccess != 1 ){	
            //   this.logedInUser.DashboardAccess = "selfAppliedAccess";					
            //   this.logedInUser.GetRecordsApiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$top=2000&$filter=WorkflowName eq '"+this.logedInUser.EmpID+"'&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
              
            // }
            

            // console.log("User access: " + this.logedInUser.DashboardAccess +"; getRecordsUrl: "+getRecordsUrl);

            //alert("User access: " + this.logedInUser.DashboardAccess +"; getRecordsUrl: "+getRecordsUrl);


            // for (let i in res) {
            //   let u:DashboardUsers = new DashboardUsers();
            //   Object.assign(u , res[i]);
            //   this.users[i] = u;
            //   console.log("user:" + this.users[i].OfficeLocation);
            // }
            // console.log("res: " + res);            
                   
            //   console.log(JSON.stringify(res));
            }            
            )
            //return promise;
      //-------------
  }); 
  return this.logedInUser;
}
   //-----------imported from http service ends ---------

  // public getUserInfo():void{
  //   this.spLoggedInUserDetails().then((r)=>{
  //     this.logedInUser.ADID = r.Id;
  //     this.logedInUser.ADID = r.Name;
  //     this.logedInUser.ADID = r.Email;
  //   });
  //   this.getUserAccess().then((r)=>{
  //     this.logedInUser.DashboardAccess = r.dashbardAccess;
  //   });
  //   if(this.logedInUser.DashboardAccess != "fullAccess"){
  //     this.getEmployeeInfo().then((r)=>{
  //       this.logedInUser.EmpID = r.EmployeeId;
  //       this.logedInUser.Office = r.OfficeLocation;
  //     });
  //   }
  // }

  
  private getConfigInfo(){
    const mySP = pnp.sp.configure({
      headers:{
        "Accept": "application/json; odata=verbose"
      }
    }, "https://portal.bergerbd.com/leaveauto");
    //console.log("Reterened confug:"+ mySP);
    return mySP;
  }

  /*Get Current Logged In User*/  
  public spLoggedInUserDetails(): Promise<any>{  
    try {
      const web = new pnp.Web("https://portal.bergerbd.com");

      //   if (obj.hasOwnProperty("id")){
      //     console.log(obj.id);            
      // }
      //alert("Sririgified loged user frm service: " + jv.Id);
      
      //console.log ("spLoggedInUserDetails from service:" +web.currentUser.get());
      //alert("Loged user AD ID frm spLoggedInUserDetails() of service: " + web.currentUser.get());
      return web.currentUser.get();          
    } catch (error) {  
        console.log("Error in spLoggedInUserDetails : " + error);  
    }      
  }

  public getEmployeeInfo(): Promise<any>{
    let employee = 
        from(this.getConfigInfo().web
          .lists.getByTitle("BergerEmployeeInformation")
          .items.select('EmployeeName','EmployeeId','Email/EMail','OfficeLocation')  
          .expand('Email')
          .filter('Email/ID eq "1026"')        
          .get()
          .then(items => {
            employee = items;
            return employee; 
          })
            // .then(items => {
            //   for(var i =0; i< items.length; i++){
            //     employee.empName: items.EmployeeName;
            //     employee.empId: items.EmployeeId;
            //     employee.empEmail: items.Email.EMail;
            //     employee.empOfficeLocation: items.OfficeLocation;
            //   }
            // })
          );
          console.log("Employee Information: "+ JSON.parse(JSON.stringify(employee)));
         // alert("Loged User mp Id: " + employee.EmployeeId);
    return employee;  
  }

  //========== get user access 111AM 140920 start====
  public getUserAccess2(){
    var fullAccessUsers = [];
    var locationwiseAccessUsers = [];
    var fullAccess = 0;
    var userAccess = 0;
    var getRecordsUrl = "";
    var dashboardRecords = [];
    var access;
    let userAccessRecords:IUserAccess;
    //===================
    // from(this.spLoggedInUserDetails()).subscribe((r)=>{
    //   this.logedInUser.ADID = r.Id;
    //   this.logedInUser.Name = r.Name;
    //   this.logedInUser.Email = r.Email;
    //   this.logedInUser.DashboardAccess = "fullAccess"
    //   alert("1. Constructor Fired ! logedInUser: " + this.logedInUser.ADID);
    // })
    //-----------------
    access =
        this.getConfigInfo().web
        .lists.getByTitle("UserAccessMappingforWorkflow")
        .items.getById(27)        
        .select('ID','WorkflowName')
        //.select('ID','WorkflowName','MembersOfFullAccess/ID','MembersOfUserAccess/ID','MembersOfFullAccess/Title','MembersOfUserAccess/Title')
        //.expand('MembersOfFullAccess','MembersOfUserAccess')
        //.filter('WorkflowName eq "TradeMerchandisingDashboard"')                
        .get().then             
              (items => { 
               // alert("JSON.stringify(items)"+JSON.stringify(items));
                console.log("JSON.stringify(items)"+JSON.stringify(items));
                console.log("JSON.parse(JSON.stringify(items): "+ JSON.parse(JSON.stringify(items)));
                //alert("items:" + items); //not working  
                //alert("items:" + items.json());  //not working             
                //alert("length[0]:" + items[0].MembersOfUserAccess.length); //not working  
               //==============
              var fullAccessUsers = [];
               for(var i = 0; i< items.length; i++){
                access = items[0].WorkflowName;
                  var eachItem:DashboardUsers = {
                    ID:items[i].ID,
                    Title: items[i].WorkflowName,
                  }
                  //alert("Title:" + eachItem.Title)
                  fullAccessUsers.push(eachItem);
                  fullAccessUsers = JSON.parse(JSON.stringify(items));
                  //alert("fullAccessUsers :" + fullAccessUsers);
                  //alert("fullAccessUsersID: " + items[0].ID + "fullAccessUsers Name: " + items[0].WorkflowName);
                }
              //  for(var i = 0; i< items[0].MembersOfFullAccess.length; i++){
              //     var eachItem:DashboardUsers = {
              //       ID:items[i].ID,
              //       Title: items[i].Title,
              //     }
              //   fullAccessUsers.push(eachItem);
              //   //userAccessRecords.MembersOfFullAccess.push(eachItem);
              //   }
                for(var i = 0; i< items.MembersOfUserAccess.length; i++){
                  var eachItem:DashboardUsers = {
                    ID:items[i].ID,
                    Title: items[i].Title,
                  }
                  locationwiseAccessUsers.push(eachItem); 
                  //userAccessRecords.MembersOfUserAccess.push(eachItem);             
                }
               //-------------------
              //fullAccessUsers = userAccessRecords.MembersOfUserAccess;
              //locationwiseAccessUsers = userAccessRecords.MembersOfUserAccess;
              
              if(fullAccessUsers.some(fullAccessUsers => fullAccessUsers.ID === Number(this.logedInUser.ADID))){
                 fullAccess = 1;
                 this.logedInUser.DashboardAccess = "fullAccess";
                 access = "fullAccess";
                 //getRecordsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$top=2000&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
              }
              else if(locationwiseAccessUsers.some(locationwiseAccessUsers => locationwiseAccessUsers.ID === Number(this.logedInUser.ADID))){
                userAccess = 1;
                this.logedInUser.DashboardAccess = "locationwiseAccess";
                access = "locationwiseAccess";
                //getRecordsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$filter=RequestorLocation eq '"+logedInUser.Office+"'&$top=2000&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
              }
              else if(fullAccess != 1 && userAccess != 1 ){						
                //getRecordsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+masterList+"')/items?&$top=2000&$filter=WorkflowName eq '"+logedInUser.EmpID+"'&$select=ID,RequestID,RequestorEmployeeID,RequestorName,RequestorLocation,RequestorBusinessArea,RequestorCostCenter,Division,MerchandizingType,RequestorEmail,Author/Title,RequestStatus,ApprovalStatus,PendingTo,Created,VendorName,VendorCode,VendorAddress,VendorEmail,VendorStatus,TotalAmount,GUID,Modified&$expand=Author/ID&$orderby=Created desc";
                
              }
            
            })
          
        
        return access;
}
  //------------------------------------------------

  //=============get user access details starts =================
  public getUserAccess(): Promise<any>{    
    let fullAccess = 0;
    let userAccess = 0;
    let dashboardAccess =
    from(this.getConfigInfo().web
        .lists.getByTitle("UserAccessMappingforWorkflow")
        .items//.filter('WorkflowName eq "TradeMerchandisingDashboard"')
        .select('ID','WorkflowName')  
        //.select('ID','WorkflowName','MembersOfFullAccess/ID','MembersOfUserAccess/ID','MembersOfFullAccess/Title','MembersOfUserAccess/Title')
        //.expand('MembersOfFullAccess','MembersOfUserAccess')                
        .get()
        .then(items => {
          dashboardAccess = items.json();
          console.log(dashboardAccess);
         // alert("dashboardAccess" + dashboardAccess);
          return dashboardAccess;
          // this.logedInUser.DashboardAccess = items.
          // alert("items frm getUserAccess()" +JSON.stringify(items));
          // console.log('Fetched data from UserAccessMappingforWorkflow' + JSON.parse(JSON.stringify(items)));
          
          //   if (items.length > 0) {
          //     for (var count = 0; count < items.MembersOfFullAccess.results.length; count++) {
          //         //if (items.MembersOfFullAccess.results[count].ID == this.logedInUser.ADID) {
          //           if (items.MembersOfFullAccess.results[count].ID == "1026") {
          //             fullAccess = 1;
          //             dashboardAccess = "fullAccess";
          //             //this.logedInUser.DashboardAccess = "fullAccess";                       
          //             console.log("dashbardAccess: " + dashboardAccess);
          //             alert("dashbardAccess: " + dashboardAccess);
          //             return dashboardAccess;
          //         }
          //     }
          //     if(fullAccess == 0){
          //       debugger;                
          //       // //=======get user Office Locatin starts===========
          //       // let logedUserOffice;
          //       // this.getEmployeeInfo().then (
          //       //   (Response) => {
          //       //     logedUserOffice = Response.OfficeLocation;
          //       //     console.log("Loged User Office location: "+ logedUserOffice);
                    
          //       //     alert("Loged User Office location: "+logedUserOffice);
                    
          //       //   },
          //       //   (err) =>{console.log(err)},
          //       //   );               
          //       // //---------------- get user Office Locatin ends ----------

          //       for (var userCount = 0; userCount < items.MembersOfUserAccess.results.length; userCount++) {
          //         if (items.MembersOfUserAccess.results[userCount].ID == "1026"){
          //           dashboardAccess = "locationwiseAccess";
          //           userAccess = 1;                     
          //           return dashboardAccess;  
          //       }
          //       }
          //     }
                           
              
          //   }else{
          //     if(fullAccess != 1 && userAccess != 1 ){ 
          //       debugger;
          //       dashboardAccess = "selfWFAccess";
          //       return dashboardAccess;
          //       //debugger;
          //             // from(this.getConfigInfo().web
          //             //   .lists.getByTitle("ShopSignboardRequestMaster")
          //             //   .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
          //             //   .expand('Author')
          //             //   .filter('RequestorEmployeeID eq "employee.EmployeeId"')        
          //             //   .get()
          //             //     // .then(items => {
          //             //     //   for(var i =0; i< items.length; i++){
          //             //     //     data[i].Title = items.Title;
          //             //     //     data[i].Title = items.RequestorEmployeeID;
          //             //     //     data[i].Title = items.Author.Title;
          //             //     //     data[i].Title = items.RequestStatus;
          //             //     //     data[i].Title = items.ApprovalStatus;
          //             //     //     data[i].Title = items.PendingTo;
          //             //     //     data[i].Title = items.Created;
          //             //     //     data[i].Title = items.GUID;
          //             //     //   }
          //             //     // })
          //             //   );
          //             // return data;

          //            // console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.parse(JSON.stringify(data)));
          //     }
          //   }
        })
        
         );
         
        console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.parse(JSON.stringify(dashboardAccess)));
        return dashboardAccess;
  }
  //----------------user access ends -----------

  // public async loadUserDetails():Promise<any>{ 
  //   let logedUser  = {}; 
  //   try{ 
  //     debugger; 
  //     let userDetails = await this.spLoggedInUserDetails(this.getConfigInfo());  
  //     logedUser = {    
  //       Name: userDetails.Title,    
  //       UserId: userDetails.Id,    
  //       EmailId: userDetails.Email,            
  //     };
      
  //     console.log("Loged in Employee Information from loadUserDetails func  JSON.parse(JSON.stringify(employee) : "+ JSON.parse(JSON.stringify(logedUser)));
  //     return logedUser;  
  //   }catch(error){  
  //     console.log("Error in loadUserDetails : ", error);  
  //   }      
  // }

  
  //============Table data fetching starts for ShopSignboardRequestMaster  ============
  public getTMListItems(){
    
    if(this.logedInUser.DashboardAccess == "fullAccess"){
      let data =
        from(this.getConfigInfo().web
          .lists.getByTitle("TradeMerchandisingDashboard")
          .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
          .expand('Author')        
          .get()
           .then(items => {
             console.log("Items from getTMListItems() with sp-pnp-js: " + JSON.stringify(items));
            // .then(items => {
            //   for(var i =0; i< items.length; i++){
            //     data[i].Title = items.Title;
            //     data[i].Title = items.RequestorEmployeeID;
            //     data[i].Title = items.Author.Title;
            //     data[i].Title = items.RequestStatus;
            //     data[i].Title = items.ApprovalStatus;
            //     data[i].Title = items.PendingTo;
            //     data[i].Title = items.Created;
            //     data[i].Title = items.GUID;
            //   }
             })
          );
        return data;
    }
    else if(this.logedInUser.DashboardAccess == "locationwiseAccess"){
      let data =
        from(this.getConfigInfo().web
          .lists.getByTitle("TradeMerchandisingDashboard")
          .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
          .expand('Author')
          .filter('RequestorEmployeeID eq this.logedInUser.Office')        
          .get()
            // .then(items => {
            //   for(var i =0; i< items.length; i++){
            //     data[i].Title = items.Title;
            //     data[i].Title = items.RequestorEmployeeID;
            //     data[i].Title = items.Author.Title;
            //     data[i].Title = items.RequestStatus;
            //     data[i].Title = items.ApprovalStatus;
            //     data[i].Title = items.PendingTo;
            //     data[i].Title = items.Created;
            //     data[i].Title = items.GUID;
            //   }
            // })
          );
        return data;
    }
    else if(this.logedInUser.DashboardAccess == "selfWFAccess"){
      let data =
        from(this.getConfigInfo().web
          .lists.getByTitle("TradeMerchandisingDashboard")
          .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
          .expand('Author')
          .filter('RequestorEmployeeID eq this.logedInUser.EmpID')        
          .get()
            // .then(items => {
            //   for(var i =0; i< items.length; i++){
            //     data[i].Title = items.Title;
            //     data[i].Title = items.RequestorEmployeeID;
            //     data[i].Title = items.Author.Title;
            //     data[i].Title = items.RequestStatus;
            //     data[i].Title = items.ApprovalStatus;
            //     data[i].Title = items.PendingTo;
            //     data[i].Title = items.Created;
            //     data[i].Title = items.GUID;
            //   }
            // })
          );
        return data;
    }


    // debugger;
    // //let logedUserADId;
    // this.spLoggedInUserDetails().then (
    //   (Response) => {
    //     this.logedUserADId = Response.Id;
    //     console.log("loged User AD Id from Service: "+ this.logedUserADId);        
    //     alert("User AD ID from Service: "+this.logedUserADId);         
    //   },
    //   (err) =>{console.log(err)},
    //   );
    // // let email=this.context.pageContext.user.email;
    // // this. getUserId (email);
    // //let getItemsQry;
    // //let user = this.getConfigInfo().web.currentUser.get(); 
    // //=========== fetching user access =============
    // //const web = new pnp.Web("https://portaldv.bergerbd.com");
    // //const userIdGet = web.currentUser.get();
    // //const userId = (JSON.parse(JSON.stringify(web.currentUser.get()))).Id;
    // //console.log("LogedIn user userIdGet from Service:" + userIdGet);
    // //console.log("LogedIn user userId from Service:" + userId);
    // let dashboardAccess;
    // let fullAccess = 0;
    // let userAccess = 0;
    // let data =
    // from(this.getConfigInfo().web
    //     .lists.getByTitle("UserAccessMappingforWorkflow")
    //     .items.select('ID','WorkflowName','MembersOfFullAccess/ID','MembersOfUserAccess/ID','MembersOfFullAccess/Title','MembersOfUserAccess/Title')  
    //     .expand('MembersOfFullAccess/ID','MembersOfUserAccess/ID')
    //     .filter('WorkflowName eq "TradeMerchandisingDashboard"')        
    //     .get()
    //     .then(items => {
    //       //dashboardAccess =  JSON.stringify(items);
    //       console.log('Fetched data from UserAccessMappingforWorkflow' + JSON.parse(JSON.stringify(items)));
          
    //         if (items.length > 0) {
    //           for (var count = 0; count < items.MembersOfFullAccess.results.length; count++) {
    //               if ((JSON.parse(JSON.stringify(items))).MembersOfFullAccess.results[count].ID == this.logedUserADId) {
    //                   fullAccess = 1;
                       
    //                     from(this.getConfigInfo().web
    //                       .lists.getByTitle("ShopSignboardRequestMaster")
    //                       .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
    //                       .expand('Author')        
    //                       .get()
    //                         // .then(items => {
    //                         //   for(var i =0; i< items.length; i++){
    //                         //     data[i].Title = items.Title;
    //                         //     data[i].Title = items.RequestorEmployeeID;
    //                         //     data[i].Title = items.Author.Title;
    //                         //     data[i].Title = items.RequestStatus;
    //                         //     data[i].Title = items.ApprovalStatus;
    //                         //     data[i].Title = items.PendingTo;
    //                         //     data[i].Title = items.Created;
    //                         //     data[i].Title = items.GUID;
    //                         //   }
    //                         // })
    //                       );
    //                     return data;
    //               }
    //           }
    //           if(fullAccess == 0){
    //             //let ofcLocation = "";
    //             //let empId = "";
    //             //getEmpInfo();
    //             //=======get user Office Locatin starts===========
    //             let logedUserOffice;
    //             this.getEmployeeInfo().then (
    //               (Response) => {
    //                 logedUserOffice = Response.OfficeLocation;
    //                 console.log("Loged User Office location: "+ logedUserOffice);
                    
    //                 alert("Loged User Office location: "+logedUserOffice);
                    
    //               },
    //               (err) =>{console.log(err)},
    //               );               
    //             //---------------- get user Office Locatin ends ----------

    //             for (var userCount = 0; userCount < items.MembersOfUserAccess.results.length; userCount++) {
    //               if ((JSON.parse(JSON.stringify(items))).MembersOfUserAccess.results[userCount].ID == logedUserADId){
    //                 userAccess = 1;
                     
    //                   from(this.getConfigInfo().web
    //                     .lists.getByTitle("ShopSignboardRequestMaster")
    //                     .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
    //                     .expand('Author')
    //                     .filter('RequestorEmployeeID eq employee.OfficeLocation')        
    //                     .get()
    //                       // .then(items => {
    //                       //   for(var i =0; i< items.length; i++){
    //                       //     data[i].Title = items.Title;
    //                       //     data[i].Title = items.RequestorEmployeeID;
    //                       //     data[i].Title = items.Author.Title;
    //                       //     data[i].Title = items.RequestStatus;
    //                       //     data[i].Title = items.ApprovalStatus;
    //                       //     data[i].Title = items.PendingTo;
    //                       //     data[i].Title = items.Created;
    //                       //     data[i].Title = items.GUID;
    //                       //   }
    //                       // })
    //                     );
    //                   return data;
    //             }
    //             }
    //           }
                           
              
    //         }else{
    //           if(fullAccess != 1 && userAccess != 1 ){ 
    //             debugger;
    //                   from(this.getConfigInfo().web
    //                     .lists.getByTitle("ShopSignboardRequestMaster")
    //                     .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
    //                     .expand('Author')
    //                     .filter('RequestorEmployeeID eq "employee.EmployeeId"')        
    //                     .get()
    //                       // .then(items => {
    //                       //   for(var i =0; i< items.length; i++){
    //                       //     data[i].Title = items.Title;
    //                       //     data[i].Title = items.RequestorEmployeeID;
    //                       //     data[i].Title = items.Author.Title;
    //                       //     data[i].Title = items.RequestStatus;
    //                       //     data[i].Title = items.ApprovalStatus;
    //                       //     data[i].Title = items.PendingTo;
    //                       //     data[i].Title = items.Created;
    //                       //     data[i].Title = items.GUID;
    //                       //   }
    //                       // })
    //                     );
    //                   return data;

    //                  // console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.parse(JSON.stringify(data)));
    //           }
    //         }
    //     })
    //      );
    //     console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.parse(JSON.stringify(data)));
    // //--------------user access ends ---------



    
    // let data = 
    //   from(this.getConfigInfo().web
    //     .lists.getByTitle("ShopSignboardRequestMaster")
    //     .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
    //     .expand('Author')        
    //     .get()
    //       // .then(items => {
    //       //   for(var i =0; i< items.length; i++){
    //       //     data[i].Title = items.Title;
    //       //     data[i].Title = items.RequestorEmployeeID;
    //       //     data[i].Title = items.Author.Title;
    //       //     data[i].Title = items.RequestStatus;
    //       //     data[i].Title = items.ApprovalStatus;
    //       //     data[i].Title = items.PendingTo;
    //       //     data[i].Title = items.Created;
    //       //     data[i].Title = items.GUID;
    //       //   }
    //       // })
    //      );
    //     console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.parse(JSON.stringify(data)));
    //return data;
  } 
  //----------- preserved ends for ShopSignboardRequestMaster ----------

  //============preserved for Workshop Proposal starts & 100% works ============
  public getListItems(){
    //let data:ValueItems[] = [];
    if(this.logedInUser.DashboardAccess == "fullAccess"){
      //alert("getListItems() fired! ")
      let data = 
      from(this.getConfigInfo().web
        .lists.getByTitle("ShopSignboardRequestMaster") 
        .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
        .expand('Author')        
        .get()          
         );
        console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.stringify(data));
        return data;
    }

    else if(this.logedInUser.DashboardAccess == "locationwiseAccess"){
      let data = 
      from(this.getConfigInfo().web
        .lists.getByTitle("ShopSignboardRequestMaster") 
        .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
        .expand('Author')
        .filter('RequestorEmployeeID eq this.logedInUser.Office')         
        .get()          
         );
        console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.stringify(data));
      return data;
    }
    else if(this.logedInUser.DashboardAccess == "locationwiseAccess"){
      alert("UserAccess can not be fetched !");
    }
    
  } 
  //----------- preserved for Workshop Proposal ends----------
  
  //============preserved for Workshop Proposal starts & 100% works ============
  // public getListItems(){
  //   //let data:ValueItems[] = [];
  //   let data = 
  //     from(this.getConfigInfo().web
  //       .lists.getByTitle("WorkshopProposalMaster") //ShopSignboardRequestMaster
  //       .items.select('Title', 'EmployeeID','Author/Title','Status','PendingWith/Title','Created', 'GUID')  
  //       .expand('Author', 'PendingWith')        
  //       .get()          
  //        );
  //       console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.parse(JSON.stringify(data)));
  //   return data;
  // } 
  //----------- preserved for Workshop Proposal ends----------

  // //============with array pushed preserved starts ============
  public getWPListItems():Promise<IValueItems[]>{
    console.log(environment);
    let data:IValueItems[] = [];
    // //let dataFrmService = 
    //   //from(this.getConfigInfo().web
    //    from(this.getConfigInfo().web
    //     .lists.getByTitle("WorkshopProposalMaster") 
    //     .items.select('Title', 'EmployeeID','Author/Title','Status','PendingWith/Title','Created', 'GUID')  
    //     .expand('Author', 'PendingWith')        
    //     .get()
    //     .then(items => {
    //       for(var i =0; i< items.length; i++){
    //         var eachItem:IValueItems = {
    //           Title: items[i].Title,
    //           EmployeeID: items[i].EmployeeID,
    //           Author: items[i].Author,
    //           Status: items[i].Status,
    //           PendingWith: items[i].PendingWith,
    //           Created: items[i].Created,
    //           GUID: items[i].GUID,
    //         } 
    //         data.push(eachItem);
    //       }
    //       return data;
    //     })
        
    //      );
         if(1 == 1){
           //this.web = new Web(environment.url);//"https://portaldv.bergerbd.com/leaveauto";
            return this.getConfigInfo().web
            .lists.getByTitle("WorkshopProposalMaster") 
            .items.select('Title', 'EmployeeID','Author/Title','Status','PendingWith/Title','Created', 'GUID')  
            .expand('Author', 'PendingWith')        
            .get()
            .then(items => {
              for(var i = 0; i< items.length; i++){
                var eachItem:IValueItems = {
                  Title: items[i].Title,
                  EmployeeID: items[i].EmployeeID,
                  Author: items[i].Author,
                  Status: items[i].Status,
                  PendingWith: items[i].PendingWith,
                  Created: items[i].Created,
                  GUID: items[i].GUID,
                } 
                data.push(eachItem);
              }
              return data;
            });
         }else{
           var promise = new Promise<IValueItems[]>((resolve, reject) =>{
            console.log("Pls provide Row data from dev environment."); 
            return null;
           });
           return promise;
         }
        //  return data; 
        //console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.parse(JSON.stringify(data)));
    //return data;
  } 
  // //----------- preserved ends----------

  // //============preserved starts ============
  // public getListItems(){
  //   let data = 
  //     from(this.getConfigInfo().web
  //       .lists.getByTitle("WorkshopProposalMaster") 
  //       .items.select('Title', 'EmployeeID','Author/Title','Status','PendingWith/Title','Created', 'GUID')  
  //       .expand('Author', 'PendingWith')        
  //       .get()       
        
               
  //         //  .then((items: WorkshopProposal[]) => {
  //         //    console.log("The Output from WorkshopProposal service ----------------:" + WorkshopProposal[0].ValueItems[0].Title);
  //         //    console.log("The Output from WorkshopProposal service ----------------:" + ValueItems[0].Status);
  //         //    console.log("The Output from WorkshopProposal service ----------------:" + ValueItems[0].Created);

  //         //  })
  //        );
  //       // console.log("WorkshopProposalMaster Data From Service is "+JSON.stringify(data));
  //   return data;
  // } 
  // //----------- preserved ends----------

//"https://portaldv.bergerbd.com/leaveauto/_api/web/lists/getByTitle('WorkshopProposalMaster')/items?&$top=2000000&$select=GUID,UniqueId,ID,Title,WorkshopPurposeOrObjective,ActualDate,ActualExpenditure,PendingWith/ID,PendingWith/Title,Author/ID,Created,Status,Author/Title&$expand=PendingWith/ID,Author/ID&$orderby=Created desc"

  // public getListItems():Promise<ISPList>{
  //   //let data = 
  //     //from(this.getConfigInfo().web
  //     return this.http
  //       .get("https://portaldv.bergerbd.com/leaveauto/_api/web/lists/getByTitle('WorkshopProposalMaster')/items?&$top=2000000&$select=GUID,UniqueId,ID,Title,WorkshopPurposeOrObjective,ActualDate,ActualExpenditure,PendingWith/ID,PendingWith/Title,Author/ID,Created,Status,Author/Title&$expand=PendingWith/ID,Author/ID&$orderby=Created desc")
  //       //.pipe(map((response:Response) => <ISPList>response.json()))
  //       //.map((response:Response) => <ISPList>response.json())
  //       .map((response:Response) => <ISPList>JSON.parse(JSON.stringify(response)))
  //       //.map((response:Response) => <ISPList>JSON.stringify(response))
  //       .toPromise()
  //       .catch(this.handleError)
               
  //               //  .then((items: WorkshopProposal[]) => {
  //               //    console.log("The Output from WorkshopProposal service ----------------:" + WorkshopProposal[0].ValueItems[0].Title);
  //               //    console.log("The Output from WorkshopProposal service ----------------:" + ValueItems[0].Status);
  //               //    console.log("The Output from WorkshopProposal service ----------------:" + ValueItems[0].Created);

  //               //  })
  //       //);
  //       ;
  //               // console.log("WorkshopProposalMaster Data From Service is "+JSON.stringify(data));
  //   //return data;
  // } 
}