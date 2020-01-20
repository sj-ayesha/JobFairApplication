import { TestBed } from '@angular/core/testing';

import { AddEditPopupService } from './add-edit-popup.service';

describe('AddEditPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEditPopupService = TestBed.get(AddEditPopupService);
    expect(service).toBeTruthy();
  });
});
