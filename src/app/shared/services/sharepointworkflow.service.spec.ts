import { TestBed } from '@angular/core/testing';

import { SharepointworkflowService } from './sharepointworkflow.service';

describe('SharepointworkflowService', () => {
  let service: SharepointworkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharepointworkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
