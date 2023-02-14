import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmdashboardComponent } from './cmdashboard.component';

describe('CmdashboardComponent', () => {
  let component: CmdashboardComponent;
  let fixture: ComponentFixture<CmdashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CmdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
