import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, observable, Observable, of, Subject } from 'rxjs';
import * as pnp from "sp-pnp-js";
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class TmlistitemsService {

  public webAbsoluteUrl = window.location.origin + "/leaveauto";
  //public webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto"; //uncomment for localhost

  
  constructor(private http: HttpClient) { }

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
              .catch(
                (res)=>{
                  let sringify = JSON.stringify(res);
                  if(userADId == 1026){
                    logedUser.Office = "Corporate";
                    logedUser.EmpID = "000";
                  }else{
                    logedUser.Office = "";
                    logedUser.EmpID = "";
                    logedUser.Access = user.Access;
                  }
                }
              );
    
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
          ).catch(
            (res)=>{
              let sringify = JSON.stringify(res);
              userADId = "";
            }
          );
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

        let apiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('UserAccessMappingforWorkflow')/items?&$top=2000&$select=ID,WorkflowName,Employee/ID,Employee/Title,AccessCategory,AccessibleLocations&$expand=Employee/ID&$filter=((WorkflowName eq '"+workflowName+"') and (Employee/ID eq '"+Number(user.ADId)+"'))"; 
        //let apiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('UserAccessMappingforWorkflow')/items?&$top=2000&$select=ID,WorkflowName,Employee/ID,Employee/Title,AccessCategory,AccessibleLocations,MembersOfFullAccess/ID,MembersOfDivisionAccess/ID,MembersOfOwnLocationAccess/ID,MembersOfFullAccess/Title,MembersOfDivisionAccess/Title,MembersOfOwnLocationAccess/Title&$expand=Employee/ID,MembersOfFullAccess/ID,MembersOfDivisionAccess/ID,MembersOfOwnLocationAccess/ID&$filter=((WorkflowName eq '"+workflowName+"') and (Employee/ID eq '"+Number(user.ADId)+"'))"; 
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
              )
              .catch(
                (res)=>{
                  let sringify = JSON.stringify(res);
                  user.Access = "selfAppliedAccess";
                }
              );
              console.log("User Access: " + user.Access);
              return user;
        
  }

  async getLoggedUserAuth():Promise<any>{      
    let logedUser = {
      aDID:"",
      name:"",
      email:"",
      empID:"",
      office:"",
      access:"NoAccess",
      locations:[]
     } 
    let user = await this.getUserAccess();
    let emp;
    if(user.Access != "fullAccess"){
      emp = await this.getEmpIdNdOffice(user);
      logedUser.empID = emp.EmpID;
      logedUser.office = emp.Office;      
      logedUser.locations = user.Locations;       
    }
    logedUser.aDID = user.ADId;
    logedUser.access = user.Access;
    return logedUser;
  }

  public getMasterListItems(user?:any):Promise<any>{
    let data;
    if(user.access == "fullAccess"){
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
    else if(user.access == "divisionAccess"){
      let filterString = "";
      for(let c=0; c<user.locations.length; c++){
        if(c == 0){
          filterString = "RequestorLocation eq '"+user.locations[c]+"'";              
        }else{
          filterString = filterString +" or RequestorLocation eq '"+user.locations[c]+"'";
        }
      }
      data = 
      from(this.getConfigInfo().web
        .lists.getByTitle("ShopSignboardRequestMaster") 
        .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
        .filter(filterString)
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

  //=============== only this generic method is being used for Dashboard to fetch data =========
  public fetchListItemsWithFilterExpand(list?: any, user?: any):Promise<any>{
    let userADId = user;
        
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        //.expand(list.expand)
        //.filter(list.filterBy+" eq '"+list.filterWith+"'") 
        //.filter(list.filter)
        //.filter("substringof('"+ user.Office +"' ,Author/Office)")            
        //.filter("RequestCode eq '"+list.filterWith+"'")
        .filter(list.filterBy+" eq '"+list.filterWith+"'")
        .orderBy('Created', false)
        .top(list.top) 
        .get()          
        );        
          //console.log("Fetched data by fetchListItems service: "+ JSON.stringify(data));
        return data;
  }

  public getDetailListItems(user?:any, list?:any):Promise<any>{
    let data;

    if(user.access == "fullAccess" || user.access == "divisionAccess"){
      data =
        from(this.getConfigInfo().web.lists
          .getByTitle(list.name) 
          .items.select(list.select)
          .orderBy('Created', false)
          .top(200000) 
          .get()          
          );
          return data;            
    }      
    else if(user.access == "ownLocationAccess"){
      let uOffice = user.office;
      data =
      from(this.getConfigInfo().web.lists
          .getByTitle(list.name) 
          .items.select(list.select)
          .filter("RequestorLocation eq '"+uOffice+"'")
          .expand('Author')
          .orderBy('Created', false)
          .top(200000)        
          .get()          
          ); 
          return data;            
    }
    //else if(user.access == "selfAppliedAccess"){
    else {
      let uempID = user.empID;
      data =
      from(this.getConfigInfo().web.lists
          .getByTitle(list.name) 
          .items.select(list.select)
          .filter("RequestorEmployeeID eq '"+uempID+"'")
          .expand('Author')
          .orderBy('Created', false)
          .top(200000)        
          .get()          
          );  
          return data;  
          
          // data = 
          // from(this.getConfigInfo().web
          //   .lists.getByTitle("ShopSignRequestDetail") 
          //   .items.select('RequestCode','CustomerType','RequestType','SubDealerName','TaggedDelearCode','CustomerCodeOrName','CustomerAddress','ContactPerson','ContactNumber','YearlyTarget','WorkType','SignboardType','WidthByRequestor','HeightByRequestor','NumberOfSignboard','ExistingBrand','PreferredBrand','TentativeDate','WidthByVendor','HeightByVendor','TotalSizeByVendor','PerSFTRate','TotalRate','VendorCode','OtherCost')  
          //   .filter("RequestorEmployeeID eq '"+uempID+"'")
          //   .expand('Author')
          //   .orderBy('Created', false)
          //   .top(200000)        
          //   .get()          
          //   );
          //   console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.stringify(data));
          // return data;   
    }
  }
  //----------------sync - await implementation ends --------------

  async getEmpInfo(user):Promise<any>{
    let logedUser = {
      Company: "",
      CompanyCode: "",
      CostCenter: "",
      Department: "",
      DeptID: "",
      Designation: "",
      Email: "",
      ID: null,
      EmployeeGrade: "",
      EmployeeId: "",
      EmployeeName: "",
      Mobile: "",
      OfficeLocation: "",
      OPMName: "",
      OptManagerEmail: "",
      OPMEmployeeId: null,
      BusAreaName: "",
      //OPMEmail: "",
      OPMADId: null
    }
    let userADId = Number(user.ADId);
    
      //let apiUrl = "https://portaldv.bergerbd.com/leaveauto/_api/web/lists/getByTitle('BergerEmployeeInformation')/items?&$top=2000000&$select=EmployeeName,Email/ID,Email/Title,Email/EMail,OptManagerEmail/ID,OptManagerEmail/Title,DeptID,EmployeeId,EmployeeGrade,Department,Designation,OfficeLocation,Mobile,CostCenter,CompanyCode&$expand=Email/ID,OptManagerEmail/ID&$filter=Email/ID eq 1026"
      //let apiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('BergerEmployeeInformation')/items?&$top=2000000&$select=EmployeeName,Email/ID,Email/Title,Email/EMail,OptManagerEmail/ID,OptManagerEmail/Title,DeptID,EmployeeId,EmployeeGrade,CompanyCode,Department,Designation,OfficeLocation,Mobile,CostCenter&$expand=Email/ID,OptManagerEmail/ID&$filter=Email/ID eq '"+userADId+"'"; 
      let apiUrl = "https://portaldv.bergerbd.com/leaveauto/_api/web/lists/getByTitle('BergerEmployeeInformation')/items?&$top=2000000&$select=Company,EmployeeName,Email/ID,Email/Title,Email/EMail,OptManagerEmail/ID,OptManagerEmail/Title,DeptID,EmployeeId,EmployeeGrade,CompanyCode,Department,Designation,OfficeLocation,Mobile,CostCenter,OptManagerEmail&$expand=Email/ID,OptManagerEmail/ID&$filter=Email/ID eq '1026'"  
      await this.http
            .get(apiUrl)
            .toPromise()
            .then(
            (res) => {
              let sringify = JSON.stringify(res);
              let parse = JSON.parse(sringify);
              logedUser.Company = parse.value[0].Company;
              logedUser.CompanyCode = parse.value[0].CompanyCode;
              logedUser.CostCenter = parse.value[0].CostCenter;
              logedUser.Department = parse.value[0].Department;
              logedUser.DeptID = parse.value[0].DeptID;
              logedUser.Designation = parse.value[0].Designation;
              logedUser.Email = parse.value[0].Email.EMail;
              logedUser.ID = parse.value[0].Email.ID;
              logedUser.EmployeeGrade = parse.value[0].EmployeeGrade;
              logedUser.EmployeeId = parse.value[0].EmployeeId;
              logedUser.EmployeeName = parse.value[0].EmployeeName;
              logedUser.Mobile = parse.value[0].Mobile;
              logedUser.OfficeLocation = parse.value[0].OfficeLocation;
              logedUser.OPMName = parse.value[0].OptManagerEmail.Title;
              logedUser.OptManagerEmail = parse.value[0].OptManagerEmail;
              logedUser.OPMADId = parse.value[0].OptManagerEmail.ID;


              console.log("Loged user's Office Location : " + logedUser.OfficeLocation +"; Emp ID: "+ logedUser.EmployeeId);
              }            
              )
              .catch(
                (res)=>{
                  let sringify = JSON.stringify(res);
                  if(userADId == 1026){
                    logedUser.OfficeLocation = "Corporate";
                    logedUser.EmployeeId = "000";
                  }else{
                    logedUser.OfficeLocation = "";
                    logedUser.EmployeeId = "";
                  }
                }
              );
    
    return logedUser;
  }
}
