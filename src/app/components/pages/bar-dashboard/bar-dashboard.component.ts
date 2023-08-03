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

  public barId = '64c42012b9f3758f7536ee73';
  private subscription: Subscription;
  reservationsListUnconfirm: reservationsDto[] = [];
  reservationsListConfirm: reservationsDto[]=[];
  
  reservationsListUnconfirmAux: reservationsDto[] = [];
  reservationsListConfirmAux: reservationsDto[]=[];
  numberOfConfirm:number=0;
  numberOfUnconfirm:number=0;



  constructor(private websocketService: WebsocketReservationService, 
              private reservationsService:ReservationsService) 
  {
    this.subscription = new Subscription();
  }

  ngOnInit() {  
    this.connectToSocketReservation();
    this.getReservationsList();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.websocketService.closeConnection();
  }


  getReservationsList(){

    this.reservationsService.getReservationsList(this.barId).subscribe({
      next: (response) => {
        console.log('Lista de reservaciones:', response);
        this.reservationsListUnconfirm = response.reservations;
        this.updateConfirmUnconfirm();
        //filtrar por confirm y no confirm 
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
        this.reservationsListUnconfirm.push(response);
        this.updateConfirmUnconfirm();
      },
      error: (error) => {
        console.error('Error al obtener la lista de reservaciones:', error);
      }
     }
    );

  }

  
  editReservation(){

  }

  deleteReservation(idReserva: string){
    this.updateLists(idReserva);
    this.updateConfirmUnconfirm();
    
    const query = {
      reservation: {
        id: idReserva
      },
      bar: {
        id: this.barId
      }
    };

    this.reservationsService.deleteReservation(query)
    .subscribe({
      next: () => {
        console.log('Reserva eliminada con éxito.');
        

      },
      error: error => {
        console.error('Error al eliminar la reserva:', error);
      }
    });

    

  }

  onConfirmBar(idReserva:string){
    let newConfirm:reservationsDto;
    newConfirm=this.reservationsListUnconfirm.find(reserva => reserva._id === idReserva) as reservationsDto;
    this.reservationsListConfirm.push(newConfirm);
    this.reservationsListUnconfirm = this.reservationsListUnconfirm.filter(reserva => reserva._id !== idReserva);
    this.updateConfirmUnconfirm();
    //falta servicio para cambiar estado reserva
  }

  onConfirmArrive(idReserva:string){
    //falta servicio cambiar estado reserva
  }

  updateConfirmUnconfirm(){
    this.numberOfUnconfirm=this.reservationsListUnconfirm.length;
    this.numberOfConfirm=this.reservationsListConfirm.length;
  }

  updateLists(idReserva:string){
    this.reservationsListUnconfirm = this.reservationsListUnconfirm.filter(reserva => reserva._id !== idReserva);
    this.reservationsListConfirm = this.reservationsListConfirm.filter(reserva => reserva._id !== idReserva);
  }

  onSearch(event:Event){

    const inputElement = event.target as HTMLInputElement;
    const textoInput = inputElement.value;
    if(textoInput.trim() === ''){
      
      console.log("hola")
    
    }else{
      console.log("hola2")
    }
  }

}