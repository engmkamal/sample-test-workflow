import { Injectable } from '@angular/core';


import { HttpClient} from '@angular/common/http';
import { from, observable, Observable, of, Subject, pipe } from 'rxjs';
//import * as pnp from "sp-pnp-js";
//import { resolve } from 'url';

import { groupBy, tap, mergeMap, reduce, map, filter, catchError } from 'rxjs/operators';
import { GroupedObservable } from 'rxjs/internal/operators/groupBy';
import { OnInit } from '@angular/core';

import { IItem} from "../models/interfaces/isplist";

//import { IWorkflowrequestor} from "../models/interfaces/iworkflowrequestor";




//import { sp } from "../../../../node_modules/@pnp/sp";
import "../../../../node_modules/@pnp/sp/webs";
import "../../../../node_modules/@pnp/sp/lists";
import "../../../../node_modules/@pnp/sp/items";
import { IItemAddResult } from "../../../../node_modules/@pnp/sp/items";


// import { IListItem } from './IListItem';  
 import pnp, { sp, Item, ItemAddResult, ItemUpdateResult } from "sp-pnp-js";
import { numberFormat } from 'highcharts';
import { resolve } from 'dns';





@Injectable({
  providedIn: 'root'
})
export class SharepointworkflowService {

  //public webAbsoluteUrl = window.location.origin + "/leaveauto";
  public webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto"; //uncomment for localhost //PendingApproval
  //public webAbsoluteUrl = "https://portal.bergerbd.com/mou";
  //public webAbsoluteUrl = window.location.origin + "/mou";
  
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

  //=========get logged user Active Directory ID================
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
    //return Number(userADId);Email
    return +userADId; 
  }

  //=========get logged user Email================
  async getSPLoggedInUserEmail():Promise<any>{   
    let userADEmail;
    let apiUrl = this.webAbsoluteUrl + "/_api/web/currentuser?$expand=Groups"; 
    await this.http
        .get(apiUrl)
        .toPromise()
        .then(
        (res) => {
          userADEmail = JSON.parse(JSON.stringify(res)).Email;
          }            
          ).catch(
            (res)=>{
              let sringify = JSON.stringify(res);
              userADEmail = "";
            }
          );
    //return Number(userADId);
    return userADEmail; 
  }

  //=========fetching list items with filter (filter by ADId)options ================
  public getItemsWithFilterExpand(list?: any, user?: any):Promise<any>{
    let userADId = user; 
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .expand(list.expand)
        //.filter("substringof('"+ user.Office +"' ,Author/Office)")            
        .filter(list.filterBy+" eq '"+Number(userADId)+"'")
        .orderBy('Created', false)
        .top(Number(list.top))  
        .get()
        .catch((rej)=>{
          console.log(rej.message);
        })         
        );        
          //console.log("Fetched data by getItemsWithFilterExpand service: "+ JSON.stringify(data));
        return data;
  }

   //=========fetching list items with filter (filter by ADId)options ================
   public getItemWithAnyFilterExpand(list?: any, user?: any):Promise<any>{
    let userADId = user; 
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .expand(list.expand)
        //.filter("substringof('"+ user.Office +"' ,Author/Office)")            
        .filter(list.filterBy+" eq '"+list.filterWith+"'")
        .orderBy('Created', false)
        .top(Number(list.top))  
        .get()          
        );        
          //console.log("Fetched data by getItemsWithFilterExpand service: "+ JSON.stringify(data));
        return data;
  }

  //=========fetching list items with filter (filter by ADEmail)options ================
  public getItemsWithEmailFilter(list?: any, userEmail?: any):Promise<any>{
    //userEmail = "shoaib@bergerbd.com"; //should be comment out for production
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .filter(list.filterBy+" eq '"+userEmail+"'")
        .orderBy('Created', false)
        .top(Number(list.top))  
        .get()          
        );        
          //console.log("Fetched data by getItemsWithFilterExpand service: "+ JSON.stringify(data));
        return data;
  }

  //=========fetching list items without filter options ================
  public getItemsWithoutFilter(list?: any, user?: any):Promise<any>{
    let userADId = user;
        
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .expand(list.expand)
        //.filter("substringof('"+ user.Office +"' ,Author/Office)")
        //.filter(list.filterBy+" eq '"+Number(userADId)+"'")
        .orderBy('Created', false)
        .top(list.top) 
        .get()          
        );        
          //console.log("Fetched data by fetchListItems service: "+ JSON.stringify(data));
        return data;
  }

  

  //=========fetching list items with Substring filter options ================
  public getItemsWithFilterSubstringExpand(list?: any, user?: any):Promise<any>{
    let userADId = user; 
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .expand(list.expand)
        .filter("substringof('"+ user.Office +"' ,"+ list.filterBy +')"')
        //.filter("substringof('"+ user.Office +"' ,Author/Office)") 
        .orderBy('Created', false)
        .top(Number(list.top))  
        .get()          
        );        
          //console.log("Fetched data by getItemsWithFilterSubstringExpand service: "+ JSON.stringify(data));
        return data;
  }

  //=========fetching list items without filter options ================
  public getItemsWithoutExpandFilter(list?: any, user?: any):Promise<any>{
    let userADId = user;
        
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        //.expand(list.expand)
        //.filter("substringof('"+ user.Office +"' ,Author/Office)")
        //.filter(list.filterBy+" eq '"+Number(userADId)+"'")
        .orderBy('Created', false)
        .top(list.top) 
        .get()          
        );        
          //console.log("Fetched data by fetchListItems service: "+ JSON.stringify(data));
        return data;
  }

  //=========fetching list items with filter and without expand options ================
  public getFilteredItemsWithoutExpand(list?: any):Promise<any>{
        
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .filter(list.filterBy+" eq '"+list.filterWith+"'")
        .top(list.top) 
        .get()
        .catch((rej)=>{
          console.log(rej.message);
        })          
        );        
          
        return data;
  }


  //======== add an item to the list start=============
  async saveListItem(list): Promise<any>{
    let savedItemInfo = {
      ID: null,
      GUID: null,
    }
    
    await this.getConfigInfo().web.lists.getByTitle(list.name).items.add(list.item).then((result: ItemAddResult) => { 
      // let rID= result.data.Id;
      // let rGUID= result.data.GUID;
      savedItemInfo.ID= result.data.Id;
      savedItemInfo.GUID= result.data.GUID;        
    }, (error: any): void => { 
      console.log('Error while creating the item: ' + error);
    });
  
    return savedItemInfo;
  }
  //-----------add an item to the list ends-----------

  //======== add an item to the list start=============
  async updateListItem(list): Promise<any>{
    let savedItemInfo = {
      ID: null,
      GUID: null,
    }
    
    await this.getConfigInfo().web.lists.getByTitle(list.name).items.getById(list.rId).update(list.item).then((result: ItemAddResult) => { 
      // let rID= result.data.Id;
      // let rGUID= result.data.GUID;
      savedItemInfo.ID= result.data.Id;
      savedItemInfo.GUID= result.data.GUID;        
    }, (error: any): void => { 
      console.log('Error while creating the item: ' + error);
    });
  
    return savedItemInfo;
  }
  //-----------add an item to the list ends-----------

   //=========fetching list items with filter (filter by ADId)options ================
  public getEmployeeInfoByEmail(list?: any, user?: any):Promise<any>{
    let userEmail = user; 
    let data;
      data = 
        from(this.getConfigInfo().web.lists
        .getByTitle(list.name) 
        .items.select(list.select)
        .expand(list.expand)
        //.filter("substringof('"+ user.Office +"' ,Author/Office)")            
        .filter(list.filterBy+" eq '"+userEmail+"'")
        .orderBy('Created', false)
        .top(Number(list.top))  
        .get()
        .catch((rej)=>{
          console.log(rej.message);
        })         
        );        
          //console.log("Fetched data by getItemsWithFilterExpand service: "+ JSON.stringify(data));
        return data;
  } 
  
}
