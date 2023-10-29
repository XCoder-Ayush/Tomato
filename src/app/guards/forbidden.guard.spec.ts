import { TestBed } from '@angular/core/testing';

import { ForbiddenGuard } from './forbidden.guard';

describe('ForbiddenGuard', () => {
  let guard: ForbiddenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForbiddenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
