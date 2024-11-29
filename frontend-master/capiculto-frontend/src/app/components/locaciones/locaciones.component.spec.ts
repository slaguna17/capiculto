import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocacionesComponent } from './locaciones.component';

describe('LocacionesComponent', () => {
  let component: LocacionesComponent;
  let fixture: ComponentFixture<LocacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
