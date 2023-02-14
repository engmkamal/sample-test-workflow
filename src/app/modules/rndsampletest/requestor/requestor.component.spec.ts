import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestorComponent } from './requestor.component';

describe('RequestorComponent', () => {
  let component: RequestorComponent;
  let fixture: ComponentFixture<RequestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
