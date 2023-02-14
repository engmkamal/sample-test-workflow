import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PoolcarrequisitionComponent } from './poolcarrequisition.component';

describe('PoolcarrequisitionComponent', () => {
  let component: PoolcarrequisitionComponent;
  let fixture: ComponentFixture<PoolcarrequisitionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolcarrequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolcarrequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
