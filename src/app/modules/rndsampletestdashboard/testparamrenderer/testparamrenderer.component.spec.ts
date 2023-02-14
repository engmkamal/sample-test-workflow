import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestparamrendererComponent } from './testparamrenderer.component';

describe('TestparamrendererComponent', () => {
  let component: TestparamrendererComponent;
  let fixture: ComponentFixture<TestparamrendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestparamrendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestparamrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
