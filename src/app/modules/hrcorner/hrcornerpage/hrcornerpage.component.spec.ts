import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrcornerpageComponent } from './hrcornerpage.component';

describe('HrcornerpageComponent', () => {
  let component: HrcornerpageComponent;
  let fixture: ComponentFixture<HrcornerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrcornerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrcornerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
