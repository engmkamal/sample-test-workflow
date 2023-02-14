export interface ISample {
  AssetSubCategory?: string,
  AssetAcquisitionType?: string,
  AssetTitle?: string,
  AssetModel?: string,
  AssetDescription?: string,
  AssetNumber?: string,
  ResidualPriceAfterDepreciation?: string,
  UserAcqusitionDate?: Date | string,
  Vendor?: string,
  WarrantyFrom?: string,
  WarrantyExpDate?: Date | string,
  UsefulLife?: string,
  AssetUserName?: string,
  Manufacturer?: string,
  ProductSLNo?: string,
  PurchaseDate?: Date | string
}

export interface ITestParameter {
  Samples?: ISample[]
}

export interface IItassetitems {
  TestParameters?: ITestParameter[]
}

export const data = {
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
            // variable: "asdf",
            // SampleID: "SampleID",
            // SampleDescription: "SampleDescription",
            // Appearance: "Appearance",
            // ReferenceNo: "ReferenceNo",
            // SampleType: "SampleType",
            // OtherSampleType: "OtherSampleType",
            // MaterialConstruction: "MaterialConstruction",
            // SampleQuantity: "SampleQuantity",
            // SpecificRequirement: "SpecificRequirement"
          }
        ],
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
                // variable: "aaaaaa",
                // SampleID: "SampleID",
                // SampleDescription: "SampleDescription",
                // Appearance: "Appearance",
                // ReferenceNo: "ReferenceNo",
                // SampleType: "SampleType",
                // OtherSampleType: "OtherSampleType",
                // MaterialConstruction: "MaterialConstruction",
                // SampleQuantity: "SampleQuantity",
                // SpecificRequirement: "SpecificRequirement"
              }
            ],
            TestParameters: []
          },
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
                // variable: "asdf",
                // SampleID: "SampleID",
                // SampleDescription: "SampleDescription",
                // Appearance: "Appearance",
                // ReferenceNo: "ReferenceNo",
                // SampleType: "SampleType",
                // OtherSampleType: "OtherSampleType",
                // MaterialConstruction: "MaterialConstruction",
                // SampleQuantity: "SampleQuantity",
                // SpecificRequirement: "SpecificRequirement"
              }
            ],
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
                    // variable: "asdf",
                    // SampleID: "SampleID",
                    // SampleDescription: "SampleDescription",
                    // Appearance: "Appearance",
                    // ReferenceNo: "ReferenceNo",
                    // SampleType: "SampleType",
                    // OtherSampleType: "OtherSampleType",
                    // MaterialConstruction: "MaterialConstruction",
                    // SampleQuantity: "SampleQuantity",
                    // SpecificRequirement: "SpecificRequirement"
                  }
                ],
                TestParameters: []
              }
            ]
          }
        ]
      }
    ]
  };