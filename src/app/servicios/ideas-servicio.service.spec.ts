import { TestBed } from '@angular/core/testing';

import { IdeasServicioService } from './ideas-servicio.service';

describe('IdeasServicioService', () => {
  let service: IdeasServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeasServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
