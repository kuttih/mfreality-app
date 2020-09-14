import { TestBed } from '@angular/core/testing';

import { HttpInterceptorBasicService } from './http-interceptor-basic.service';

describe('HttpInterceptorBasicService', () => {
  let service: HttpInterceptorBasicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterceptorBasicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
