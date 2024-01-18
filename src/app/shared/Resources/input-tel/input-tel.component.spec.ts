import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTelComponent } from './input-tel.component';

describe('InputTelComponent', () => {
  let component: InputTelComponent;
  let fixture: ComponentFixture<InputTelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputTelComponent]
    });
    fixture = TestBed.createComponent(InputTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
