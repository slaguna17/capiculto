import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiUsuariosComponent } from './admi-usuarios.component';

describe('AdmiUsuariosComponent', () => {
  let component: AdmiUsuariosComponent;
  let fixture: ComponentFixture<AdmiUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
