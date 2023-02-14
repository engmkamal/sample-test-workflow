import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetdisposalmstrComponent } from './assetdisposalmstr.component';

describe('AssetdisposalmstrComponent', () => {
  let component: AssetdisposalmstrComponent;
  let fixture: ComponentFixture<AssetdisposalmstrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetdisposalmstrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetdisposalmstrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
