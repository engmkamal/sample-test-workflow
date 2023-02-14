import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalObjectService {

  constructor() { }
  
  public sharePointPageObject = {  
    userId: 0,  
    webAbsoluteUrl: ''  
  };
}


  

