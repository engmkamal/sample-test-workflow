import { TestBed } from '@angular/core/testing';

import { TmlistitemsService } from './tmlistitems.service';

describe('TmlistitemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TmlistitemsService = TestBed.get(TmlistitemsService);
    expect(service).toBeTruthy();
  });
});
