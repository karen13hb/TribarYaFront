import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDashboardComponent } from './bar-dashboard.component';

describe('BarDashboardComponent', () => {
  let component: BarDashboardComponent;
  let fixture: ComponentFixture<BarDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarDashboardComponent]
    });
    fixture = TestBed.createComponent(BarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
