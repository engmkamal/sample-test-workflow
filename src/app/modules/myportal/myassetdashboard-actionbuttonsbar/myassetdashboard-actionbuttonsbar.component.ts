// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-myassetdashboard-actionbuttonsbar',
//   templateUrl: './myassetdashboard-actionbuttonsbar.component.html',
//   styleUrls: ['./myassetdashboard-actionbuttonsbar.component.scss']
// })
// export class MyassetdashboardActionbuttonsbarComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

//=======================================================

import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-myassetdashboard-actionbuttonsbar',
  templateUrl: './myassetdashboard-actionbuttonsbar.component.html',
  styleUrls: ['./myassetdashboard-actionbuttonsbar.component.scss']
})
export class MyassetdashboardActionbuttonsbarComponent {
  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  addGroup: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  addCondition: EventEmitter<void> = new EventEmitter<void>();
}
