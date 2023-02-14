import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItassetsingleitemComponent } from './itassetsingleitem.component';

describe('ItassetsingleitemComponent', () => {
  let component: ItassetsingleitemComponent;
  let fixture: ComponentFixture<ItassetsingleitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItassetsingleitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItassetsingleitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
