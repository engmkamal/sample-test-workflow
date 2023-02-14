import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyitassetsComponent } from './myitassets.component';

describe('MyitassetsComponent', () => {
  let component: MyitassetsComponent;
  let fixture: ComponentFixture<MyitassetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyitassetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyitassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
