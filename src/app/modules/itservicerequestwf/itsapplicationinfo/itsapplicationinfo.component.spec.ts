import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItsapplicationinfoComponent } from './itsapplicationinfo.component';

describe('ItsapplicationinfoComponent', () => {
  let component: ItsapplicationinfoComponent;
  let fixture: ComponentFixture<ItsapplicationinfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItsapplicationinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsapplicationinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
