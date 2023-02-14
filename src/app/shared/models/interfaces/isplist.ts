

interface IAuthor{
    ID?: number,
    Title?: string,
    EMail?: string,
}

interface Isplist {
    Title?: string,  
    Id?: number,
    Modified?: Date,
    Created?: Date,
    Author?: IAuthor,
    GUID?: string,
}

export interface IItem extends Isplist{
    //Title?: string,
    PendingWith?: IAuthor,
    Status?: string,
}

export interface IReimburselist extends IItem{
    EmployeeId?: number | string,
    GLCode?: number | string,
    RequestFor?: string,
    TotalReimbursementAmount?: number,
}

export interface IReimbursementList {
    value: IReimburselist[],
}

// export interface IListItem {  
//     Title?: string;  
//     Id: number;  
// } 

