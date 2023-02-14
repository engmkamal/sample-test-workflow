import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampletestreportComponent } from './sampletestreport.component';

describe('SampletestreportComponent', () => {
  let component: SampletestreportComponent;
  let fixture: ComponentFixture<SampletestreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampletestreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampletestreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
