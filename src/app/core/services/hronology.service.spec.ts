import { TestBed } from '@angular/core/testing';

import { HronologyService } from './hronology.service';

describe('HronologyService', () => {
  let service: HronologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HronologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
