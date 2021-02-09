import { TestBed } from '@angular/core/testing';

import { OpenAlertService } from './open-alert.service';

describe('OpenAlertService', () => {
  let service: OpenAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
