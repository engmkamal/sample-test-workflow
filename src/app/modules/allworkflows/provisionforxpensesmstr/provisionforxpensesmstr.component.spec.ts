import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvisionforxpensesmstrComponent } from './provisionforxpensesmstr.component';

describe('ProvisionforxpensesmstrComponent', () => {
  let component: ProvisionforxpensesmstrComponent;
  let fixture: ComponentFixture<ProvisionforxpensesmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionforxpensesmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionforxpensesmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
