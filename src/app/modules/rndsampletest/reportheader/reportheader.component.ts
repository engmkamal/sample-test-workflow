import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportheader',
  templateUrl: './reportheader.component.html',
  styleUrls: ['./reportheader.component.scss']
})
export class ReportheaderComponent implements OnInit {
  domain = "https://portal.bergerbd.com";
  constructor() { }

  ngOnInit(): void {
  }

}
