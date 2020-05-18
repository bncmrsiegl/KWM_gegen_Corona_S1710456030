import { TestBed } from '@angular/core/testing';

import { ShoppinglistStoreService } from './shoppinglist-store.service';

describe('ShoppinglistStoreService', () => {
  let service: ShoppinglistStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppinglistStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
