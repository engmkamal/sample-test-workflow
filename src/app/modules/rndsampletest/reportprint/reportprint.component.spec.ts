import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportprintComponent } from './reportprint.component';

describe('ReportprintComponent', () => {
  let component: ReportprintComponent;
  let fixture: ComponentFixture<ReportprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
