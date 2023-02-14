import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyprocessComponent } from './myprocess.component';

describe('MyprocessComponent', () => {
  let component: MyprocessComponent;
  let fixture: ComponentFixture<MyprocessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
