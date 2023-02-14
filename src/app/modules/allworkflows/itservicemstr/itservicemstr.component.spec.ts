import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItservicemstrComponent } from './itservicemstr.component';

describe('ItservicemstrComponent', () => {
  let component: ItservicemstrComponent;
  let fixture: ComponentFixture<ItservicemstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItservicemstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItservicemstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
