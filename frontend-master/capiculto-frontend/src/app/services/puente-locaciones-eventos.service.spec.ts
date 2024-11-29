import { TestBed } from '@angular/core/testing';

import { PuenteLocacionesEventosService } from './puente-locaciones-eventos.service';

describe('PuenteLocacionesEventosService', () => {
  let service: PuenteLocacionesEventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuenteLocacionesEventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
