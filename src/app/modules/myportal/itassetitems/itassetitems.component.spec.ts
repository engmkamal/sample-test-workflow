import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItassetitemsComponent } from './itassetitems.component';

describe('ItassetitemsComponent', () => {
  let component: ItassetitemsComponent;
  let fixture: ComponentFixture<ItassetitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItassetitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItassetitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
