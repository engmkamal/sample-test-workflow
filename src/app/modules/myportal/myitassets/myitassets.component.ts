import { Component, OnInit, AfterViewInit, AfterContentInit, VERSION } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormArray } from "@angular/forms";
import { from } from "rxjs";
import { SharepointworkflowService } from "src/app/shared/services/sharepointworkflow.service";
//import { TmlistitemsService } from "../../trademerchandising/tmlistitems.service";
import { IItassetitems, ISample, data } from "../data";

@Component({
  selector: 'app-myitassets',
  templateUrl: './myitassets.component.html',
  styleUrls: ['./myitassets.component.scss']
})
export class MyitassetsComponent implements OnInit, AfterViewInit{
  _form: FormGroup;

  _data = data;

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

  assetItemArray: ISample[] = [];  

  myFormData: IItassetitems = {
    TestParameters: [
      {
        Samples:[]
      }
    ]
  };

  data5 = [];

  data2 = {
    TestParameters: [
      {
        Samples: [
          { 
              AssetSubCategory: "Desktop",
              AssetAcquisitionType: "AssetAcquisitionType",
              AssetTitle: "AssetTitle",
              AssetModel: "AssetModel",
              AssetDescription: "AssetDescription",
              AssetNumber: "AssetNumber",
              //ResidualPriceAfterDepreciation: "ResidualPriceAfterDepreciation",
              UserAcqusitionDate: "UserAcqusitionDate",
              //Vendor: "Vendor",
              WarrantyFrom: "WarrantyFrom",
              WarrantyExpDate: "WarrantyExpDate",
              UsefulLife: "UsefulLife",
              AssetUserName: "AssetUserName",
              Manufacturer: "Manufacturer",
              ProductSLNo: "ProductSLNo",
              PurchaseDate: "PurchaseDate"
          }
        ]
      }
    ]
  };

  constructor(private fb: FormBuilder, public sharepointworkflowService: SharepointworkflowService) {
    //this._createForm();
  }

  ngOnInit(){
    
    this._createForm();    
  
    

    this.listInfo.name = "ITAssetManagement"; 
    this.listInfo.select = 'Title'+","+'EmployeeID'+","+'AssetSubCategory'+","+'AssetAcquisitionType'+","+'AssetTitle'+","+'AssetModel'+","+'AssetDescription'+","+'AssetNumber'+","+'ResidualPriceAfterDepreciation'+","+'UserAcqusitionDate'+","+'Vendor'+","+'WarrantyFrom'+","+'WarrantyExpDate'+","+'UsefulLife'+","+'AssetUserName'+","+'AssetUserPosition'+","+'AssetUserEmail'+","+'AssetUserEmployeeID'+","+'AssetUsercostCenter'+","+'BusinessArea'+","+'PurchaseDate'+","+'Manufacturer'+","+'ProductSLNo'+","+'Comments'+","+'Status'+","+'GUID'+","+'Modified'+","+'Created';
    //this.listInfo.expand = 'Author';
    this.listInfo.filterBy = 'AssetUserEmail';
    this.listInfo.top = '5';


    this.sharepointworkflowService.getSPLoggedInUserEmail().then((res)=> {
      from(
        this.sharepointworkflowService.getItemsWithEmailFilter(this.listInfo, res)
        //this.sharepointworkflowService.getItemsWithEmailFilter(this.listInfo, 'shoaib@bergerbd.com')
        ).subscribe(
          (res) =>{ 
            if(res.length >0){
              res.forEach(element => {
                this.data5.push(
                    {
                      AssetSubCategory: element.AssetSubCategory,
                      AssetAcquisitionType: element.AssetAcquisitionType,
                      AssetTitle: element.AssetTitle,
                      AssetModel: element.AssetModel,
                      AssetDescription: element.AssetDescription,
                      AssetNumber: element.AssetNumber,
                      UserAcqusitionDate: element.UserAcqusitionDate,
                      WarrantyFrom: element.WarrantyFrom,
                      WarrantyExpDate: element.WarrantyExpDate,
                      UsefulLife: element.UsefulLife +" Years",
                      Manufacturer: element.Manufacturer,
                      ProductSLNo: element.ProductSLNo,
                      PurchaseDate: element.PurchaseDate
                    }
                  )
                });

                let data3 = {
                  TestParameters: [
                    {
                      Samples: this.data5
                    }
                  ]
                };

                this.data2 = data3;
            } else{
              alert("You have no Asset Item to show");
              return false;
            }           
                // let assetItem = {};

                // for(let i=0; i<res.length; i++){
                //   assetItem = {
                //     AssetSubCategory: res[i].AssetSubCategory,
                //     AssetAcquisitionType: res[i].AssetAcquisitionType,
                //     AssetTitle: res[i].AssetTitle,
                //     AssetModel: res[i].AssetModel,
                //     AssetDescription: res[i].AssetDescription,
                //     AssetNumber: res[i].AssetNumber,
                //     UserAcqusitionDate: res[i].UserAcqusitionDate,
                //     WarrantyFrom: res[i].WarrantyFrom,
                //     WarrantyExpDate: res[i].WarrantyExpDate,
                //     UsefulLife: res[i].UsefulLife +" Years",
                //     Manufacturer: res[i].Manufacturer,
                //     ProductSLNo: res[i].ProductSLNo,
                //     PurchaseDate: res[i].PurchaseDate
                //   }
                //   //this.assetItemArray.push(assetItem);
                //   this.data5.push(assetItem);
                //   //data.TestParameters[0].Samples[0] = assetItem;
                // };

                               

                

                //---------------updating ends ----------------
                
                                          
               

                // (<FormArray>this._form.controls['TestParameters']).controls['Samples'].patchValue(this.assetItemArray);
                
          },    
          (err) => {
              console.log(err)
          },
        );      
    });
  }

  ngAfterViewInit(){
    
    setTimeout(() => {
      if(this.data5.length > 0){
        this._buildFormFromData()
      }else{setTimeout(() => {
        if(this.data5.length > 0){
          this._buildFormFromData()
        }else{setTimeout(() => {
          if(this.data5.length > 0){
            this._buildFormFromData()
          }else{
            alert("You have no Asset Item to show");
            return false;
          }
        }, 1000);}
      }, 1000);}
    }, 1000);

  }

  _buildFormFromData() {
    if (this.data2.TestParameters.length) {
      this._addGroup();
    }

    setTimeout(() => {
      this._form.patchValue(this.data2);
    }, 50);     
    
  }

  _addGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        TestParameters: []
      })
    );
  }

  _delete(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  get _groupsFormArray(): FormArray {
    return this._form.get("TestParameters") as FormArray;
  }

  private _createForm() {
    this._form = this.fb.group({
        TestParameters: this.fb.array([])
    });
  }

  onSubmitBtn(){
    console.log("Submitted info: " + JSON.stringify(this._form.value) );
  }
}

