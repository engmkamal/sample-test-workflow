import { TestBed } from '@angular/core/testing';

import { CmlistitemsService } from './cmlistitems.service';

describe('CmlistitemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmlistitemsService = TestBed.get(CmlistitemsService);
    expect(service).toBeTruthy();
  });
});
