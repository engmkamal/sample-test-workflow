import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService, DashboardUsers } from "./list-interface";
import { from, observable, Observable, of, Subject } from 'rxjs';
import * as pnp from "sp-pnp-js";
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class AccesswiselistitemsService {  

  //public webAbsoluteUrl = "https://portaldv.bergerbd.com/leaveauto"; //uncomment for localhost
  public webAbsoluteUrl = window.location.origin + "/leaveauto";   

  constructor(private http: HttpClient) {
  }

  private getConfigInfo(){
    const mySP = pnp.sp.configure({
      headers:{
        "Accept": "application/json; odata=verbose"
      }
    }, this.webAbsoluteUrl);
    //console.log("Returned config: "+ mySP);
    return mySP;
  }

  //===================sync - await implementation strat ============
  async getEmpIdNdOffice(user):Promise<any>{
    let logedUser = {
      Office: "",
      EmpID:"",
      Access:user.Access,
    }
    let userADId = Number(user.ADId);
      //let apiUrl = "https://portaldv.bergerbd.com/leaveauto/_api/web/lists/getByTitle('BergerEmployeeInformation')/items?&$top=2000000&$select=EmployeeName,Email/ID,Email/Title,Email/EMail,OptManagerEmail/ID,OptManagerEmail/Title,DeptID,EmployeeId,EmployeeGrade,Department,Designation,OfficeLocation,Mobile,CostCenter,CompanyCode&$expand=Email/ID,OptManagerEmail/ID&$filter=Email/ID eq 1026"
      let apiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('BergerEmployeeInformation')/items?&$top=2000000&$select=EmployeeName,Email/ID,Email/Title,Email/EMail,OptManagerEmail/ID,OptManagerEmail/Title,DeptID,EmployeeId,EmployeeGrade,Department,Designation,OfficeLocation,Mobile,CostCenter,CompanyCode&$expand=Email/ID,OptManagerEmail/ID&$filter=Email/ID eq '"+userADId+"'"; 
        await this.http
            .get(apiUrl)
            .toPromise()
            .then(
            (res) => {
              let sringify = JSON.stringify(res);
              let parse = JSON.parse(sringify);
              logedUser.Office = parse.value[0].OfficeLocation;
              logedUser.EmpID = parse.value[0].EmployeeId;

              console.log("Loged user's Office Location : " + logedUser.Office +"; Emp ID: "+ logedUser.EmpID);
              //alert("Loged user's OfficeLocation: " + parse.value[0].OfficeLocation +"; Emp ID: "+ parse.value[0].EmployeeId);
              }            
              )
    return logedUser;
  }

  async getSPLoggedInUser():Promise<any>{   
    let userADId;
    let apiUrl = this.webAbsoluteUrl + "/_api/web/currentuser?$expand=Groups"; 
    await this.http
        .get(apiUrl)
        .toPromise()
        .then(
        (res) => {
          userADId = JSON.parse(JSON.stringify(res)).Id;
          }            
          )
    //return Number(userADId);
    return +userADId; 
  }

  async getUserAccess():Promise<any> {
    let user = {
      ADId:0,
      Access:"",
      Office: "",
      EmpID:"",
      Locations:[],        
    }
    user.ADId = await this.getSPLoggedInUser();
    const workflowName = "TradeMerchandisingDashboard";           
    let fullAccessUsers = [];
    let locationwiseAccessUsers = [];
    let divisionAccessUsers = [];

        let apiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('UserAccessMappingforWorkflow')/items?&$top=2000&$select=ID,WorkflowName,Employee/ID,Employee/Title,AccessCategory,AccessibleLocations&$expand=Employee/ID&$filter=WorkflowName eq '"+workflowName+"'"; 
        //let apiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('UserAccessMappingforWorkflow')/items?&$top=2000&$select=ID,WorkflowName,MembersOfFullAccess/ID,MembersOfDivisionAccess/ID,MembersOfOwnLocationAccess/ID,MembersOfFullAccess/Title,MembersOfDivisionAccess/Title,MembersOfOwnLocationAccess/Title&$expand=MembersOfFullAccess/ID,MembersOfDivisionAccess/ID,MembersOfOwnLocationAccess/ID&$filter=WorkflowName eq '"+workflowName+"'"; 
        await this.http
              .get(apiUrl)
              .toPromise()
              .then(
                (res) => {
                  let sringify = JSON.stringify(res);
                  let parse = JSON.parse(sringify);

                  if ((parse.value[0].Employee.ID) && parse.value[0].AccessCategory.length) {
                    user.Access = parse.value[0].AccessCategory;
                    if(user.Access == "divisionAccess"){
                      user.Locations = parse.value[0].AccessibleLocations;
                    }
                    //alert("User access: "+ user.Access);
                  }
                    
                    // if (Array.isArray(parse.value[0].MembersOfFullAccess) && parse.value[0].MembersOfFullAccess.length) {
                    //   fullAccessUsers = parse.value[0].MembersOfFullAccess;
                    // }

                    // if (Array.isArray(parse.value[0].MembersOfDivisionAccess) && parse.value[0].MembersOfDivisionAccess.length) {
                    //   divisionAccessUsers = parse.value[0].MembersOfDivisionAccess;
                    // }

                    // if (Array.isArray(parse.value[0].MembersOfOwnLocationAccess) && parse.value[0].MembersOfOwnLocationAccess.length) {
                    //   locationwiseAccessUsers = parse.value[0].MembersOfOwnLocationAccess;
                    // }
                    // console.log("No. of full Access Users: "+ fullAccessUsers.length + "; No of Division Access Users: "+ divisionAccessUsers.length + "; No of Own locationwise Access Users: "+ locationwiseAccessUsers.length);
                    
                    // if (Array.isArray(fullAccessUsers) && fullAccessUsers.length) {
                    //   if(fullAccessUsers.some((fullAccessUsers) => fullAccessUsers.ID == Number(user.ADId))){                
                    //     user.Access = "fullAccess";                      
                    //   }
                    // }

                    // if(user.Access != "fullAccess"){
                    //   if (Array.isArray(divisionAccessUsers) && divisionAccessUsers.length) {
                    //     if(divisionAccessUsers.some((divisionAccessUsers) => divisionAccessUsers.ID == Number(user.ADId))){                
                    //       user.Access = "divisionAccess";                       
                    //     }
                    //   }
                    // }
                    
                    // if(user.Access != "fullAccess" && user.Access != "divisionAccess"){
                    //   if (Array.isArray(locationwiseAccessUsers) && locationwiseAccessUsers.length) {
                    //     if(locationwiseAccessUsers.some((locationwiseAccessUser) => locationwiseAccessUser.ID == Number(user.ADId))){                    
                    //       user.Access = "ownLocationAccess";
                    //     }
                    //   }
                    // }
                    
                    // if(user.Access != "fullAccess" && user.Access != "divisionAccess" && user.Access != "ownLocationAccess"){
                    //   user.Access = "selfAppliedAccess";
                    // }                  
                  },
              );
              console.log("User Access: " + user.Access);
              return user;
        
  }

  async getLoggedUserAuth():Promise<any>{      
    let logedUser ={
      aDID:"",
      name:"",
      email:"",
      empID:"",
      office:"",
      access:"NoAccess",
     }      
    //let emp = await this.getEmpIdNdOffice();
    let user = await this.getUserAccess();
    let emp;
    if(user.Access != "fullAccess"){
      emp = await this.getEmpIdNdOffice(user);
      logedUser.empID = emp.EmpID;
      logedUser.office = emp.Office;       
    }
    logedUser.aDID = user.ADId;
    logedUser.access = user.Access;     
    //alert('Final output: '+ logedUser.aDID + logedUser.office + logedUser.empID);
    return logedUser;
  }

  public getListItems(user?:any):Promise<any>{
    let data;
    if(user.access == "fullAccess" || user.access == "divisionAccess"){
      data = 
      from(this.getConfigInfo().web
        .lists.getByTitle("ShopSignboardRequestMaster") 
        .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
        .expand('Author')
        .orderBy('Created', false)
        .top(200000)    
        .get()          
         );
        console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.stringify(data));
      return data;
      
    }      
    else if(user.access == "ownLocationAccess"){
      let uOffice = user.office; 
      data = 
      from(this.getConfigInfo().web
        .lists.getByTitle("ShopSignboardRequestMaster") 
        .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
        .filter("RequestorLocation eq '"+uOffice+"'")
        .expand('Author')
        .orderBy('Created', false)
        .top(200000)        
        .get()          
         );
        console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.stringify(data));
      return data;
      
    }
    //else if(user.access == "selfAppliedAccess"){
    else {
      let uempID = user.empID;
      data = 
      from(this.getConfigInfo().web
        .lists.getByTitle("ShopSignboardRequestMaster") 
        .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
        .filter("RequestorEmployeeID eq '"+uempID+"'")
        .expand('Author')
        .orderBy('Created', false)
        .top(200000)        
        .get()          
         );
        console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.stringify(data));
      return data;
      
    }
  }
  //----------------sync - await implementation ends --------------  
  
}
