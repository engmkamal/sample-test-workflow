import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyassetdashboardGroupcontrolComponent } from './myassetdashboard-groupcontrol.component';

describe('MyassetdashboardGroupcontrolComponent', () => {
  let component: MyassetdashboardGroupcontrolComponent;
  let fixture: ComponentFixture<MyassetdashboardGroupcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyassetdashboardGroupcontrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyassetdashboardGroupcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
