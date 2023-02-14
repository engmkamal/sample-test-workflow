import { TestBed } from '@angular/core/testing';

import { ListInterfaceService } from './list-interface.service';

describe('ListInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListInterfaceService = TestBed.get(ListInterfaceService);
    expect(service).toBeTruthy();
  });
});
