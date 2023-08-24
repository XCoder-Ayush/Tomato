import { TestBed } from '@angular/core/testing';

import { FoodcartService } from './foodcart.service';

describe('FoodcartService', () => {
  let service: FoodcartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodcartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
