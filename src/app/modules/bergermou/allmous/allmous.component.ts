//import { Component, OnInit, Input } from '@angular/core';
import { from } from "rxjs";
import { SharepointworkflowService } from "src/app/shared/services/sharepointworkflow.service";

import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs'
import { map, groupBy, mergeMap, reduce, debounceTime, tap, merge, delay, mapTo, share, repeat, switchMap, takeUntil } from 'rxjs/operators';

import { GroupedObservable } from 'rxjs/internal/operators/groupBy';


interface Workflow {
  ID?: number;
  Title?: string; 
  OrganizationType?: string; 
  OrganizationName?:string; 
  Offers?:string;
  Body?: string;
  RequestedByEmail?: string;
  RequestLink?: string; 
  Modified?: any;
  Created?: any;
  LikesCount?: any;
  RatingCount?: any;
  IsQuestion?: any;
  AverageRating?: any;
  ValidTill?: any;
  ContactNumber?: any;
  ContactEmail?: any;
  ContactPerson?: any;
  ContactPersonDesignation?: any;
  CategoriesLookup?: any;
}
interface WorkflowGroup{
  key: string;
  value: Array<Workflow>;
}

@Component({
  selector: 'app-allmous',
  templateUrl: './allmous.component.html',
  styleUrls: ['./allmous.component.scss']
})
export class AllmousComponent implements OnInit {

  public webAbsoluteUrl = window.location.origin;
  //public webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto"; //uncomment for localhost //PendingApproval
  //public webAbsoluteUrl = "https://portal.bergerbd.com";

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
    filterBy: "",
    top: null    
  };

  data5 = [];

  interval;

  generalMous = [];
  hotelMous = [];
  restaurantsMous = [];
  resortMous = [];
  healthMous = [];
  financialMous = [];
  electronicsMous = [];
  
  public allGroups: Array<WorkflowGroup>;

  constructor(public sharepointworkflowService: SharepointworkflowService) { }

  // ngOnInit(): void {
  // }

  ngOnInit() {
        this.listInfo.name = "Discussions List"; 
        this.listInfo.select = 'OrganizationType'+","+'OrganizationName'+","+'Title'+","+'Offers'+","+'Body'+","+'Created'+","+'Modified'+","+'LikesCount'+","+'RatingCount'+","+'IsQuestion'+","+'AverageRating'+","+'ValidTill'+","+'ContactNumber'+","+'ContactEmail'+","+'ContactPerson'+","+'ContactPersonDesignation'+","+'CategoriesLookup/ID'+","+'HomePagePicture';
        this.listInfo.expand = 'CategoriesLookup/ID';
        this.listInfo.filterBy = '';
        this.listInfo.top = '50000';
    
    let data:Workflow[] = [];
    from(
      this.sharepointworkflowService.getItemsWithoutFilter(this.listInfo)
      ).subscribe(
        (items) =>{ 
          let groups = [];
          let validItems = items.filter(item=>(new Date(item.ValidTill) > new Date()));
          from(validItems)
          .pipe(
            groupBy((workflow: Workflow) => workflow.OrganizationType),
            mergeMap((workflowsGroup$: GroupedObservable<string, Workflow>) =>
              workflowsGroup$.pipe(
                reduce((acc: Array<Workflow>, cur: Workflow) => [...acc, cur], []),
                map((arr: Array<Workflow>) => {
                  return {
                    key: arr[0].OrganizationType,
                    value: [...arr]
                  };
                }),
                tap((data: WorkflowGroup) => {groups.push(data); console.log(data); console.log(groups.length)})
              )
            )
          )
          .subscribe(
          () =>{ 
            this.allGroups = groups;
            // if(groups.length >0){
            //     let i = 0;
            //     for(let j=0; j<groups.length; j++){
            //       for(let i=0; i<groups[j].value.length; i++){
            //         this.data5.push(
            //           {
            //             OrganizationType: groups[j].value[i].OrganizationType || "",
            //             Category: this.getCategoryText(groups[j].value[i].CategoriesLookup.ID),
            //             OrganizationName: groups[j].value[i].OrganizationName || "",
            //             Offers: groups[j].value[i].Offers || "",
            //             ValidTill: groups[j].value[i].ValidTill || new Date(),
            //             ContactPerson: groups[j].value[i].ContactPerson || "",
            //             // ContactPersonDesignation: this.allGroups[0].value[i].ContactPersonDesignation || "",
            //             // ContactNumber: this.allGroups[0].value[i].ContactNumber || "",
            //             // ContactEmail: this.allGroups[0].value[i].ContactEmail || "",
            //             // Body: this.allGroups[0].value[i].Body || "" ,                      
            //             // Created: this.allGroups[0].value[i].Created || new Date(),
            //             // Modified: this.allGroups[0].value[i].Modified || new Date(),
            //             // LikesCount: this.allGroups[0].value[i].LikesCount || 0,
            //             // RatingCount: this.allGroups[0].value[i].RatingCount || 0,
            //             // IsQuestion: this.allGroups[0].value[i].IsQuestion || false,
            //             // AverageRating: this.allGroups[0].value[i].AverageRating || 0,
            //             // Title: this.allGroups[0].value[i].Title || "",                      
            //             // HomePagePicture: this.getImageUrl(this.allGroups[0].value[i].CategoriesLookup.ID) || "",
                        
                                           
            //           }
            //         )
            //         i++;
            //       }
                  
            //       j++;
            //     }
               

            //     // this.interval = setInterval(() => {
            //     //   this.data5.push(
            //     //     {
            //     //       OrganizationType: this.allGroups[0].value[i].OrganizationType || "",
            //     //       Category: this.getCategoryText(this.allGroups[0].value[i].CategoriesLookup.ID),
            //     //       OrganizationName: this.allGroups[0].value[i].OrganizationName || "",
            //     //       Offers: this.allGroups[0].value[i].Offers || "",
            //     //       ValidTill: this.allGroups[0].value[i].ValidTill || new Date(),
            //     //       ContactPerson: this.allGroups[0].value[i].ContactPerson || "",
            //     //       ContactPersonDesignation: this.allGroups[0].value[i].ContactPersonDesignation || "",
            //     //       ContactNumber: this.allGroups[0].value[i].ContactNumber || "",
            //     //       ContactEmail: this.allGroups[0].value[i].ContactEmail || "",
            //     //       Body: this.allGroups[0].value[i].Body || "" ,                      
            //     //       Created: this.allGroups[0].value[i].Created || new Date(),
            //     //       Modified: this.allGroups[0].value[i].Modified || new Date(),
            //     //       LikesCount: this.allGroups[0].value[i].LikesCount || 0,
            //     //       RatingCount: this.allGroups[0].value[i].RatingCount || 0,
            //     //       IsQuestion: this.allGroups[0].value[i].IsQuestion || false,
            //     //       AverageRating: this.allGroups[0].value[i].AverageRating || 0,
            //     //       Title: this.allGroups[0].value[i].Title || "",                      
            //     //       HomePagePicture: this.getImageUrl(this.allGroups[0].value[i].CategoriesLookup.ID) || "",
                      
                                         
            //     //     }
            //     //   )
            //      //  i++;
            //     //   if(i == 2){
            //     //     clearInterval(this.interval);
            //     //   }
            //     // }, 50);
            // } else{
            //   alert("No MOU is found in the SP List.");
            //   return false;
            // }           
                
                
          },    
          (err) => {
              console.log(err)
          },


          );

           
        },
        (err) => {
            console.log(err)
        },
      );
   
  }
 
  // ngOnInit(){
    
       
  
    

  //   this.listInfo.name = "Discussions List"; 
  //   this.listInfo.select = 'OrganizationType'+","+'OrganizationName'+","+'Title'+","+'Offers'+","+'Body'+","+'Created'+","+'Modified'+","+'LikesCount'+","+'RatingCount'+","+'IsQuestion'+","+'AverageRating'+","+'ValidTill'+","+'ContactNumber'+","+'ContactEmail'+","+'ContactPerson'+","+'ContactPersonDesignation'+","+'CategoriesLookup/ID';
  //   //+","+'MyEditor/ID'+","+'LastReplyBy/ID';
  //   //","+'MyEditor'+","+'LastReplyBy'+","+'MyAuthor'
  //   //+","+'OrganizationName'+","+'IsQuestion'+","+'AverageRating'+","+'MyEditor'+","+'ParentItemEditor'+","+'LastReplyBy'+","+'MyAuthor';
  //   this.listInfo.expand = 'CategoriesLookup/ID';
  //   //+","+'OrganizationType'+","+'LastReplyBy/ID'+","+'MyAuthor/ID';
  //   this.listInfo.filterBy = '';
  //   this.listInfo.top = '50000';


  //   this.sharepointworkflowService.getSPLoggedInUserEmail().then((res)=> {
  //     from(
  //       this.sharepointworkflowService.getItemsWithoutFilter(this.listInfo, res)
  //       //this.sharepointworkflowService.getItemsWithoutExpandFilter(this.listInfo, res)
  //       ).subscribe(
  //         (res) =>{ 
  //           if(res.length >0){
  //               let i = 0;

  //               this.interval = setInterval(() => {
  //                 this.data5.push(
  //                   {
  //                     OrganizationType: res[i].OrganizationType || "",
  //                     Category: this.getCategoryText(res[i].CategoriesLookup.ID),
  //                     OrganizationName: res[i].OrganizationName || "",
  //                     Offers: res[i].Offers || "",
  //                     ValidTill: res[i].ValidTill || new Date(),
  //                     ContactPerson: res[i].ContactPerson || "",
  //                     ContactPersonDesignation: res[i].ContactPersonDesignation || "",
  //                     ContactNumber: res[i].ContactNumber || "",
  //                     ContactEmail: res[i].ContactEmail || "",
  //                     Body: res[i].Body || "" ,                      
  //                     Created: res[i].Created || new Date(),
  //                     Modified: res[i].Modified || new Date(),
  //                     LikesCount: res[i].LikesCount || 0,
  //                     RatingCount: res[i].RatingCount || 0,
  //                     IsQuestion: res[i].IsQuestion || false,
  //                     AverageRating: res[i].AverageRating || 0,
  //                     Title: res[i].Title || "",                      
  //                     HomePagePicture: this.getImageUrl(res[i].CategoriesLookup.ID) || "",
                      
  //                     //MyEditor: element.MyEditor.ID,
  //                     //ParentItemEditor: element.ParentItemEditor.ID,
  //                     //LastReplyBy: element.LastReplyBy.ID,
  //                     //MyAuthor: element.MyAuthor.ID,                      
  //                   }
  //                 )
  //                 i++;
  //                 if(i == res.length){
  //                   clearInterval(this.interval);
  //                 }
  //               }, 50);

          

  //               // let data3 = {
  //               //   TestParameters: [
  //               //     {
  //               //       Samples: this.data5
  //               //     }
  //               //   ]
  //               // };

  //               // this.data2 = data3;
  //           } else{
  //             alert("No MOU is found in the SP List.");
  //             return false;
  //           }           
                
                
  //         },    
  //         (err) => {
  //             console.log(err)
  //         },
  //       );      
  //   });
  // }

  getCategoryText(catVal){    
    switch(catVal) {	
      case 1: {
        return "General";
      }
      case 2: {
        return "Hotel";
      }
      case 3: {
        return "Restaurants";
      }
      case 4: {
        return "Resort";
      }
      case 5: {
        return "Health care services";
      }
      case 6: {
        return "Financial Institution";
      }
      case 7: {
        return "Electronics";
      }
      
    }
  }

  getImageUrl(catVal){    
    switch(catVal) {	
      case 1: {
        return this.webAbsoluteUrl + "/mou/PublishingImages/MOUImages/mou3.jfif";
      }
      case 2: {
        return this.webAbsoluteUrl + "/mou/PublishingImages/MOUImages/hotel.jfif";
      }
      case 3: {
        return this.webAbsoluteUrl + "/mou/PublishingImages/MOUImages/hotel.jfif";
        //return "Restaurants";
      }
      case 4: {
        return this.webAbsoluteUrl + "/mou/PublishingImages/MOUImages/hotel.jfif";
        //return "Resort";
      }
      case 5: {
        return this.webAbsoluteUrl + "/mou/PublishingImages/MOUImages/healthCare.jfif";
        //return "Health care services";
      }
      case 6: {
        return this.webAbsoluteUrl + "/mou/PublishingImages/MOUImages/financial.jfif";
        //return "Financial Institution";
      }
      case 7: {
        return this.webAbsoluteUrl + "/mou/PublishingImages/MOUImages/electronics.jfif";
        //return "Electronics";
      }
      
    }
  }


  filterFunction(cat): any[] {  
      return this.data5.filter(i => i.Category === cat && new Date(i.ValidTill) > new Date());
  }



}
