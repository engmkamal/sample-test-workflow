import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsigdetailrendererComponent } from './shopsigdetailrenderer.component';

describe('ShopsigdetailrendererComponent', () => {
  let component: ShopsigdetailrendererComponent;
  let fixture: ComponentFixture<ShopsigdetailrendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsigdetailrendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsigdetailrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
