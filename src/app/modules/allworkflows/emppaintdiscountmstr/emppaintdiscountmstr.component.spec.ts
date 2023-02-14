import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmppaintdiscountmstrComponent } from './emppaintdiscountmstr.component';

describe('EmppaintdiscountmstrComponent', () => {
  let component: EmppaintdiscountmstrComponent;
  let fixture: ComponentFixture<EmppaintdiscountmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmppaintdiscountmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmppaintdiscountmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
