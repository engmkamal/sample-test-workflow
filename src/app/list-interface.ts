export class ListInterface {
}




//=============just declaration with interface starts======
  
  
  export class AuthorItems{
    ID?:string;
    Title?:string;
    Email?:string;
    
    constructor(ID?:string,Title?:string,Email?:string,){
      this.ID=ID;
      this.Title=Title;
      this.Email=Email;
    }
    
  }

  export class PendingWithItems extends AuthorItems{    
    constructor(ID?:string,Title?:string,Email?:string,){
      super(ID,Title,Email)
    }    
  }
  
  export class results {
    results?: AuthorItems | null; 
    // ID?:string;
    // Title?:string;
    // Email?:string;
    // constructor(ID?:string,Title?:string,Email?:string,){      
    // }    
  }

  export interface IVIDashboardBase{
    Modified?: Date,
    Created?:Date,
    Author?:AuthorItems,
    GUID?:string,
  }
  
  export interface IValueItems extends IVIDashboardBase{
    Title?:string,
    PendingWith?: PendingWithItems | results[] | null,
    Status?:string,
    EmployeeID?:string,
  }

  export interface IMyProcessItems extends IValueItems{    
    ProcessName: string; 
    RequestedByName?:string;
    RequestedByEmail?: string;
    RequestLink?: string;
  }

  export interface ISPList{
    value: IValueItems[];
  }

  export interface ISPWFGroup extends ISPList{
    key?: string; 
  }

  export class DashboardUsers{
    ID?:number;
    Title?:string;
    Email?:string;
    
    constructor(ID?:number,Title?:string,Email?:string,){
      this.ID=ID;
      this.Title=Title;
      this.Email=Email;
    }
    
  }

  // export class MembersOfFullAccess{
  //   ID?:string;
  //   Title?:string;    
    
  //   constructor(ID?:string,Title?:string){
  //     this.ID=ID;
  //     this.Title=Title;      
  //   }    
  // }

  // export class MembersOfUserAccess{
  //   ID?:number;
  //   Title?:string;    
    
  //   constructor(ID?:number,Title?:string){
  //     this.ID=ID;
  //     this.Title=Title;      
  //   }    
  // }


  export interface IUserAccess {
    ID:number;
    WorkflowName:string;
    MembersOfFullAccess:DashboardUsers[];
    MembersOfUserAccess:DashboardUsers[];
  }

  // export interface ILogedUser {
  //   Id?:string;
  //   Title?:string;
  //   Email?:string;
  // }

  export class SearchService{
    results: Object[];
  
    constructor(){
      this.results =[];
    } 
    
  }
