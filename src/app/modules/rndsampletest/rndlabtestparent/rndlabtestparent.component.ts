import { Component, OnInit, HostListener } from '@angular/core';
import { SharepointworkflowService } from 'src/app/shared/services/sharepointworkflow.service';
import { from } from "rxjs";
import { testParametersMatrix, reportReleaseGroup } from '../data';
import { AlertService } from 'src/app/shared/alert/alert.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-rndlabtestparent',
  templateUrl: './rndlabtestparent.component.html',
  styleUrls: [
    './rndlabtestparent.component.scss',
    '../../../../assets/css/indigo-pink.css',
    '../../../../assets/css/ng-select.component.scss',
    '../../../../assets/css/material.theme.scss',
  ]
})
export class RndlabtestparentComponent implements OnInit {

  currentAbsoluteUrl = window.location.href;
  Status = "";
  uId = "";
  readMode = "";
  logedUserAdId = null;
  _testParamNode = null;
  requestInfo: any = {};
  parsedTestParameters;
  testParameters = testParametersMatrix;
  reportReleaseGrp = reportReleaseGroup;
  childBtnClickAction = "";
  createReqInfoFrmChild;
  approvalLink;
  reviewLink;
  pendingApprovalListInfo;
  updatedMstrLstInfo;
  labResponsibles = [];
  labResponsiblesOpms = [];
  emitedDataFrmChild;
  auditLogComments = "";

  public listInfo = {
    name: "",
    select: "",
    expand: "",
    filterBy: "",
    filterWith: "",
    top: null
  };

  parsedRequestInfo = {
    uId: null,
    readMode: null,
    ID: null,
    Title: null,
    Status: null,
    RnDLabTest: null,
    PendingWith: null,
    RequestorAdId: null
  };
  
  webAbsoluteUrl = window.location.origin + "/leaveauto";
  //webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto";

  //==for alert==
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  //=========for customer feedback ===========
  rating:number = 3;
  starCount:number = 5;
  starColor = 'accent';
  // starColorP:StarRatingColor = StarRatingColor.primary;
  // starColorW:StarRatingColor = StarRatingColor.warn;

  // public feedback = {
  //   infoAvailabilityR : 3,
  //   serviceResponseR : 3,
  //   repClarificationR : 3,
  //   servReliabilityR : 3,
  //   presentationModeR : 3
  // }

  constructor(public sharepointworkflowService: SharepointworkflowService, public alertService: AlertService) {
    //=====Reading unique id from url -- start ==========
    if (this.currentAbsoluteUrl.indexOf('=') > -1) {
      let varCurrentUrlSplitArray = this.currentAbsoluteUrl.split('?');
      if (varCurrentUrlSplitArray.length >= 2) {
        let queryString = varCurrentUrlSplitArray[1];
        let parameters = queryString.split('&');
        for (let i = 0; i < parameters.length; i++) {
          let param = parameters[i];
          if (param.toLowerCase().indexOf('uniqueid=') > -1)
            this.uId = param.split('=')[1];
          else if (param.toLowerCase().indexOf('mode=') > -1)
            this.readMode = param.split('=')[1];
        }
      }
    }
    //------Reading unique id from url -- End-----
  }

  ngOnInit(): void {

    if (this.uId != "") {
      this.listInfo.name = "RnDLabTestMaster";
      this.listInfo.select = 'Status' + "," + 'RequestorEmpId' + "," + 'RnDLabTest' + "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title';
      this.listInfo.expand = 'Author' + "," + 'PendingWith';
      this.listInfo.filterBy = 'GUID';
      this.listInfo.filterWith = this.uId;
      this.listInfo.top = '100000';

      this.sharepointworkflowService.getSPLoggedInUser().then((res) => {
        this.logedUserAdId = res;
        from(
          this.sharepointworkflowService.getItemWithAnyFilterExpand(this.listInfo, res)
        ).subscribe(
          (res) => {
            let userRnDSections = [];

            // let r : any = testData.RnDLabTest;

            // this.parsedRequestInfo = {
            //   uId: testData.uId,
            //   readMode: testData.readMode,
            //   ID: testData.ID,
            //   Title: testData.Title,
            //   Status: testData.Status,
            //   RnDLabTest: JSON.parse(r),
            //   PendingWith: testData.PendingWith
            // };

            this.parsedRequestInfo = { 
              uId: this.uId,
              readMode: this.readMode,
              ID: res[0].ID,
              Title: res[0].Title,
              Status: res[0].Status,
              RnDLabTest: JSON.parse(res[0].RnDLabTest),
              PendingWith: res[0].PendingWith,
              RequestorAdId: res[0].Author.ID,
            }
            
            if (this.readMode == "request" || this.readMode == "read" || this.readMode == "print" || this.readMode == "feedback") {
              this.requestInfo = this.parsedRequestInfo;
            } else {
              //=== checking whether loged user is PendingWith person or not

              if ((this.parsedRequestInfo.PendingWith.results).some(user => user.ID == this.logedUserAdId)) {

                if (res[0].Status == 'Submitted' || res[0].Status == 'PickedUp' || this.Status == 'PickedUp') {
                  for (let t = 0; t < this.testParameters.length; t++) {
                    for (let r = 0; r < this.testParameters[t].Respectives.length; r++) {
                      if (this.testParameters[t].Respectives[r].RAdId == this.logedUserAdId) {
                        this._testParamNode = t;
                        userRnDSections.push(
                          { RnDSection: this.testParameters[t].RnDSection }
                        )
                      }
                    }
                  }

                  this.parsedTestParameters = JSON.parse(res[0].RnDLabTest);

                  let labPersonnelData = this.parsedTestParameters.TestParameters.filter(x => userRnDSections.map(y => y.RnDSection).includes(x.Title.RnDSection));

                  let logedLabPersonnelData = labPersonnelData.filter(x => (x.Title.Respectives.some(y=>y.RAdId == this.logedUserAdId)));

                  this.requestInfo = {
                    uId: this.uId,
                    readMode: this.readMode,
                    Status: res[0].Status,
                    RnDLabTest: logedLabPersonnelData
                  };
                  this.Status = res[0].Status;
                  //this.Status = 'PartiallyReported';
                }

                else if (this.parsedRequestInfo.Status == 'PartiallyReported') {
                  //== filtering only the TestParameterStatus=="Submitted"
                  for (let t = 0; t < this.parsedRequestInfo.RnDLabTest.TestParameters.length; t++) {
                    if (this.parsedRequestInfo.RnDLabTest.TestParameters[t].TestParameterStatus == "Submitted") {
                      this._testParamNode = t; // get array index of this TestParameter
                      //=== maping the loged user's RnDLabTest 
                      for (let t = 0; t < this.testParameters.length; t++) {
                        for (let r = 0; r < this.testParameters[t].Respectives.length; r++) {
                          if (this.testParameters[t].Respectives[r].RAdId == this.logedUserAdId) {

                            userRnDSections.push(
                              { RnDSection: this.testParameters[t].RnDSection }
                            )
                          }
                        }
                      }
                    }

                    this.parsedTestParameters = JSON.parse(res[0].RnDLabTest);
                    let labPersonnelData = this.parsedTestParameters.TestParameters.filter(x => userRnDSections.map(y => y.RnDSection).includes(x.Title.RnDSection))

                    this.requestInfo = {
                      uId: this.uId,
                      readMode: this.readMode,
                      Status: res[0].Status,
                      RnDLabTest: labPersonnelData
                    };
                    this.Status = res[0].Status;
                  }
                }
                else if (this.parsedRequestInfo.Status == 'Reported' || this.Status == 'Completed') {

                  this.requestInfo = this.parsedRequestInfo;


                  this.Status = this.parsedRequestInfo.Status;
                  //console.log('PartiallySubmitted');
                }
              } else {
                alert("Unaothorized access: this application is neither applied by you nor pending with you!!");
                setTimeout(function () {                  
                  window.location.href = "https://portal.bergerbd.com/leaveauto/SitePages/MyWFRequest.aspx";
                  //window.location.href = this.webAbsoluteUrl + "/SitePages/MyWFRequest.aspx";
                }, 4000);
              }

            }

          },
          (err) => {
            console.log(err)
          },
        );
      });
    } else {
      this.sharepointworkflowService.getSPLoggedInUser().then((res) => {
        this.logedUserAdId = res;
        this.requestInfo = {
          uId: "",
          readMode: "",
          Status: "",
          logedUserAdId: this.logedUserAdId
        };
      });
    }
  }

  ngAfterViewInit() { 
    //this.alertService.error('Error :(', this.options)
  }


  // //================= working with screen size starts ==============
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth < 768) {
  //     //implement logic
  //   } else {
  //     //implement logic
  //   }
  // }

  // isBiggerScreen() {
  //   const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  //   if (width < 768) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // //------------ working with screen size ends --------------------------

  GetOutputVal(valFrmChild: any) {
    if (this.uId == "") {
      this.createReqInfoFrmChild = valFrmChild;
    }
    else {
      this.emitedDataFrmChild = valFrmChild;
    }

  }

  createNotification(templet?, to?, requestor?, pending?, title?, status?) {
    if (this.uId != "") {
      this.reviewLink = 'https://portal.bergerbd.com/leaveauto/SitePages/SampleTest.aspx?UniqueId=' + this.uId + "&mode=read";
      this.approvalLink = 'https://portal.bergerbd.com/leaveauto/SitePages/SampleTest.aspx?UniqueId=' + this.uId;
      //this.reviewLink = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx?UniqueId=' + this.uId + "&mode=read";
      //this.approvalLink = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx?UniqueId=' + this.uId;
    }

    let emailFldData;

    switch (templet) {
      case "Notification": {
        emailFldData = {
          Status: "Submitted",
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.reviewLink,
          ApprovalLink: "",
          Title: "Request for 'Sample Test' workflow with ref# " + title + " has been initiated",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Mr./Ms. ${requestor},</b><br/>
                Request for &quot;Sample Test&quot; workflow has been initiated. Any review or update will be available in the requestor&#39;s My Process of Berger Portal.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
                Pending with: Lab respectives,
              </p>              
            </div>
          `,
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: testinglab@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
        }
        break;
      }
      case "Approval": {
        emailFldData = {
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "Submitted",
          Title: "Request for 'Sample Test' workflow with ref# " + title + " is waiting for lab testing.",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: testinglab@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Sample Test&quot; workflow is waiting for your approval. Please process to continue either from Pending Approval of Berger Portal or from the process link below.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
              </p>              
            </div>
          `,
        }
        break;
      }
      case "PickedUp": {
        emailFldData = {
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: "",
          ApprovalLink: "",
          Status: "Submitted",
          Title: "Acknowledgement of Sample received for 'Sample Test' workflow with ref# " + title + ".",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: testinglab@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Sample has been received for &quot;Sample Test&quot; workflow and is being picked up by respective lab personnel for testing.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Sample Received",<br/>
              </p>              
            </div>
          `,
        }
        break;
      }
      case "Completed": {
        emailFldData = {
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Title: "Request for 'Sample Test' workflow with ref# " + title + " has been processed",
          ToId: {
            results: [to]
          },
          CCId: {
            results: []
          },          
          ReviewLink: this.reviewLink,
          ApprovalLink: this.reviewLink,
          Status: "Completed",
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: testinglab@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Sample Test&quot; workflow has been processed. It can be viewed either from My Process of Berger Portal or from the review link below.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Report Released",
                For test report: <a href="${this.reviewLink}"><b>click here</b></a>                            
              </p>
              <p>For Customer Feedback: <a href="https://portal.bergerbd.com/leaveauto/SitePages/SampleTest.aspx/?UniqueId=${this.uId}&mode=feedback"><b>click here</b></a></p>                            
              
              
            </div>
          `,
        }
        break;
      }    
      case "FeedbackSubmitted": {
        emailFldData = {
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Title: "Customer Feedback for 'Sample Test' workflow with ref# " + title + " has been submitted.",
          ToId: {
            results: [to]
          },
          CCId: {
            results: []
          },          
          ReviewLink: "",
          ApprovalLink: "",
          //ReviewLink: this.reviewLink,
          //ApprovalLink: this.approvalLink,
          Status: "FeedbackSubmitted",
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: testinglab@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Customer feedback of &quot;Sample Test&quot; WF has been submitted. It can be viewed from admin dashboard Feedback link.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Feedback Submitted",<br/>
              </p>
              <p>For Viewing Customer Feedback: <a href="https://portal.bergerbd.com/leaveauto/SitePages/SampleTest.aspx/?UniqueId=${this.uId}&mode=feedback"><b>click here</b></a></p>              
            </div>
          `,
        }
        break;
      }
      case "OpmNotification": {
        emailFldData = {
          Status: "Submitted",
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.reviewLink,
          ApprovalLink: "",
          Title: "Request for 'Sample Test' workflow with ref# " + title + " has been initiated",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Sample Test&quot; workflow has been initiated to your team. Lab respectives can find it in their Pending Approval option of SharePoint Portal or from provided link in their email and can Pick up to process this task.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
                Pending with: Lab respectives,
              </p>              
            </div>
          `,
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: testinglab@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
        }
        break;
      }
      case "Release": {
        emailFldData = {
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "Submitted",
          Title: "Request for 'Sample Test' workflow with ref# " + title + " is waiting for releasing the test report",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: testinglab@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Sample Test&quot; workflow is waiting for releasing the test report. Please process to continue either from Pending Approval of Berger Portal or from the process link below.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
              </p>              
            </div>
          `,
        }
        break;
      }
      case "ReportHardCopySubmit": {
        emailFldData = {
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.approvalLink,
          ApprovalLink: this.approvalLink,
          Status: "Waiting for signed lab work or data sheet",
          Title: "Request for 'Sample Test' workflow with ref# " + title + " is waiting for signed lab work or data sheet",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: testinglab@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Sample Test&quot; workflow is waiting for signed lab work or data sheet. Please submit the signed lab work or data sheet within 3 Working days at accreditation office.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: Waiting for signed lab work or data sheet,<br/>
              </p>              
            </div>
          `,
        }
        break;
      }
      default: {
        alert("Action is undefined for this type of click event !!");
        break;
      }
    }

    let notificationlListInfo = {
      name: "NotificationList",
      item: emailFldData
    };

    this.sharepointworkflowService.saveListItem(notificationlListInfo)
      .then(
        (res) => {
          console.log('res');
        })
  }

  async saveInNotificationList(title?: string, comments?: string) {
    if (this.uId == "") {
      let req = this.pendingApprovalListInfo.item;
      //==========sending notification ===
      this.createNotification("Notification", this.logedUserAdId, req.RequestedByName, "", req.Title, req.Status);

      this.labResponsibles.forEach(apvr => {
        this.createNotification("Approval", apvr, req.RequestedByName, "", req.Title, req.Status);
      });

      this.listInfo.name = "BergerEmployeeInformation";
      this.listInfo.select = 'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
      this.listInfo.expand = 'Email'+","+'OptManagerEmail';
      this.listInfo.filterBy = 'Email/ID';
      this.listInfo.top = '100000';

      await this.labResponsibles.forEach(apvr => {
        from(
          this.sharepointworkflowService.getItemsWithFilterExpand(this.listInfo, apvr)
          ).subscribe(
            (res) =>{ 
                  
                  // let requestorsInfoData ={
                  //   EmployeeName: res[0].EmployeeName,
                  //   Company: res[0].Company,
                  //   EmployeeId: res[0].EmployeeId,
                  //   OfficeLocation: res[0].OfficeLocation,
                  //   Designation: res[0].Designation,
                  //   Department: res[0].Department,
                  //   Email: res[0].Email.EMail,
                  //   CostCenter: res[0].CostCenter,
                  //   Mobile: res[0].Mobile,
                  //   OpmEmail: res[0].OptManagerEmail,
                  //   OpmADId: res[0].OptManagerEmail.ID,
                  //   OpmName: res[0].OptManagerEmail.Title,
                  //   RequestDate: new Date().toString().substring(4, 15)
                  // };

                  if(this.labResponsiblesOpms.length == 0){
                    this.labResponsiblesOpms.push({adid:res[0].OptManagerEmail.ID , name:res[0].OptManagerEmail.Title});
                    if(res[0].OptManagerEmail.ID != undefined || res[0].OptManagerEmail.ID != ""){
                      this.createNotification("OpmNotification", res[0].OptManagerEmail.ID, res[0].OptManagerEmail.Title, "", req.Title, req.Status);
                    }
                  }else{
                    if(this.labResponsiblesOpms.some(obj => obj.adid === res[0].OptManagerEmail.ID)){
                      //found duplicate and do nothing 
                    }else{
                      this.labResponsiblesOpms.push({adid:res[0].OptManagerEmail.ID , name:res[0].OptManagerEmail.Title});
                      if(res[0].OptManagerEmail.ID != undefined || res[0].OptManagerEmail.ID != ""){
                        this.createNotification("OpmNotification", res[0].OptManagerEmail.ID, res[0].OptManagerEmail.Title, "", req.Title, req.Status);
                      }
                    }
                  }


                 
                  
  
                  
            },    
            (err) => {
                console.log(err)
            },
          ); 
        
      });

      

      //this.createNotification("Notification", this.logedUserAdId, "Mostafa Kamal", "Mostafa Kamal", "Mostafa Kamal", "Mostafa Kamal");
      
      setTimeout(function () {
        let rpage = 'https://portal.bergerbd.com/leaveauto/SitePages/MyWFRequest.aspx';
        //let rpage = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
        console.log('Redirect page url');
        console.log(rpage);
        window.location.href = "https://portal.bergerbd.com/PortalResources/Home.aspx";
        //window.location.href = this.webAbsoluteUrl + "/SitePages/MyWFRequest.aspx";
      }, 4000);
    } else {
      let req = this.pendingApprovalListInfo.item;
      switch (this.childBtnClickAction) {
        case "PickedUp": {
          this.createNotification("PickedUp", this.parsedRequestInfo.RequestorAdId, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "Lab personnel", this.parsedRequestInfo.Title, "PickedUp");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/leaveauto/SitePages/pendingtasks.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        case "ResultSubmit": {
          this.reportReleaseGrp.forEach(rRGrp => {
            this.createNotification("Release", rRGrp.AdId, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "Report Release Group", this.parsedRequestInfo.Title, "Result Submitted");
          });

          this.createNotification("ReportHardCopySubmit", this.logedUserAdId, "", "Lab personnel", this.parsedRequestInfo.Title, "Waiting for signed lab work or data sheet");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/leaveauto/SitePages/pendingtasks.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        case "Completed": {
          this.createNotification("Completed", this.parsedRequestInfo.RnDLabTest.Requestor.AdId, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "", this.parsedRequestInfo.Title, "Completed");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/leaveauto/SitePages/pendingtasks.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        case "FeedbackSubmit": {
          this.createNotification("FeedbackSubmitted", 255, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "", this.parsedRequestInfo.Title, "FeedbackSubmitted");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/leaveauto/SitePages/pendingtasks.aspx';
            //window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
      }
    }
  }


  async createAuditLog(title: string, comments?: string) {
    let comment = (comments == undefined) ? "" : comments;
    let auditLogData = {
      Title: title,
      ActionDate: new Date().toLocaleString(),
      ActionById: this.logedUserAdId,
      Comments: comment
    }
    let auditLogListInfo = {
      name: "SampleTestAuditLog",
      item: auditLogData
    }
    await this.sharepointworkflowService.saveListItem(auditLogListInfo).then(
      (res) => {})
  }

  async createReqTitle(updatedMstrLstInfo) {
    await this.sharepointworkflowService.updateListItem(updatedMstrLstInfo).then(
      (res) => {
        this.sharepointworkflowService.saveListItem(this.pendingApprovalListInfo)
          .then(
            (res) => {
              this.createAuditLog(this.pendingApprovalListInfo.item.Title);
            })
          .then(res => {
            this.saveInNotificationList();
          })
      });
  }

  //========= update application having uId===
  async updateRequest(data) {
    await this.sharepointworkflowService.updateListItem(data)
      .then(
        (res) => {
          this.updateInPendingApvrList(this.pendingApprovalListInfo)
        })
      .then(res => {
        this.createAuditLog(this.parsedRequestInfo.Title, this.auditLogComments);
      })
      .then(res => {
        this.saveInNotificationList();
      });
  }

  async getBtnClickAction(valFrmChild: any) {
    

    this.childBtnClickAction = valFrmChild;
    let _status = '';
    let _pendingWith = [];
    let _updatedMstrListData;
    let _itemData;

    switch (this.childBtnClickAction) {
      case "Submitted": {
        //==== validate whether requestor info is exist or not===
        if(this.createReqInfoFrmChild.Requestor.EmployeeName == null
          || this.createReqInfoFrmChild.Requestor.EmployeeId == null
          || this.createReqInfoFrmChild.Requestor.Email == null){
            alert("Requestor info is not found. Please try again later.");
            return false;
          }
        //---- validate whether requestor info is exist or not ends ----
        


        for (let i = 0; i < this.createReqInfoFrmChild.TestParameters.length; i++) {
          if(this.createReqInfoFrmChild.TestParameters[i].hasOwnProperty("Title") && this.createReqInfoFrmChild.TestParameters[i].Title.Title != ""){
            for (let j = 0; j < this.createReqInfoFrmChild.TestParameters[i].Title.Respectives.length; j++) {
              this.labResponsibles.push(Number(this.createReqInfoFrmChild.TestParameters[i].Title.Respectives[j].RAdId))
            }
          }else{
            alert ("Please select 'Test Parameter'");
            return false;
          }
          
        }

        this.createReqInfoFrmChild.Requestor.AdId = this.logedUserAdId;
        this.createReqInfoFrmChild.Requestor.RequestDate = new Date().toString().substring(4, 15);

        //======= add test Param info =============
        //this.createReqInfoFrmChild.Requestor.RequestDate = new Date().toString().substring(4, 15);  
        
        //====validation start========
        
          for (let i = 0; i < this.createReqInfoFrmChild.TestParameters.length; i++) {
            
              for (let j = 0; j < this.createReqInfoFrmChild.TestParameters[i].Samples.length; j++) {
                if(this.createReqInfoFrmChild.TestParameters[i].Samples[j].SampleDescription == ""
                  || this.createReqInfoFrmChild.TestParameters[i].Samples[j].Appearance == ""
                  || this.createReqInfoFrmChild.TestParameters[i].Samples[j].ReferenceNo == ""
                  || this.createReqInfoFrmChild.TestParameters[i].Samples[j].SampleType == null){
                    alert("Please fill in all mendatory fields marked as * in the Sample info fields.");
                    return false;
                  }
              }
            
            
          }
        
        //-------validation ends -------

        let itemData = {
          Status: "Submitted",
          RnDLabTest: JSON.stringify(this.createReqInfoFrmChild),
          PendingWithId: {
            'results': this.labResponsibles
          },
        }
        let listInfo = {
          name: "RnDLabTestMaster",
          item: itemData
        }

        await this.sharepointworkflowService.saveListItem(listInfo)
          .then(
            (res) => {

              for (let i = 0; i < this.createReqInfoFrmChild.TestParameters.length; i++) {
                for (let j = 0; j < this.createReqInfoFrmChild.TestParameters[i].Samples.length; j++) {
                  this.createReqInfoFrmChild.TestParameters[i].Samples[j].SampleID =
                    this.createReqInfoFrmChild.TestParameters[i].Title.RnDSection
                    + '-'
                    + this.createReqInfoFrmChild.TestParameters[i].Title.Code
                    + '-'
                    + (1 + j)
                    + '-ST-'
                    + res.ID;
                }
              }

              let itemData = {
                Title: "ST-" + res.ID,
                RnDLabTest: JSON.stringify(this.createReqInfoFrmChild),
                PendingWithId: {
                  'results': this.labResponsibles
                },
              }
              this.updatedMstrLstInfo = {
                name: "RnDLabTestMaster",
                rId: res.ID,
                item: itemData
              }

              //this.sharepointworkflowService.updateListItem(listInfo);

              this.reviewLink = 'https://portal.bergerbd.com/leaveauto/SitePages/SampleTest.aspx?UniqueId=' + res.GUID;
              this.approvalLink = 'https://portal.bergerbd.com/leaveauto/SitePages/SampleTest.aspx?UniqueId=' + res.GUID;
              //this.reviewLink = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx?UniqueId=' + res.GUID + "&mode=read";
              //this.approvalLink = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx?UniqueId=' + res.GUID;

              let pendingApprovalItemData = {
                Title: "ST-" + res.ID,
                ProcessName: "SampleTest",
                RequestedByName: this.createReqInfoFrmChild.Requestor.EmployeeName,
                Status: "Submitted",
                EmployeeID: this.createReqInfoFrmChild.Requestor.EmployeeId,
                RequestedByEmail: this.createReqInfoFrmChild.Requestor.Email,
                PendingWithId: {
                  'results': this.labResponsibles
                },
                RequestLink: this.approvalLink
              };

              this.pendingApprovalListInfo = {
                name: "PendingApproval",
                item: pendingApprovalItemData
              };
            }
          ).then(res => {
            this.createReqTitle(this.updatedMstrLstInfo);
          });
      }
      case "PickedUp": {
        let leftResspective;
        let a1 = this.parsedRequestInfo.PendingWith.results;  
        let allTPGrps=[];

        for (let s = 0; s < this.parsedRequestInfo.RnDLabTest.TestParameters.length; s++) {
          allTPGrps.push(this.parsedRequestInfo.RnDLabTest.TestParameters[s].Title.RnDSection)
        }

        // get array with unique value
        allTPGrps.filter((v,i) => allTPGrps.indexOf(v) == i);

        //or
        //let dup = [...new Set(allTPGrps)];
        

        for (let n = 0; n < this.parsedTestParameters.TestParameters.length; n++) {
          
          if (this.parsedTestParameters.TestParameters[n].Title.Title == this.emitedDataFrmChild.Title) {
            this._testParamNode = n;

            //update respective of picked test param only
            let a3 = this.parsedTestParameters.TestParameters[n].Title.Respectives;

            if(this.parsedRequestInfo.RnDLabTest.length == 1){
              _pendingWith.push(this.logedUserAdId);
            }
            else if(allTPGrps.length==1 ){
              if(this.requestInfo.RnDLabTest.length == 1){
                let result = a1.filter(u => !a3.some(user => user.RAdId == u.ID)); //removing own grouped respectives from all PendingWiths
  
                result.forEach(element => {
                  _pendingWith.push(element.ID);
                });
                _pendingWith.push(this.logedUserAdId);    
                
              }
            }
            else{
              let result = a1.filter(u => !a3.some(user => user.RAdId == u.ID)); //removing own grouped respectives from all PendingWiths

              result.forEach(element => {
                _pendingWith.push(element.ID);
              });
              _pendingWith.push(this.logedUserAdId);   
              
            }
            

            //filter out all respectives except picked by person of this picked test
            leftResspective = a3.filter(u => (u.RAdId == this.logedUserAdId));
            this.parsedRequestInfo.RnDLabTest.TestParameters[n].Title.Respectives = leftResspective;

            if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].hasOwnProperty('TestParameterStatus')) {
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus = "PickedUp";
            } else {
              //======adding 'TestParameterStatus' object element inside the existing 'TestParameters' object with spread operator ======
              this.parsedRequestInfo.RnDLabTest.TestParameters[n] = { ...this.parsedRequestInfo.RnDLabTest.TestParameters[n], TestParameterStatus: "PickedUp" };
            }
          }
        }

        _itemData = {
          RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: "PickedUp"
        }

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _itemData
        }

        //======= update PendingApprovalList start=======
        this.pendingApprovalListInfo = {
          Status: "Picked",
          PendingWithId: {
            'results': _pendingWith
          },
        }

        //-----------sample received comments -----
        this.auditLogComments = "Sample has been received by '" + this.emitedDataFrmChild.Title + "' lab personnel";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        break;
      }
      case "ResultSubmit": {
        if(this.emitedDataFrmChild.PackageCondition == null
          || this.emitedDataFrmChild.TestPeriodFrom == null
          || this.emitedDataFrmChild.TestPeriodTo == null){
            alert("All of PackageCondition, TestPeriodFrom and TestPeriodTo are required !");
            return false;
          }
        //=====validation start ======
        for (let n = 0; n < this.emitedDataFrmChild.TestResults.length; n++) {
          for (let r = 0; r < this.emitedDataFrmChild.TestResults[n].Results.length; r++) {
            if(this.emitedDataFrmChild.TestResults[n].Results[r].Parameter == ""
            || this.emitedDataFrmChild.TestResults[n].Results[r].TestResult == ""
            || this.emitedDataFrmChild.TestResults[n].Results[r].Unit == ""){
              alert("All of Parameter, TestResult and Unit are required in the Test Results fields !")
              return false;
            }
          } 
        }
        //---validation ends ---------


        //======set pending with =
        let a1 = this.parsedRequestInfo.PendingWith.results; //get all pendingWith people 
        let result = a1.filter(u => u.ID != this.logedUserAdId); //removing own grouped respectives from all PendingWiths

        result.forEach(element => {
          _pendingWith.push(element.ID); //including other group pendingWith people
        });

        this.reportReleaseGrp.forEach(rGrp => {
          _pendingWith.push(rGrp.AdId); //including report release group responsibles
        });


        for (let n = 0; n < this.parsedTestParameters.TestParameters.length; n++) {
          if (this.parsedTestParameters.TestParameters[n].Title.Title == this.emitedDataFrmChild.Title) {

            if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus &&
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus == "PickedUp") {

              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestResults = this.emitedDataFrmChild.TestResults;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].PackageCondition = this.emitedDataFrmChild.PackageCondition;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].PacComments = this.emitedDataFrmChild.PacComments;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestPeriodFrom = this.emitedDataFrmChild.TestPeriodFrom;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestPeriodTo = this.emitedDataFrmChild.TestPeriodTo;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus = "Reported";
            }

          }
        }

        for (let n = 0; n < this.parsedRequestInfo.RnDLabTest.TestParameters.length; n++) {
          if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].hasOwnProperty("TestParameterStatus")) {
            if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus == "PickedUp") {
              _status = "PartiallyReported";
            } else { _status = "Reported"; }
          } else {
            _status = "PartiallyReported";
          }
        }

        _itemData = {
          RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        }

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _itemData
        }

        //======= update PendingApprovalList start=======
        this.pendingApprovalListInfo = {
          Status: _status,
          PendingWithId: {
            'results': _pendingWith
          },
        }
        //-----------update PendingApprovalList ends -----

        //-----------sample received comments -----
        this.auditLogComments = "Report has been released by '" + this.emitedDataFrmChild.Title + "' lab personnel";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        break;
      }
      case "Completed": {
        //===========validation start 
        if(this.emitedDataFrmChild.RnDLabTest.ReportNote == ""){
          alert( "Report Note is required !" );
          return false;
        }
        //-------validation ends --------
        _pendingWith = [];
        _status = "Completed";

        _updatedMstrListData = {
          RnDLabTest: JSON.stringify(this.emitedDataFrmChild.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }
        
        //======= update PendingApprovalList start=======
        this.pendingApprovalListInfo = {
          Status: _status,
          PendingWithId: {
            'results': _pendingWith
          },
        }

        //-----------sample received comments -----
        this.auditLogComments = "Report has been released";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        //=====Email notification =======
        //this.createNotification("Completed", 1026, "Mostafa Kamal", "Mostafa Kamal", "ST-50", "Submitted");

        break;
      }
      case "FeedbackSubmit": {
        _pendingWith = [];
        _status = "FeedbackSubmitted";

        _itemData = {
          RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),          
          Status: _status
        }

        

        _updatedMstrListData = {
          RnDLabTest: JSON.stringify(this.emitedDataFrmChild.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------sample received comments -----
        this.auditLogComments = "Feedback has been submitted.";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);
        //alert("Action is undefined for this feedback type of click event !!");
        break;
      }
      case "AssignTo": {
        let nominatedPerson = '';
        nominatedPerson = (<HTMLInputElement>document.getElementById("reAssignedPersonpeoplepickerDiv_TopSpan_HiddenInput")).value;
        let paesedNP = JSON.parse(nominatedPerson);      
        //nominatedPerson = $.parseJSON($("input#reAssignedPersonpeoplepickerDiv_TopSpan_HiddenInput").val());
		    let nominatedUserKey = paesedNP[0]['Key'];
        let name = paesedNP[0].DisplayText;
        let position = paesedNP[0].EntityData.Title;
        let department = paesedNP[0].EntityData.Department;
        let mobilePhone = paesedNP[0].EntityData.MobilePhone;
        let email = paesedNP[0].EntityData.Email;

        this.listInfo.name = "BergerEmployeeInformation";
        this.listInfo.select = 'ID'+","+'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
        this.listInfo.expand = 'Email'+","+'OptManagerEmail';
        this.listInfo.filterBy = 'Email/EMail';
        this.listInfo.top = '10000';

        let requestorsInfoData ={};
        
        from(
            this.sharepointworkflowService.getEmployeeInfoByEmail(this.listInfo, email)
            ).subscribe(
              (res) =>{ 
                    let assignedPerID = res[0].Email.ID;
                    
                    //   EmployeeName: res[0].EmployeeName,
                    //   Company: res[0].Company,
                    //   EmployeeId: res[0].EmployeeId,
                    //   OfficeLocation: res[0].OfficeLocation,
                    //   Designation: res[0].Designation,
                    //   Department: res[0].Department,
                    //   Email: res[0].Email.EMail,
                    //   CostCenter: res[0].CostCenter,
                    //   Mobile: res[0].Mobile,
                    //   OpmEmail: res[0].OptManagerEmail,
                    //   OpmADId: res[0].OptManagerEmail.ID,
                    //   OpmName: res[0].OptManagerEmail.Title,
                    //   RequestDate: new Date().toString().substring(4, 15)
                    

                    let leftResspective;
                    let a1 = this.parsedRequestInfo.PendingWith.results;  
                    let allTPGrps=[];
            
                    for (let s = 0; s < this.parsedRequestInfo.RnDLabTest.TestParameters.length; s++) {
                      allTPGrps.push(this.parsedRequestInfo.RnDLabTest.TestParameters[s].Title.RnDSection)
                    }
            
                    // get array with unique value
                    allTPGrps.filter((v,i) => allTPGrps.indexOf(v) == i);
            
                    //or
                    //let dup = [...new Set(allTPGrps)];
                    
            
                    for (let n = 0; n < this.parsedTestParameters.TestParameters.length; n++) {
                      
                      if (this.parsedTestParameters.TestParameters[n].Title.Title == this.emitedDataFrmChild.Title) {
                        this._testParamNode = n;
            
                        //update respective of picked test param only
                        let a3 = this.parsedTestParameters.TestParameters[n].Title.Respectives;
            
                        if(this.parsedRequestInfo.RnDLabTest.length == 1){
                          _pendingWith.push(assignedPerID);
                        }
                        else if(allTPGrps.length==1 ){
                          if(this.requestInfo.RnDLabTest.length == 1){
                            let result = a1.filter(u => !a3.some(user => user.RAdId == u.ID)); //removing own grouped respectives from all PendingWiths
              
                            result.forEach(element => {
                              _pendingWith.push(element.ID);
                            });
                            _pendingWith.push(assignedPerID);    
                            
                          }
                        }
                        else{
                          let result = a1.filter(u => !a3.some(user => user.RAdId == u.ID)); //removing own grouped respectives from all PendingWiths
            
                          result.forEach(element => {
                            _pendingWith.push(element.ID);
                          });
                          _pendingWith.push(assignedPerID);   
                          
                        }
                        
            
                        //filter out all respectives except picked by person of this picked test
                        leftResspective = a3.filter(u => (u.RAdId == assignedPerID));
                        this.parsedRequestInfo.RnDLabTest.TestParameters[n].Title.Respectives = leftResspective;
            
                        if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].hasOwnProperty('TestParameterStatus')) {
                          this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus = "PickedUp";
                        } else {
                          //======adding 'TestParameterStatus' object element inside the existing 'TestParameters' object with spread operator ======
                          this.parsedRequestInfo.RnDLabTest.TestParameters[n] = { ...this.parsedRequestInfo.RnDLabTest.TestParameters[n], TestParameterStatus: "PickedUp" };
                        }
                      }
                    }
            
                    _itemData = {
                      RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),
                      PendingWithId: {
                        'results': _pendingWith
                      },
                      Status: "PickedUp"
                    }
            
                    this.updatedMstrLstInfo = {
                      name: "RnDLabTestMaster",
                      rId: this.parsedRequestInfo.ID,
                      item: _itemData
                    }
            
                    //======= update PendingApprovalList start=======
                    this.pendingApprovalListInfo = {
                      Status: "Picked",
                      PendingWithId: {
                        'results': _pendingWith
                      },
                    }
            
                    //-----------sample received comments -----
                    this.auditLogComments = "Sample has been received by '" + this.emitedDataFrmChild.Title + "' lab personnel";
            
                    //=========calling function to update data ======
                    this.updateRequest(this.updatedMstrLstInfo);
                
              },    
              (err) => {
                  console.log(err)
              },
            );
            
       

        break;
      }
      default: {
        alert("Action is undefined for this type of click event !!");
        break;
      }
      
    }
  }

  updateInPendingApvrList(itemData) {
    this.listInfo.name = "PendingApproval";
    this.listInfo.select = 'ID' + "," + 'Title';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    this.listInfo.filterBy = 'Title';
    this.listInfo.filterWith = this.parsedRequestInfo.Title;
    this.listInfo.top = '1';

    from(
      this.sharepointworkflowService.getFilteredItemsWithoutExpand(this.listInfo)
    ).subscribe(
      (res) => {
        let listInfo = {
          name: "PendingApproval",
          rId: res[0].ID,
          item: itemData
        }

        this.sharepointworkflowService.updateListItem(listInfo);
      }
    )
  }

  //=============for customer feedback =========
  onRatingChanged(rating){
    this.emitedDataFrmChild = rating;
    //console.log(rating);
    //this.feedback = rating;
    //this.rating = rating;
  }

  //=============get employee info by ADId===============
  async getEmpInfo(empADId){
    //===== for portaldv and or portal =====
    this.listInfo.name = "BergerEmployeeInformation";
    this.listInfo.select = 'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
    this.listInfo.expand = 'Email'+","+'OptManagerEmail';
    this.listInfo.filterBy = 'Email/ID';
    this.listInfo.top = '100000';

    let requestorsInfoData ={};
    
    await from(//getEmployeeInfoByEmail
        this.sharepointworkflowService.getItemsWithFilterExpand(this.listInfo, empADId)
        ).subscribe(
          (res) =>{ 
                
                requestorsInfoData ={
                  EmployeeName: res[0].EmployeeName,
                  Company: res[0].Company,
                  EmployeeId: res[0].EmployeeId,
                  OfficeLocation: res[0].OfficeLocation,
                  Designation: res[0].Designation,
                  Department: res[0].Department,
                  Email: res[0].Email.EMail,
                  CostCenter: res[0].CostCenter,
                  Mobile: res[0].Mobile,
                  OpmEmail: res[0].OptManagerEmail,
                  OpmADId: res[0].OptManagerEmail.ID,
                  OpmName: res[0].OptManagerEmail.Title,
                  RequestDate: new Date().toString().substring(4, 15)
                };
            
          },    
          (err) => {
              console.log(err)
          },
        );
        
        return requestorsInfoData;
   
  }

  //=============get employee info by ADId===============
  async getEmpInfoByEmail(empEmail){
    //===== for portaldv and or portal =====
    this.listInfo.name = "BergerEmployeeInformation";
    this.listInfo.select = 'ID'+","+'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
    this.listInfo.expand = 'Email'+","+'OptManagerEmail';
    this.listInfo.filterBy = 'Email/EMail';
    this.listInfo.top = '10000';

    let requestorsInfoData ={};
    
    await from(
        this.sharepointworkflowService.getEmployeeInfoByEmail(this.listInfo, empEmail)
        ).subscribe(
          (res) =>{ 
                
                requestorsInfoData ={
                  EmployeeName: res[0].EmployeeName,
                  Company: res[0].Company,
                  EmployeeId: res[0].EmployeeId,
                  OfficeLocation: res[0].OfficeLocation,
                  Designation: res[0].Designation,
                  Department: res[0].Department,
                  Email: res[0].Email.EMail,
                  CostCenter: res[0].CostCenter,
                  Mobile: res[0].Mobile,
                  OpmEmail: res[0].OptManagerEmail,
                  OpmADId: res[0].OptManagerEmail.ID,
                  OpmName: res[0].OptManagerEmail.Title,
                  RequestDate: new Date().toString().substring(4, 15)
                };
            
          },    
          (err) => {
              console.log(err)
          },
        );
        
        return requestorsInfoData;
   
  }
}
