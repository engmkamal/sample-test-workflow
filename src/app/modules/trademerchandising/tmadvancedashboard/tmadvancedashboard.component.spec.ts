import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TmadvancedashboardComponent } from './tmadvancedashboard.component';

describe('TmadvancedashboardComponent', () => {
  let component: TmadvancedashboardComponent;
  let fixture: ComponentFixture<TmadvancedashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TmadvancedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmadvancedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
