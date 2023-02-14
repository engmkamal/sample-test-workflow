import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampletestreqComponent } from './sampletestreq.component';

describe('SampletestreqComponent', () => {
  let component: SampletestreqComponent;
  let fixture: ComponentFixture<SampletestreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampletestreqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampletestreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
