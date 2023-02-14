// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-hrcornerpage',
//   templateUrl: './hrcornerpage.component.html',
//   styleUrls: ['./hrcornerpage.component.scss']
// })
// export class HrcornerpageComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


//===============================



import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { from } from "rxjs";
import { SharepointworkflowService } from "src/app/shared/services/sharepointworkflow.service";


import { fromEvent } from 'rxjs'
import { map, groupBy, mergeMap, reduce, debounceTime, tap, merge, delay, mapTo, share, repeat, switchMap, takeUntil } from 'rxjs/operators';

import { GroupedObservable } from 'rxjs/internal/operators/groupBy';

import {SPPost} from "./SPOHelper";


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
  selector: 'app-hrcornerpage',
  templateUrl: './hrcornerpage.component.html',
  styleUrls: ['./hrcornerpage.component.scss']
})
export class HrcornerpageComponent implements OnInit {

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
    //==================================
    // Prepare request Url to update Author or Editor field in SharePoint Using REST API as bellow
      var rootUrl="https://portal.bergerbd.com/leaveauto";
      var reqUrl=rootUrl+"/_api/web/Lists/GetbyTitle('VendorComplain')/items(1174)/ValidateUpdateListItem()";

      // Prepare payload to update Author or Editor field in SharePoint Using REST API as bellow

      var payload={"formValues":
      [
          {"FieldName":"PendingWith"
          ,"FieldValue":"[{'Key':'i:0#.f|membership|kamal@bergerbd.com'}]"
          }
          // {"FieldName":"Editor"
          // ,"FieldValue":1118
          // },
          // {"FieldName":"Author"
          // ,"FieldValue":"1118"}
      ]
      };

      SPPost({url:reqUrl,payload:payload}).then(r=>console.log(r));




    //==================================
    //     this.listInfo.name = "Discussions List"; 
    //     this.listInfo.select = 'OrganizationType'+","+'OrganizationName'+","+'Title'+","+'Offers'+","+'Body'+","+'Created'+","+'Modified'+","+'LikesCount'+","+'RatingCount'+","+'IsQuestion'+","+'AverageRating'+","+'ValidTill'+","+'ContactNumber'+","+'ContactEmail'+","+'ContactPerson'+","+'ContactPersonDesignation'+","+'CategoriesLookup/ID'+","+'HomePagePicture';
    //     this.listInfo.expand = 'CategoriesLookup/ID';
    //     this.listInfo.filterBy = '';
    //     this.listInfo.top = '50000';
    
    // let data:Workflow[] = [];
    // from(
    //   this.sharepointworkflowService.getItemsWithoutFilter(this.listInfo)
    //   ).subscribe(
    //     (items) =>{ 
    //       let groups = [];
    //       let validItems = items.filter(item=>(new Date(item.ValidTill) > new Date()));
    //       from(validItems)
    //       .pipe(
    //         groupBy((workflow: Workflow) => workflow.OrganizationType),
    //         mergeMap((workflowsGroup$: GroupedObservable<string, Workflow>) =>
    //           workflowsGroup$.pipe(
    //             reduce((acc: Array<Workflow>, cur: Workflow) => [...acc, cur], []),
    //             map((arr: Array<Workflow>) => {
    //               return {
    //                 key: arr[0].OrganizationType,
    //                 value: [...arr]
    //               };
    //             }),
    //             tap((data: WorkflowGroup) => {groups.push(data); console.log(data); console.log(groups.length)})
    //           )
    //         )
    //       )
    //       .subscribe(
    //       () =>{ 
    //         this.allGroups = groups;
                
    //       },    
    //       (err) => {
    //           console.log(err)
    //       },


    //       );

           
    //     },
    //     (err) => {
    //         console.log(err)
    //     },
    //   );
   
  }
 
  

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

