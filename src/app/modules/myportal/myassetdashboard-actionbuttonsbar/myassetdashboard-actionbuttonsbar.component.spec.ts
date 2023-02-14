import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyassetdashboardActionbuttonsbarComponent } from './myassetdashboard-actionbuttonsbar.component';

describe('MyassetdashboardActionbuttonsbarComponent', () => {
  let component: MyassetdashboardActionbuttonsbarComponent;
  let fixture: ComponentFixture<MyassetdashboardActionbuttonsbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyassetdashboardActionbuttonsbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyassetdashboardActionbuttonsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
