// export class WorkshopProposalList {
// }

import { ISPList } from 'src/app/list-interface';

//===============Workshop Proposal list item object starts ==============
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
  
export interface IVIDashboardBase{
    Status:string,
    EmployeeID:string,
}

export interface IValueItems extends IVIDashboardBase{
    Title:string,  
    Created:Date,
    Author:AuthorItems,
    PendingWith?:PendingWithItems,
    GUID?:string 
}

export class WorkshopProposal implements ISPList {  

    constructor(
        public value:[IValueItems]             
    ){}
}
//------------- Workshop Proposal list item object ends ----------

//===============value item object starts ==============
export class VIDashboardBase implements IVIDashboardBase {  

    constructor(
        public Status:string,
        public EmployeeID:string,             
    ){}
}

export class ValueItems extends VIDashboardBase {
    public Title:string;
    public Created:Date;
    public Author:AuthorItems;
    public PendingWith?:PendingWithItems;
    public GUID?:string;

    constructor
        (        
            Title,
            Created,
            Author,
            PendingWith,
            GUID,
            Status,
            EmployeeID,
        )
        {
            super(Status, EmployeeID,);
            this.Title=Title;
            this.Created = Created;
            this.Author = Author;
            this.PendingWith = PendingWith;
            this.GUID = GUID;         
        }
        
    
}
//----------------ends --------------
