import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenerarReservaComponent } from './modal-generar-reserva.component';

describe('ModalGenerarReservaComponent', () => {
  let component: ModalGenerarReservaComponent;
  let fixture: ComponentFixture<ModalGenerarReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGenerarReservaComponent]
    });
    fixture = TestBed.createComponent(ModalGenerarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
