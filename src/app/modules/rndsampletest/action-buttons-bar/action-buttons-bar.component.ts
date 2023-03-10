import { Component, OnInit, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-action-buttons-bar',
  templateUrl: './action-buttons-bar.component.html',
  styleUrls: ['./action-buttons-bar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ActionButtonsBarComponent {
  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  addGroup: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  addCondition: EventEmitter<void> = new EventEmitter<void>();

  @Input() requestInfo: any;
}
