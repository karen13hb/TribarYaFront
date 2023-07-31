import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { reservationsDto } from 'src/app/models/reservations';
import { ReservationsService } from 'src/app/services/reservations.service';
import { WebsocketReservationService } from 'src/app/services/websocket-reservation.service';

@Component({
  selector: 'app-bar-dashboard',
  templateUrl: './bar-dashboard.component.html',
  styleUrls: ['./bar-dashboard.component.css']
})
export class BarDashboardComponent implements OnInit,OnDestroy {

  ejemplo:string ="ejemplo"
  numberejm:number =10

  public barId = '64c7105edca8daffadb426ba';
  private subscription: Subscription;
  reservationsList: reservationsDto[] = [];



  constructor(private websocketService: WebsocketReservationService, 
              private reservationsService:ReservationsService) 
              {
              this.subscription = new Subscription();
              }

  ngOnInit() {
    // this.websocketService.closeConnection();    
    this.connectToSocketReservation();
    this.getReservationsList();
  }

  getReservationsList(){

    this.reservationsService.getReservationsList(this.barId).subscribe({
      next: (response) => {
        console.log('Lista de reservaciones:', response.reservations);
        this.reservationsList = response.reservations
        
      },
      error: (error) => {
        console.error('Error al obtener la lista de reservaciones:', error);
      }
    });
    
  }

  connectToSocketReservation(){
    this.websocketService.connect(this.barId);
    this.subscription = this.websocketService.getMessages().subscribe(
     {
      next: (response) => {
        console.log('Lista de reservaciones:', response);
        this.reservationsList.push(response)
      },
      error: (error) => {
        console.error('Error al obtener la lista de reservaciones:', error);
      }
     }
    );

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.websocketService.closeConnection();
  }

  editFormat(){

  }

  deleteFormat(){

  }
}