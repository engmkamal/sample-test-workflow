import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyspworkflowsComponent } from './myspworkflows.component';

describe('MyspworkflowsComponent', () => {
  let component: MyspworkflowsComponent;
  let fixture: ComponentFixture<MyspworkflowsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyspworkflowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyspworkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
