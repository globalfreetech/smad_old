import { TestBed } from '@angular/core/testing';

import { ToBrowserService } from './to-browser.service';

describe('ToBrowserService', () => {
  let service: ToBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
