import { TestBed } from '@angular/core/testing';

import { CalculatorDocumentService } from './calculator-document.service';

describe('CalculatorDocumentService', () => {
  let service: CalculatorDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
