import { TestBed } from '@angular/core/testing';

import { ChangeVenueService } from './change-venue.service';

describe('ChangeVenueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeVenueService = TestBed.get(ChangeVenueService);
    expect(service).toBeTruthy();
  });
});
