import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RndlabtestparentComponent } from './rndlabtestparent.component';

describe('RndlabtestparentComponent', () => {
  let component: RndlabtestparentComponent;
  let fixture: ComponentFixture<RndlabtestparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RndlabtestparentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RndlabtestparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
