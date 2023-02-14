import { TestBed } from '@angular/core/testing';

import { AccesswiselistitemsService } from './accesswiselistitems.service';

describe('AccesswiselistitemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesswiselistitemsService = TestBed.get(AccesswiselistitemsService);
    expect(service).toBeTruthy();
  });
});
