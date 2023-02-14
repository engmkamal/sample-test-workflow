import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllmousComponent } from './modules/bergermou/allmous/allmous.component';
import { HrcornerpageComponent } from './modules/hrcorner/hrcornerpage/hrcornerpage.component';
//import { ShopsigndashboardComponent } from './modules/trademerchandising/shopsigndashboard/shopsigndashboard.component';
// import { DefaultComponent } from './layouts/default/default.component';
// import { DashboardComponent } from './modules/dashboard/dashboard.component';
// import { PostsComponent } from './modules/posts/posts.component';
// import { WorkshopProposalComponent } from './modules/WorkshopProposal/workshop-proposal/workshop-proposal.component';
// import { GraphicalViewComponent } from './modules/WorkshopProposal/graphical-view/graphical-view.component';
// import { TrademerchandisingComponent } from './trademerchandising/trademerchandising.component';
// import { AppComponent } from './app.component';
 //import { TmadvancedashboardComponent } from './modules/trademerchandising/tmadvancedashboard/tmadvancedashboard.component';
// import { CmdashboardComponent } from './modules/changemanagement/cmdashboard/cmdashboard.component';
// import { MasterdetailsComponent } from './masterdetails/masterdetails.component';
// import { ItsapplicationinfoComponent } from './modules/itservicerequestwf/itsapplicationinfo/itsapplicationinfo.component';
// import { MyspworkflowsComponent } from './modules/mywfrequests/myspworkflows/myspworkflows.component';
// import { MyprocessComponent } from './myprocess/myprocess.component';
 import { ReimbursementmstrComponent } from './modules/allworkflows/reimbursementmstr/reimbursementmstr.component';
//import { EmpreimbursementreportComponent } from './modules/empreimbursementdashboard/empreimbursementreport/empreimbursementreport.component';
import { ReimbursementdashboardComponent } from './modules/empreimbursementdashboard/reimbursementdashboard/reimbursementdashboard.component';
// import { ItassetmanagementmstrComponent } from './modules/allworkflows/itassetmanagementmstr/itassetmanagementmstr.component';
// import { SampletestreqComponent } from './modules/rndsampletest/sampletestreq/sampletestreq.component';
// import { MyitassetsComponent } from './modules/myportal/myitassets/myitassets.component';
 import { RndlabtestparentComponent } from './modules/rndsampletest/rndlabtestparent/rndlabtestparent.component';
import { CustomerfeedbackstComponent } from './modules/rndsampletest/customerfeedbackst/customerfeedbackst.component';
// import { SampletestreportComponent } from './modules/rndsampletest/sampletestreport/sampletestreport.component';
// import { ItservicerequestdashboardComponent } from './modules/itservicedashboard/itservicerequestdashboard/itservicerequestdashboard.component';
// import { SampletestdashboardComponent } from './modules/rndsampletestdashboard/sampletestdashboard/sampletestdashboard.component';
//import { WorkshopproposaldashboardComponent } from './modules/workshopproposaldashboard/workshopproposaldashboard/workshopproposaldashboard.component';
//import { WorkshopproposalreportComponent } from './modules/workshopproposaldashboard/workshopproposalreport/workshopproposalreport.component';


const routes: Routes =[
   {
     path: 'feedback',
     component: CustomerfeedbackstComponent
  //   path: 'report',
  //   component: EmpreimbursementreportComponent
  //   //component: WorkshopproposalreportComponent 
           
    },
  {
    path: '', 
    //component:  HrcornerpageComponent
    //component: AllmousComponent
    //component: ReimbursementdashboardComponent
    //component: WorkshopproposalreportComponent,
    //component: WorkshopproposaldashboardComponent
    //component: SampletestdashboardComponent 
    //component: ItservicerequestdashboardComponent //==for IT Service
    component: RndlabtestparentComponent, //====final starting 100% 100% 100% 100% final
    
    //component: SampletestreportComponent,
    //component: MyitassetsComponent, //=== final for MyITAssets card view 100% working ----
    //component: SampletestreqComponent, //=========final final 100% working for dynamic Create application page-1
    
    //component: RequestorComponent,
    //component:TestresultComponent,
    //component: LabComponent,
    //component: ReportComponent,
    //component: TestComponent, //for Laoratory Part, the 2-3rd step
    //component: RndlabreqComponent, //For New Application, section-1
    //component: ItsapplicationinfoComponent,
    //component: ReimbursementmstrComponent,  //ItsapplicationinfoComponent
    //component: ItassetmanagementmstrComponent,   
  },   
  {
    path: 'index.aspx',
    component: AllmousComponent
    //component: WorkshopproposaldashboardComponent
    //component: SampletestdashboardComponent
    //component: ItservicerequestdashboardComponent //==for IT Service
    //component: RndlabtestparentComponent,
    //component: ReimbursementmstrComponent,
    //component: ItassetmanagementmstrComponent,    
  }, {
    path: 'home',
    component: AllmousComponent
    //component: WorkshopproposaldashboardComponent
    //component: SampletestdashboardComponent
    //component: ItservicerequestdashboardComponent //==for IT Service
    //component: RndlabtestparentComponent,
    //component: ReimbursementmstrComponent,
    //component: ItassetmanagementmstrComponent,    
  },
  
  //  {
  //   path: 'others',
  //   component: DefaultComponent,
  //   children: [{
  //       path: '',
  //       component: ReimbursementmstrComponent
  //     }, {
  //       path: 'tmdbtable',
  //       component: TrademerchandisingComponent
  //     }, {
  //       path: 'wpdbtable',
  //       component: WorkshopProposalComponent
  //     },{
  //       path: 'graph',
  //       component: DashboardComponent
  //     },{
  //       path: 'posts',
  //       component: PostsComponent
  //     }, {
  //       path: 'home2',
  //       component: DashboardComponent
  //     }, {
  //       path: 'advancedb',
  //       component: TmadvancedashboardComponent
  //     }, {
  //       path: 'changemanagement',
  //       component: CmdashboardComponent
  //     }, {
  //       path: 'itsr',
  //       component: ItsapplicationinfoComponent
  //     }, {
  //       path: 'dashboards',
  //       component: MyspworkflowsComponent
  //     } 
  //   ]
  // }
]




// const routes: Routes = [
  
//   //{path:"**", redirectTo: "workshopproposal"},
//   // {
    
//   //   path: '',
//   //   component: WorkshopProposalComponent
//   // },
//   {
//     path: 'workshopproposal',
//     component: WorkshopProposalComponent,    
//   },{
//     path: 'graphicalview',
//     component: GraphicalViewComponent,
//     children: [{
//       path: '',
//       component: DefaultComponent,
//       children: [{
//         path: '',
//         component: DashboardComponent
//       }, {
//         path: 'posts',
//         component: PostsComponent
//       }, {
//         path: 'home',
//         component: DashboardComponent
//       }, {
//         path: 'index.aspx',
//         component: DashboardComponent
//       }
//       ]
//     }]
//   },
  
  
//   ];



@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
