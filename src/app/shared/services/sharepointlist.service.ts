import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, observable, Observable, of, Subject, pipe } from 'rxjs';
import * as pnp from "sp-pnp-js";
import { resolve } from 'url';

import { groupBy, tap, mergeMap, reduce, map, filter, catchError } from 'rxjs/operators';
import { GroupedObservable } from 'rxjs/internal/operators/groupBy';
import { OnInit } from '@angular/core';

import { ISPList, IValueItems, IMyProcessItems, IUserAccess, AuthorItems, DashboardUsers} from "../../list-interface";


interface Workflow {
  Title: string; 
  ProcessName: string; 
  RequestedByName:string; 
  Status:string;
}
interface WorkflowGroup{
  key: string;
  value: Array<Workflow>;
}

@Injectable({
  providedIn: 'root'
})
export class SharepointlistService implements OnInit{

  //public webAbsoluteUrl = window.location.origin + "/leaveauto";
  public webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto"; //uncomment for localhost //PendingApproval

  private getConfigInfo(){
    const mySP = pnp.sp.configure({
      headers:{
        "Accept": "application/json; odata=verbose"
      }
    }, this.webAbsoluteUrl);
    //console.log("Returned config: "+ mySP);
    return mySP;
  };  

  constructor(private http: HttpClient) { }

  ngOnInit() {}

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

  async getEmpIdNdOffice(user?):Promise<any>{
    let logedUser = {
      Office: "",
      EmpID:"",
      //Access:user.Access,
    }
    let userADId = Number(await this.getSPLoggedInUser());    
    
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
                    //logedUser.Access = user.Access;
                  }
                }
              );
    
    return logedUser;
  }

  async getLoggedInUsersProcess(){   
    let user = {
      ADId:0,
      Access:"",
      Office: "",
      EmpID:"",
      Locations:[],        
    }
    
    user.ADId = await this.getSPLoggedInUser();
    
    let apiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('PendingApproval')/items?&$top=2000&$select=Title,ProcessName,Status,RequestLink,Modified,Created,PendingWith/ID,PendingWith/Title,Author/ID,Author/Title&$expand=Author,PendingWith&$filter=Author/ID eq '"+Number(user.ADId)+"'&$orderby=ProcessName asc"; 
    let items;
    let data:IMyProcessItems[] = []; 
    await this.http
        .get(apiUrl)
        .toPromise()
        .then(
        //.subscribe(
        (res) => {
          items = JSON.parse(JSON.stringify(res));
          var pWith;
          for(var i = 0; i< items.value.length; i++){
            if(items.value[i].PendingWith != undefined){
                pWith = items.value[i].PendingWith[0].Title;
            }
            var eachItem:IMyProcessItems = {
              Title: items.value[i].Title,
              ProcessName: items.value[i].ProcessName,
              //EmployeeID: items[i].EmployeeID,
              Author: items.value[i].Author,
              Status: items.value[i].Status,              
              PendingWith: pWith,
              //PendingWith: items.value[i].PendingWith.results[0].Title,
              Created: items.value[i].Created,
              Modified: items.value[i].Modified,
              //RequestedByName: items[i].RequestedByName,
              //RequestedByEmail: items.value[i].RequestedByEmail,
              RequestLink: items.value[i].RequestLink,
              //GUID: items[i].GUID,
            }

            
            data.push(eachItem);
          }
          }            
          ).catch(
            (res)=>{
              let sringify = JSON.stringify(res);
            }
          );
    return data; 
  }

  //========= for all dashboards start ==========
  async getLoggedInUsersDashboards(){   
    let user = {
      ADId:0,
      Access:"",
      Office: "",
      EmpID:"",
      Locations:[],        
    }
    
    //user.ADId = await this.getSPLoggedInUser();  // activate and implement for user access on dashboards
    
    let apiUrl = this.webAbsoluteUrl + "/_api/web/lists/getByTitle('PendingApproval')/items?&$top=2000&$select=Title,ProcessName,Status,RequestLink,Modified,Created,PendingWith/ID,PendingWith/Title,Author/ID,Author/Title&$expand=Author,PendingWith&$orderby=ProcessName asc"; 
    let items;
    let data:IMyProcessItems[] = []; 
    await this.http
        .get(apiUrl)
        .toPromise()
        .then(
        //.subscribe(
        (res) => {
          items = JSON.parse(JSON.stringify(res));
          var pWith;
          for(var i = 0; i< items.value.length; i++){
            if(items.value[i].PendingWith != undefined){
                pWith = items.value[i].PendingWith[0].Title;
            }
            var eachItem:IMyProcessItems = {
              Title: items.value[i].Title,
              ProcessName: items.value[i].ProcessName,
              //EmployeeID: items[i].EmployeeID,
              Author: items.value[i].Author,
              Status: items.value[i].Status,              
              PendingWith: pWith,
              //PendingWith: items.value[i].PendingWith.results[0].Title,
              Created: items.value[i].Created,
              Modified: items.value[i].Modified,
              //RequestedByName: items[i].RequestedByName,
              //RequestedByEmail: items.value[i].RequestedByEmail,
              RequestLink: items.value[i].RequestLink,
              //GUID: items[i].GUID,
            }

            
            data.push(eachItem);
          }
          }            
          ).catch(
            (res)=>{
              let sringify = JSON.stringify(res);
            }
          );
    return data; 
  }
  //-----------for all dashbboards ends ---------
  public getUsersWFMasterListItems(list?: any, user?: any):Promise<any>{
    let userADId = user;
    let data;
    data = 
        from(this.getConfigInfo().web
          .lists.getByTitle(list.name) 
          .items.select(list.query)
          .expand('Author') 
          //.expand('PendingWith', 'Author')             
          //.filter("Author/ID eq '"+Number(userADId)+"'")          
          .orderBy('Created', false)
          .top(20000)   
          .get()          
          );
          //console.log("Fetched data by getLoggedUsersWFMasterListItems: "+ JSON.stringify(data));
        return data;


    // if(user.Office == "Corporate"){
    //   let data;
    //     data = 
    //     from(this.getConfigInfo().web
    //       .lists.getByTitle(list.name) 
    //       .items.select(list.query)
    //       //.expand('Author') 
    //       //.expand('PendingWith', 'Author')             
    //       //.filter("Author/ID eq '"+Number(userADId)+"'")          
    //       .orderBy('Created', false)
    //       .top(20000)   
    //       .get()          
    //       );
    //       //console.log("Fetched data by getLoggedUsersWFMasterListItems: "+ JSON.stringify(data));
    //     return data;
    // }
    // else {
    //   let data;
    //     data = 
    //     from(this.getConfigInfo().web
    //       .lists.getByTitle(list.name)
    //       .items
    //       //.filter("Status eq 'Submitted'")
    //       //.filter("Author/Office eq 'Corporate (9000)'")
    //       //.filter(`substringof('Corporate' ,Author/Office)`)
    //       .expand('Author')
    //       //.expand('PendingWith', 'Author')
    //       .orderBy('Created', false)
    //       .select(list.query)           
    //       //.filter("Author/ID eq '"+Number(userADId)+"'")
    //       .top(100)   
    //       .get()         
    //       );
    //       console.log("Fetched data by getLoggedUsersWFMasterListItems: "+ JSON.stringify(data));
    //     return data;
    // }
     
  }

  public getUsersWFMasterFewListItems(list?: any, user?: any):Promise<any>{
    let userADId = user;
    if(user.Office == "Corporate"){
      let data;
        data = 
        from(this.getConfigInfo().web
          .lists.getByTitle(list.name) 
          .items
          .orderBy('Created', false)
          .select(list.query)
          .expand('PendingWith', 'Author')              
          //.filter("Author/ID eq '"+Number(userADId)+"'")         
          .top(100)   
          .get()          
          );
          //console.log("Fetched data by getLoggedUsersWFMasterListItems: "+ JSON.stringify(data));
        return data;
    }
    else {
      let data;
        data = 
        from(this.getConfigInfo().web
          .lists.getByTitle(list.name)
          .items
          .orderBy('Created', false)
          .filter("substringof('"+ user.Office +"' ,Author/Office)")
          .expand('PendingWith', 'Author')         
          .select(list.query)           
          //.filter("Author/ID eq '"+Number(userADId)+"'")
          .top(100)   
          .get()          
          );
          console.log("Fetched data by getLoggedUsersWFMasterListItems: "+ JSON.stringify(data));
        return data;
    }
     
  }

  public getUsersTMMasterListItems(list?: any, user?: any):Promise<any>{
    let data;    
      let uempID = user;
      data = 
      from(this.getConfigInfo().web
        .lists.getByTitle(list.name) 
        .items.select('ID','RequestID','RequestorEmployeeID','RequestorName','RequestorLocation','RequestorBusinessArea','RequestorCostCenter','Division','MerchandizingType','RequestorEmail','Author/Title','RequestStatus','ApprovalStatus','PendingTo','Created','VendorName','VendorCode','VendorAddress','VendorEmail','VendorStatus','TotalAmount','GUID','Modified')  
        .filter("RequestorEmployeeID eq '"+uempID+"'")
        .expand('Author')
        .orderBy('Created', false)
        .top(200000)        
        .get()          
         );
        //console.log("Fetched data by ListWithSppnpjs Service: "+ JSON.stringify(data));
      return data;      
    
  }

  public getUsersWFOldMasterListItems(list?: any, user?: any):Promise<any>{
    let data;    
      let uempID = user;
      data = 
      from(this.getConfigInfo().web
        .lists.getByTitle(list.name) 
        .items.select(list.query)  
        .filter("RequestorEmployeeID eq '"+uempID+"'")
        .expand(list.expand)
        .orderBy('Created', false)
        .top(200000)        
        .get()          
         );
        //console.log("Fetched data by getUsersWFOldMasterListItems Service: "+ JSON.stringify(data));
      return data;
  }


  async getGroupedListItems(){
    //let all = this.workflows$;
    let group =[];

    let all = await this.getMasterListItems();
    let allReq = await JSON.parse(JSON.stringify(all));
    
    await allReq
      .pipe(
        groupBy((workflow: Workflow) => workflow.ProcessName),
        // tap(console.log)
        mergeMap((workflowsGroup$: GroupedObservable<string, Workflow>) =>
          workflowsGroup$.pipe(
            reduce((acc: Array<Workflow>, cur: Workflow) => [...acc, cur], []),
            map((arr: Array<Workflow>) => {
              return {
                key: arr[0].ProcessName,
                value: [...arr]
              };
            }),
            tap((data: WorkflowGroup) => {group.push(data); console.log(data); console.log(group.length)})
          )
        )
      )
      .subscribe();

      let data = {
        all: allReq,
        grouped: group,
      }
      return data;
  }

  public getMasterListItemsWithParam(list?: any, user?: any){
    let data;
      data = 
      from(this.getConfigInfo().web
        .lists.getByTitle("PendingApproval") 
        .items.select('ID','Title','ProcessName','RequestedByName','Status','EmployeeID','RequestedByEmail','RequestLink','GUID','Modified','Created','PendingWith/ID','PendingWith/Title','Author/ID','Author/Title')  //,'Author/ID','Author/Title','Author/Office','PendingWith/ID','PendingWith/Title',
        //.expand('Author', 'PendingWith')
        .expand('PendingWith', 'Author')
        .orderBy('Created', false)
        .top(200000)        
        .get()          
         );
        //console.log("Fetched data by SharepointlistService: "+ JSON.stringify(data));
      return data; 
  }

  public getMasterListItems(){
    let data;
      data = 
      from(this.getConfigInfo().web
        .lists.getByTitle("PendingApproval") 
        .items.select('ID','Title','ProcessName','RequestedByName','Status','EmployeeID','RequestedByEmail','RequestLink','GUID','Modified','Created','PendingWith/ID','PendingWith/Title','Author/ID','Author/Title')  //,'Author/ID','Author/Title','Author/Office','PendingWith/ID','PendingWith/Title',
        //.expand('Author', 'PendingWith')
        .expand('PendingWith', 'Author')
        .orderBy('Created', false)
        .top(200000)        
        .get()          
         );
        //console.log("Fetched data by SharepointlistService: "+ JSON.stringify(data));
      return data; 
  }


  // //============with array pushed preserved starts ============
  public getAllWFListItems():Promise<IMyProcessItems[]>{
    let user = {
      ADId:0,
      Access:"",
      Office: "",
      EmpID:"",
      Locations:[],        
    }
    //user.ADId = 1026;
    //user.ADId = await this.getSPLoggedInUser();


    //public getAllWFListItems():Promise<IMyProcessItems[]>{
      
    let data:IMyProcessItems[] = [];    
         if(1 == 1){
            return this.getConfigInfo().web
            .lists.getByTitle("PendingApproval") 
            .items.select('ID','Title','ProcessName','Status','EmployeeID','RequestedByEmail','RequestLink','GUID','Modified','Created','PendingWith/ID','PendingWith/Title','Author/ID','Author/Title')  
            .expand('Author', 'PendingWith')
            //.filter("Author/ID eq '"+Number(user.ADId)+"'")
            .orderBy('ProcessName', true)
            .top(200000)          
            .get()
            .then(items => {
              for(var i = 0; i< items.length; i++){
                var eachItem:IMyProcessItems = {
                  Title: items[i].Title,
                  ProcessName: items[i].ProcessName,
                  //EmployeeID: items[i].EmployeeID,
                  Author: items[i].Author,
                  Status: items[i].Status,
                 // PendingWith: items[i].PendingWith.results[0].Title,
                  //PendingWith: items[i].PendingWith.results[0].Title,
                  Created: items[i].Created,
                  Modified: items[i].Modified,
                  //RequestedByName: items[i].RequestedByName,
                  RequestedByEmail: items[i].RequestedByEmail,
                  RequestLink: items[i].RequestLink,
                  //GUID: items[i].GUID,
                } 
                data.push(eachItem);
              }
              return data;
            });
         }else{
           var promise = new Promise<IMyProcessItems[]>((resolve, reject) =>{
            console.log("Pls provide Row data from dev environment."); 
            return null;
           });
           return promise;
         }
  } 
  // //----------- preserved ends----------

  public fetchListItems_Old(list?: any, user?: any):Promise<any>{
    let userADId = user;
    if(user.Office == "Corporate"){
      let data;
        data = 
        from(this.getConfigInfo().web
          .lists.getByTitle(list.name) 
          .items.select(list.query)
          .expand('PendingWith', 'Author') 
          //.filter(`substringof('Corporate' ,Author/Office)`)
          .orderBy('Created', false)
          .top(200000)  
          .get()          
          );
          //console.log("Fetched data by getLoggedUsersWFMasterListItems: "+ JSON.stringify(data));
        return data;
    }
    else{
      let data;
        data = 
        from(this.getConfigInfo().web
          .lists.getByTitle(list.name) 
          .items.select(list.query)
          .expand('PendingWith', 'Author') 
          .filter("substringof('"+ user.Office +"' ,Author/Office)")            
          //.filter("Author/ID eq '"+Number(userADId)+"'")
          .orderBy('Created', false)
          .top(200000)   
          .get()          
          );
          //console.log("Fetched data by getLoggedUsersWFMasterListItems: "+ JSON.stringify(data));
        return data;
    } 
  }

  //=============== only this generic method is being used for Emp Reimbursement & other Dashboards to fetch data =========
  public fetchListItems(list?: any, user?: any):Promise<any>{
    let userADId = user;
        
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .expand(list.expand)
        //.expand('PendingWith', 'Author') 
        //.filter(list.filter)
        //.filter("substringof('"+ user.Office +"' ,Author/Office)")            
        //.filter("Author/ID eq '"+Number(userADId)+"'")
        .orderBy('Created', false)
        .top(list.top) 
        .get()          
        );        
          //console.log("Fetched data by fetchListItems service: "+ JSON.stringify(data));
        return data;
  }

  //=============== only this generic method is being used for Dashboard to fetch data =========
  public fetchListItemsWithFilterExpand(list?: any, user?: any):Promise<any>{
    let userADId = user;
        
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .expand(list.expand)
        .filter(list.filterBy+" eq '"+list.filterWith+"'") 
        //.filter(list.filter)
        //.filter("substringof('"+ user.Office +"' ,Author/Office)")            
        //.filter("Author/ID eq '"+Number(userADId)+"'")
        .orderBy('Created', false)
        .top(list.top) 
        .get()          
        );        
          //console.log("Fetched data by fetchListItems service: "+ JSON.stringify(data));
        return data;
  }
  
}


