import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamselectfieldComponent } from './paramselectfield.component';

describe('ParamselectfieldComponent', () => {
  let component: ParamselectfieldComponent;
  let fixture: ComponentFixture<ParamselectfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamselectfieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamselectfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
