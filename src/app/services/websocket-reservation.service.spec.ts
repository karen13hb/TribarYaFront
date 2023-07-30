import { TestBed } from '@angular/core/testing';

import { WebsocketReservationService } from './websocket-reservation.service';

describe('WebsocketReservationService', () => {
  let service: WebsocketReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
