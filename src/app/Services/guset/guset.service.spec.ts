import { TestBed } from '@angular/core/testing';

import { GusetService } from './guset.service';

describe('GusetService', () => {
  let service: GusetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GusetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
