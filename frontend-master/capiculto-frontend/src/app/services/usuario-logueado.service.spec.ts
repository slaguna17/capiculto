import { TestBed } from '@angular/core/testing';

import { UsuarioLogueadoService } from './usuario-logueado.service';

describe('UsuarioLogueadoService', () => {
  let service: UsuarioLogueadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioLogueadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
