export const data = {
  TestParameters: [
    {
      // Samples: [
      //   {
      //     variable: "asdf",
      //     SampleID: "SampleID",
      //     SampleDescription: "SampleDescription11111111111111111111",
      //     Appearance: "Appearance",
      //     ReferenceNo: "ReferenceNo",
      //     SampleType: "SampleType",
      //     OtherSampleType: "OtherSampleType",
      //     MaterialConstruction: "MaterialConstruction",
      //     SampleQuantity: "SampleQuantity",
      //     SpecificRequirement: "SpecificRequirement",
      //     ProductSLNo: "ProductSLNo"
      //   }
      // ],
      TestParameters: [
        {
          Samples: [
            {
              //variable: "aaaaaa111111",
              SampleID: "SampleID",
              SampleDescription: "SampleDescription",
              Appearance: "Appearance",
              ReferenceNo: "ReferenceNo",
              SampleType: "SampleType",
              //OtherSampleType: "OtherSampleType",
              MaterialConstruction: "MaterialConstruction",
              SampleQuantity: "SampleQuantity",
              SpecificRequirement: "SpecificRequirement",
              //ProductSLNo: "ProductSLNo"
            },
            {
              //variable: "aaaaaa22222222222",
              SampleID: "SampleID",
              SampleDescription: "SampleDescription",
              Appearance: "Appearance",
              ReferenceNo: "ReferenceNo",
              SampleType: "SampleType",
              OtherSampleType: "OtherSampleType",
              MaterialConstruction: "MaterialConstruction",
              SampleQuantity: "SampleQuantity",
              SpecificRequirement: "SpecificRequirement",
              //ProductSLNo: "ProductSLNo"
            }
          ],
          //TestParameters: []
        }        
      ],
      //TestParameterStatus: ['Submitted'],
    }
  ]
};

export const testParametersMatrix = [
  { RnDSection: 'WB', Title: 'Scrub Resistance of Paints', Code: 'SCRU', Method: 'ASTM D2486 – 06 (2012)', SampleReq: '500 ml', RequiredDay: '15 working days', Respectives: [{ RName: 'Md Mohiuddin Kaisher', REmail: 'mohiuddin.kaisher@bergerbd.com', RAdId: '882' }, { RName: 'Md Fahim Hossain', REmail: 'fahim@bergerbd.com', RAdId: '1038' }] },
  { RnDSection: 'WB', Title: 'Density of Liquid Coatings, Inks & related products', Code: 'DENL', Method: 'ISO 2811-1:2016', SampleReq: '500 ml', RequiredDay: '3 working days', Respectives: [{ RName: 'Md Mohiuddin Kaisher', REmail: 'mohiuddin.kaisher@bergerbd.com', RAdId: '882' }, { RName: 'Md Fahim Hossain', REmail: 'fahim@bergerbd.com', RAdId: '1038' }] },
  { RnDSection: 'WB', Title: 'Pull off strength of coatings', Code: 'PULL', Method: 'ASTM D4541 - 17', SampleReq: '500 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mohiuddin Kaisher', REmail: 'mohiuddin.kaisher@bergerbd.com', RAdId: '882' }, { RName: 'Md Fahim Hossain', REmail: 'fahim@bergerbd.com', RAdId: '1038' }] },
  { RnDSection: 'QA', Title: 'Dispersion of Pigment-Vehicle System', Code: 'GRIN', Method: 'ASTM D1210-05 (2014)', SampleReq: '500 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Badrunnahar', REmail: 'LITA@bergerbd.com', RAdId: '708' }, { RName: 'Md Zahedul Islam', REmail: 'zahedul@bergerbd.com', RAdId: '242' }] },
  { RnDSection: 'QA', Title: 'Specular Gloss of Paints', Code: 'GLOS', Method: 'ASTM D523-14 (2018)', SampleReq: '500 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Badrunnahar', REmail: 'LITA@bergerbd.com', RAdId: '708' }, { RName: 'Md Zahedul Islam', REmail: 'zahedul@bergerbd.com', RAdId: '242' }] },
  { RnDSection: 'PC', Title: 'Rapid deformation resistance (Impact resistance)', Code: 'IMPR', Method: 'ASTM D2794 – 93 (2019)', SampleReq: '4 nos. of specimens', RequiredDay: '2 working days', Respectives: [{ RName: 'Utpol Chowdhury', REmail: 'utpol@bergerbd.com', RAdId: '256' }, { RName: 'Robiul Islam', REmail: 'ROBIUL.ISLAM@bergerbd.com', RAdId: '725' }] },
  { RnDSection: 'PC', Title: 'Flexibility testing (Mandrel Bend Test)', Code: 'FLEX', Method: 'ASTM D522/D522M-17', SampleReq: '3 nos. of specimens', RequiredDay: '2 working days', Respectives: [{ RName: 'Utpol Chowdhury', REmail: 'utpol@bergerbd.com', RAdId: '256' }, { RName: 'Robiul Islam', REmail: 'ROBIUL.ISLAM@bergerbd.com', RAdId: '725' }] },
  { RnDSection: 'PC', Title: 'Particle size distribution of powder ', Code: 'PSAP', Method: 'ISO 13320:2020', SampleReq: '20 g', RequiredDay: '2 working days', Respectives: [{ RName: 'Utpol Chowdhury', REmail: 'utpol@bergerbd.com', RAdId: '256' }, { RName: 'Robiul Islam', REmail: 'ROBIUL.ISLAM@bergerbd.com', RAdId: '725' }] },
  { RnDSection: 'SB', Title: 'Sag Resistance of paints', Code: 'SAGR', Method: 'ASTM D4400 - 18', SampleReq: '500 ml', RequiredDay: '2 working days', Respectives: [{ RName: 'S M Mahid', REmail: 'mahid@bergerbd.com', RAdId: '1037' }, { RName: 'Md Omar Sharif', REmail: 'omar.sharif@bergerbd.com', RAdId: '892' }] },
  { RnDSection: 'SB', Title: 'Contrast Ratio of Paints', Code: 'CONT', Method: 'ASTM D2805 - 11(2018)', SampleReq: '500 ml', RequiredDay: '2 working days', Respectives: [{ RName: 'S M Mahid', REmail: 'mahid@bergerbd.com', RAdId: '1037' }, { RName: 'Md Omar Sharif', REmail: 'omar.sharif@bergerbd.com', RAdId: '892' }] },
  { RnDSection: 'RM', Title: 'Corrosion resistance of coatings', Code: 'CORC', Method: 'ASTM B117-19', SampleReq: '4 nos. of specimens', RequiredDay: 'As per requestor requirement', Respectives: [{ RName: 'Md Rashedur Rahman Raju', REmail: 'rashedur@bergerbd.com', RAdId: '1052' }, { RName: 'Abdulla Al Noman', REmail: 'noman@bergerbd.com', RAdId: '1166' }] },
  { RnDSection: 'IN', Title: 'Ink Adhesion to Flexible Packaging Materials', Code: 'IADH', Method: 'ASTM F2252/F2252M-13 (2018)', SampleReq: '2 nos. of specimens', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Rashedur Rahman Raju', REmail: 'rashedur@bergerbd.com', RAdId: '1052' }, { RName: 'Abdulla Al Noman', REmail: 'noman@bergerbd.com', RAdId: '1166' }] },
  { RnDSection: 'IN', Title: 'Non-volatile Content of Liquid Printing Ink Systems', Code: 'NVCI', Method: 'ASTM D4713 B -12 (2020)', SampleReq: '100 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Rashedur Rahman Raju', REmail: 'rashedur@bergerbd.com', RAdId: '1052' }, { RName: 'Abdulla Al Noman', REmail: 'noman@bergerbd.com', RAdId: '1166' }] },
  { RnDSection: 'EP', Title: 'Formaldehyde content in Textile', Code: 'HCHO', Method: 'ISO 14184-1:2011', SampleReq: 'Fabric (1.5 X 1.5) Feet', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
  { RnDSection: 'EP', Title: 'Color fastness to Rubbing', Code: 'RUBB', Method: 'ISO 105-X12:2016', SampleReq: 'Fabric (1.5 X 1.5) Feet', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
  { RnDSection: 'EP', Title: 'Cloud Point of Non-ionic Surfactants', Code: 'CLPO', Method: 'ASTM D2024 - 09(2017)', SampleReq: '100 g', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
  { RnDSection: 'EP', Title: 'pH of Textile', Code: 'PTEX', Method: 'ISO 3071:2020', SampleReq: 'Fabric (1.5 X 1.5) Feet', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
  { RnDSection: 'EP', Title: 'pH of Aqueous solution', Code: 'PAQS', Method: 'ASTM E70 - 19', SampleReq: '250 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
  { RnDSection: 'AN', Title: 'p-tert-Butyl Catechol (TBC) content in Styrene Monomer', Code: 'TBCS', Method: 'ASTM D4590 - 18', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mofizur@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190'}, { Name: "Mostafa Kamal", Email: "kamal@bergerbd.com", EmpId: "1270", RAdId: '1026' }] },
  { RnDSection: 'AN', Title: 'Hydroquinone (HQ) content in Vinyl Acetate Monomer', Code: 'HQVA', Method: 'Laboratory Developed', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mofizur@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190'}, { RName: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId: '1026' }] },
  { RnDSection: 'AN', Title: 'Solvent/Monomer GC Analysis', Code: 'SMGC', Method: 'Laboratory Developed', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mofizur@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190'}, { Name: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId:'1026' }] },
  { RnDSection: 'AN', Title: 'MFFT of Latex', Code: 'MFFT', Method: 'Laboratory Developed', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mofizur@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190'},{ RName: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId: '1026' }] },
  { RnDSection: 'AN', Title: 'Particle size distribution of Latex', Code: 'PSAL', Method: 'Laboratory Developed', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mofizur@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190' }, { RName: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId: '1026' }] },
];

export const testParametersGroupedMatrix = [
  {
    RnDSection: 'WB',
    Parameters: [
      { RnDSection: 'WB', Title: 'Scrub Resistance of Paints', Code: 'SCRU', Method: 'ASTM D2486 – 06 (2012)', SampleReq: '500 ml', RequiredDay: '15 working days', Respectives: [{ RName: 'Md Mohiuddin Kaisher', REmail: 'mohiuddin.kaisher@bergerbd.com', RAdId: '882' }, { RName: 'Md Fahim Hossain', REmail: 'fahim@bergerbd.com', RAdId: '1038' }] },
      { RnDSection: 'WB', Title: 'Density of Liquid Coatings, Inks & related products', Code: 'DENL', Method: 'ISO 2811-1:2016', SampleReq: '500 ml', RequiredDay: '3 working days', Respectives: [{ RName: 'Md Mohiuddin Kaisher', REmail: 'mohiuddin.kaisher@bergerbd.com', RAdId: '882' }, { RName: 'Md Fahim Hossain', REmail: 'fahim@bergerbd.com', RAdId: '1038' }] },
      { RnDSection: 'WB', Title: 'Pull off strength of coatings', Code: 'PULL', Method: 'ASTM D4541 - 17', SampleReq: '500 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mohiuddin Kaisher', REmail: 'mohiuddin.kaisher@bergerbd.com', RAdId: '882' }, { RName: 'Md Fahim Hossain', REmail: 'fahim@bergerbd.com', RAdId: '1038' }] },
    ]
  },
  {
    RnDSection: 'QA',
    Parameters: [
      { RnDSection: 'QA', Title: 'Dispersion of Pigment-Vehicle System', Code: 'GRIN', Method: 'ASTM D1210-05 (2014)', SampleReq: '500 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Badrunnahar', REmail: 'LITA@bergerbd.com', RAdId: '708' }, { RName: 'Md Zahedul Islam', REmail: 'zahedul@bergerbd.com', RAdId: '242' }] },
      { RnDSection: 'QA', Title: 'Specular Gloss of Paints', Code: 'GLOS', Method: 'ASTM D523-14 (2018)', SampleReq: '500 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Badrunnahar', REmail: 'LITA@bergerbd.com', RAdId: '708' }, { RName: 'Md Zahedul Islam', REmail: 'zahedul@bergerbd.com', RAdId: '242' }] },
    ]
  },
  {
    RnDSection: 'PC',
    Parameters: [
      { RnDSection: 'PC', Title: 'Rapid deformation resistance (Impact resistance)', Code: 'IMPR', Method: 'ASTM D2794 – 93 (2019)', SampleReq: '4 nos. of specimens', RequiredDay: '2 working days', Respectives: [{ RName: 'Utpol Chowdhury', REmail: 'utpol@bergerbd.com', RAdId: '256' }, { RName: 'Robiul Islam', REmail: 'ROBIUL.ISLAM@bergerbd.com', RAdId: '725' }] },
      { RnDSection: 'PC', Title: 'Flexibility testing (Mandrel Bend Test)', Code: 'FLEX', Method: 'ASTM D522/D522M-17', SampleReq: '3 nos. of specimens', RequiredDay: '2 working days', Respectives: [{ RName: 'Utpol Chowdhury', REmail: 'utpol@bergerbd.com', RAdId: '256' }, { RName: 'Robiul Islam', REmail: 'ROBIUL.ISLAM@bergerbd.com', RAdId: '725' }] },
      { RnDSection: 'PC', Title: 'Particle size distribution of powder ', Code: 'PSAP', Method: 'ISO 13320:2020', SampleReq: '20 g', RequiredDay: '2 working days', Respectives: [{ RName: 'Utpol Chowdhury', REmail: 'utpol@bergerbd.com', RAdId: '256' }, { RName: 'Robiul Islam', REmail: 'ROBIUL.ISLAM@bergerbd.com', RAdId: '725' }] },
    ]
  },
  {
    RnDSection: 'SB',
    Parameters: [
      { RnDSection: 'SB', Title: 'Sag Resistance of paints', Code: 'SAGR', Method: 'ASTM D4400 - 18', SampleReq: '500 ml', RequiredDay: '2 working days', Respectives: [{ RName: 'S M Mahid', REmail: 'mahid@bergerbd.com', RAdId: '1037' }, { RName: 'Md Omar Sharif', REmail: 'omar.sharif@bergerbd.com', RAdId: '892' }] },
      { RnDSection: 'SB', Title: 'Contrast Ratio of Paints', Code: 'CONT', Method: 'ASTM D2805 - 11(2018)', SampleReq: '500 ml', RequiredDay: '2 working days', Respectives: [{ RName: 'S M Mahid', REmail: 'mahid@bergerbd.com', RAdId: '1037' }, { RName: 'Md Omar Sharif', REmail: 'omar.sharif@bergerbd.com', RAdId: '892' }] },
    ]
  },
  {
    RnDSection: 'RM',
    Parameters: [
      { RnDSection: 'RM', Title: 'Corrosion resistance of coatings', Code: 'CORC', Method: 'ASTM B117-19', SampleReq: '4 nos. of specimens', RequiredDay: 'As per requestor requirement', Respectives: [{ RName: 'Md Rashedur Rahman Raju', REmail: 'rashedur@bergerbd.com', RAdId: '1052' }, { RName: 'Abdulla Al Noman', REmail: 'noman@bergerbd.com', RAdId: '1166' }] },
    ]
  },
  {
    RnDSection: 'IN',
    Parameters: [
      { RnDSection: 'IN', Title: 'Ink Adhesion to Flexible Packaging Materials', Code: 'IADH', Method: 'ASTM F2252/F2252M-13 (2018)', SampleReq: '2 nos. of specimens', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Rashedur Rahman Raju', REmail: 'rashedur@bergerbd.com', RAdId: '1052' }, { RName: 'Abdulla Al Noman', REmail: 'noman@bergerbd.com', RAdId: '1166' }] },
      { RnDSection: 'IN', Title: 'Non-volatile Content of Liquid Printing Ink Systems', Code: 'NVCI', Method: 'ASTM D4713 B -12 (2020)', SampleReq: '100 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Rashedur Rahman Raju', REmail: 'rashedur@bergerbd.com', RAdId: '1052' }, { RName: 'Abdulla Al Noman', REmail: 'noman@bergerbd.com', RAdId: '1166' }] },
    ]
  },
  {
    RnDSection: 'EP',
    Parameters: [
      { RnDSection: 'EP', Title: 'Formaldehyde content in Textile', Code: 'HCHO', Method: 'ISO 14184-1:2011', SampleReq: 'Fabric (1.5 X 1.5) Feet', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
      { RnDSection: 'EP', Title: 'Color fastness to Rubbing', Code: 'RUBB', Method: 'ISO 105-X12:2016', SampleReq: 'Fabric (1.5 X 1.5) Feet', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
      { RnDSection: 'EP', Title: 'Cloud Point of Non-ionic Surfactants', Code: 'CLPO', Method: 'ASTM D2024 - 09(2017)', SampleReq: '100 g', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
      { RnDSection: 'EP', Title: 'pH of Textile', Code: 'PTEX', Method: 'ISO 3071:2020', SampleReq: 'Fabric (1.5 X 1.5) Feet', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
      { RnDSection: 'EP', Title: 'pH of Aqueous solution', Code: 'PAQS', Method: 'ASTM E70 - 19', SampleReq: '250 ml', RequiredDay: '5 working days', Respectives: [{ RName: 'Md Mobarak Hossain', REmail: 'mobarak@bergerbd.com', RAdId: '388' }, { RName: 'Md Al Amin', REmail: 'mdalamin@bergerbd.com', RAdId: '745' }] },
    ]
  },
  {
    RnDSection: 'AN',
    Parameters: [
      { RnDSection: 'AN', Title: 'p-tert-Butyl Catechol (TBC) content in Styrene Monomer', Code: 'TBCS', Method: 'ASTM D4590 - 18', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mmorshed@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190'}, { RName: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId: '1026' }] },
      { RnDSection: 'AN', Title: 'Hydroquinone (HQ) content in Vinyl Acetate Monomer', Code: 'HQVA', Method: 'Laboratory Developed', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mmorshed@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190'}, { RName: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId: '1026' }] },
      { RnDSection: 'AN', Title: 'Solvent/Monomer GC Analysis', Code: 'SMGC', Method: 'Laboratory Developed', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mmorshed@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190'}, { RName: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId:'1026' }] },
      { RnDSection: 'AN', Title: 'MFFT of Latex', Code: 'MFFT', Method: 'Laboratory Developed', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mmorshed@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190'},{ Name: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId: '1026' }] },
      { RnDSection: 'AN', Title: 'Particle size distribution of Latex', Code: 'PSAL', Method: 'Laboratory Developed', SampleReq: '50 ml', RequiredDay: '5 working days', Respectives: [{ RName: "Mofizur Rahman", REmail: "mmorshed@bergerbd.com", REmpId: "593", RAdId: "255" },{ RName: 'Laboratory Quality Manager', REmail: 'analyticallab@bergerbd.com', RAdId: '1190' }, { RName: "Mostafa Kamal", REmail: "kamal@bergerbd.com", REmpId: "1270", RAdId: '1026' }] },
    ]
  }
];

export const reportReleaseGroup = [
  { Name: "Ali Shazzad Mohammad Morshed", Email: "mmorshed@bergerbd.com", EmpId: "226", AdId: "127" },
  { Name: "Mofizur Rahman", Email: "mmorshed@bergerbd.com", EmpId: "593", AdId: "255" },
  { Name: "Md Masudul Haque", Email: "mmorshed@bergerbd.com", EmpId: "529", AdId: "232" },
  { Name: "Operational manager", Email: "opm1@bergerbd.com", EmpId: "9009", AdId: "381" }
];

export const testData = {
  uId: "UniqueId=4d77db33-e9d9-49d7-ac4f-15c5f29f8b14",
  readMode: "",
  ID: 71,
  Title: "ST-71",
  Status: "Submitted",
  RnDLabTest: {"TestParameters":[{"Samples":[{"SampleID":"WB-SCRU-1-ST-40","SampleDescription":"Sample Description t1s1","Appearance":"Sample Description t1s1","ReferenceNo":"Sample Description t1s1","SampleType":"Paste","MaterialConstruction":"Sample Description t1s1","SampleQuantity":"Sample Description t1s1","SpecificRequirement":"Sample Description t1s1"},{"SampleID":"WB-SCRU-2-ST-40","SampleDescription":"Sample Description t1s2","Appearance":"Sample Description t1s2","ReferenceNo":"Sample Description t1s2","SampleType":"Liquid","MaterialConstruction":"Sample Description t1s2","SampleQuantity":"Sample Description t1s2","SpecificRequirement":"Sample Description t1s2"}],"Title":{"RnDSection":"WB","Title":"Scrub Resistance of Paints","Code":"SCRU","Method":"Laboratory Developed","SampleReq":"500 ml","RequiredDay":"15 working days","Respectives":[{"RName":"Md Mohiuddin Kaisher","REmail":"mohiuddin.kaisher@bergerbd.com","RAdId":"882"},{"RName":"Md Fahim Hossain","REmail":"fahim@bergerbd.com","RAdId":"1038"}]},"TestParameterStatus":"PickedUp"},{"Samples":[{"SampleID":"QA-PULL-1-ST-40","SampleDescription":"Sample Description t1s2","Appearance":"Sample Description t2s1","ReferenceNo":"Sample Description t2s1","SampleType":"Paste","MaterialConstruction":"Sample Description t2s1","SampleQuantity":"Sample Description t2s1","SpecificRequirement":"Sample Description t2s1"},{"SampleID":"QA-PULL-2-ST-40","SampleDescription":"Sample Description t2s2","Appearance":"Sample Description t2s2","ReferenceNo":"Sample Description t2s2","SampleType":"Powder","MaterialConstruction":"Sample Description t2s2","SampleQuantity":"Sample Description t2s2","SpecificRequirement":"Sample Description t2s2"}],"Title":{"RnDSection":"QA","Title":"Pull off strength of coatings","Code":"PULL","Method":"ASTM D4541","SampleReq":"500 ml","RequiredDay":"15 working days","Respectives":[{"RName":"Md Mohiuddin Kaisher","REmail":"mohiuddin.kaisher@bergerbd.com","RAdId":"882"},{"RName":"Md Fahim Hossain","REmail":"fahim@bergerbd.com","RAdId":"1038"}]}},{"Samples":[{"SampleID":"PC-IMPR-1-ST-40","SampleDescription":"Sample Description t1s1","Appearance":"Sample Description t3s1","ReferenceNo":"Sample Description t3s1","SampleType":"Paste","MaterialConstruction":"Sample Description t3s1","SampleQuantity":"Sample Description t3s1","SpecificRequirement":"Sample Description t3s1"},{"SampleID":"PC-IMPR-2-ST-40","SampleDescription":"Sample Description t3s2","Appearance":"Sample Description t3s2","ReferenceNo":"Sample Description t3s2","SampleType":"Paste","MaterialConstruction":"Sample Description t3s2","SampleQuantity":"Sample Description t3s2","SpecificRequirement":"Sample Description t3s2"}],"Title":{"RnDSection":"PC","Title":"Rapid deformation resistance (Impact resistance)","Code":"IMPR","Method":"ASTM D2794","SampleReq":"500 ml","RequiredDay":"15 working days","Respectives":[{"RName":"Utpol Chowdhury","REmail":"utpol@bergerbd.com","RAdId":"256"},{"RName":"Robiul Islam","REmail":"ROBIUL.ISLAM@bergerbd.com","RAdId":"725"}]}}],"Requestor":{"EmployeeName":"Mostafa Kamal","Company":"Berger Paints Bangladesh Limited","EmployeeId":"1270","OfficeLocation":"Corporate","Designation":"Software Engineer","Department":"BP IT Development","Email":"kamal@bergerbd.com","CostCenter":"90007101","Mobile":"+8801713158690","RequestDate":null}},
  PendingWith: [1026, 381]
}


