import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardtemplet1Component } from './cardtemplet1.component';

describe('Cardtemplet1Component', () => {
  let component: Cardtemplet1Component;
  let fixture: ComponentFixture<Cardtemplet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cardtemplet1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cardtemplet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
