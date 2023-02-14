import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmousComponent } from './allmous.component';

describe('AllmousComponent', () => {
  let component: AllmousComponent;
  let fixture: ComponentFixture<AllmousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllmousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
