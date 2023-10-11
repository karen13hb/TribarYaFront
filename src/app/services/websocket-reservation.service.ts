import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Reservation, reservationResponse } from 'src/app/interfaces/IListarReserva';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketReservationService implements OnDestroy {

  private messagesSubject: Subject<any> = new Subject<Reservation>();
  private messagesError: Subject<any> = new Subject<Reservation>();
  private unsubscribe$: Subject<void> = new Subject<void>();
  
  socket: any;
  constructor() { }


  public connect(bar: string,nameUser: string) {

    this.socket = io(environment.apiUrl, { query: { barId: bar,nameUser:nameUser }});

    this.socket.on('notificationBar', (respuesta: any) => {
      this.messagesSubject.next(respuesta);
    });

    this.socket.on('notificationErrorBar', (respuesta: any) => {
      this.messagesError.next(respuesta);
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

  getError(){
    return this.messagesError.asObservable().pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy() {
    this.closeConnection();
  }
}
