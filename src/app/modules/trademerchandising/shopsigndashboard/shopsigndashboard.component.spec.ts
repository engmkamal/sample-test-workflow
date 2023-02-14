import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsigndashboardComponent } from './shopsigndashboard.component';

describe('ShopsigndashboardComponent', () => {
  let component: ShopsigndashboardComponent;
  let fixture: ComponentFixture<ShopsigndashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsigndashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsigndashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
