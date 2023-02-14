import { TestBed } from '@angular/core/testing';

import { ListWithSppnpjsService } from './list-with-sppnpjs.service';

describe('ListWithSppnpjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListWithSppnpjsService = TestBed.get(ListWithSppnpjsService);
    expect(service).toBeTruthy();
  });
});
