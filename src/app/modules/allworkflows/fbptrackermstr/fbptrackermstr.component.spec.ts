import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FbptrackermstrComponent } from './fbptrackermstr.component';

describe('FbptrackermstrComponent', () => {
  let component: FbptrackermstrComponent;
  let fixture: ComponentFixture<FbptrackermstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FbptrackermstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbptrackermstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
