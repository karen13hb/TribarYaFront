import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { reservationsDto } from '../models/reservations';
import { Subject, takeUntil } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketReservationService implements OnDestroy {

  private messagesSubject: Subject<reservationsDto> = new Subject<reservationsDto>();
  private unsubscribe$: Subject<void> = new Subject<void>();
  socket: any;
  constructor() { }


  public connect(bar: string) {
    this.socket = io(environment.apiUrl, { query: { barId: bar }});

    this.socket.on('notificationBar', (respuesta: any) => {
      this.messagesSubject.next(respuesta);
    });

  }

  public closeConnection() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.socket.disconnect();
  }

  getMessages() {
    return this.messagesSubject.asObservable().pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.closeConnection();
  }
}
