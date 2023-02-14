import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestresultinputfieldsComponent } from './testresultinputfields.component';

describe('TestresultinputfieldsComponent', () => {
  let component: TestresultinputfieldsComponent;
  let fixture: ComponentFixture<TestresultinputfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestresultinputfieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestresultinputfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
