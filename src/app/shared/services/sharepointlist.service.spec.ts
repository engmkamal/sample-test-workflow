import { TestBed } from '@angular/core/testing';

import { SharepointlistService } from './sharepointlist.service';

describe('SharepointlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharepointlistService = TestBed.get(SharepointlistService);
    expect(service).toBeTruthy();
  });
});
