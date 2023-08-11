import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Reservation } from 'src/app/interfaces/IListarReserva';
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

  public barId = '64d46a8cc945490a3f29da0c';
  public username='karen';
  public zoneUTC='America/Bogota';
  private subscription: Subscription;
  progressBarIntervals: { [code: string]: Subscription } = {};

  private reservationsListUnconfirm: { [code: string]: Reservation };
  private reservationsListConfirm: { [code: string]: Reservation };
  
  private reservationsListUnconfirmAux:{ [code: string]: Reservation } ;
  private reservationsListConfirmAux: { [code: string]: Reservation };

  numberOfConfirm:number;
  numberOfUnconfirm:number;

  totalReservations:number;
  totalConfirmArrive:number;



  constructor(private websocketService: WebsocketReservationService, 
              private reservationsService:ReservationsService) 
  {
    this.subscription = new Subscription();
    this.reservationsListUnconfirm ={};
    this.reservationsListConfirm = {};
    this.reservationsListUnconfirmAux = {};
    this.reservationsListConfirmAux = {};
    this.numberOfConfirm = 0;
    this.numberOfUnconfirm = 0;
    this.totalReservations = 0;
    this.totalConfirmArrive = 0;

  }

  ngOnInit() {  
    this.connectToSocketReservation();
    this.getReservationsList();
    this.getIndicadores(this.barId,this.zoneUTC);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.websocketService.closeConnection();

    // Object.values(this.reservationsListUnconfirm).forEach((reservation) => {
    //   this.progressBarIntervals[reservation.code] = interval(1000).subscribe(() => {
        
    //       this.progressBarIntervals[reservation.code].unsubscribe(); // Detén la secuencia cuando llega al 100%
        
    //   });
    // });
  }


  public getReservationsList():void{

    this.reservationsService.getReservationsList(this.barId).subscribe({
      next: (response) => {

        const timeActual = response.timeActual;

        for (const reserva of response.reservations) {

          let reservaAux:Reservation = this.CompleteList(reserva,timeActual)

          if (reserva.confirmated === true) {
            this.reservationsListConfirm[reserva.code] = reservaAux;
            console.log(this.reservationsListConfirm);
            
          } else {
            this.reservationsListUnconfirm[reserva.code] = reservaAux;
            console.log(this.reservationsListUnconfirm)
          }
        }
        this.updateConfirm();
        this.updateUnconfirm();
        //filtrar por confirm y no confirm 
      },
      error: (error) => {
        console.error('Error al obtener la lista de reservaciones:', error);
      }
    });
    
  }

  public CompleteList(reserva:Reservation, timeActual:any):Reservation{
    const fecha1 = new Date(reserva.timeWaitUserInSeconds);
    const fecha2 = new Date(timeActual); 
    reserva.timeInSeconds= (fecha1.getTime()-fecha2.getTime())/1000;
    reserva.progressBar=0;
    reserva.isChecked=false;  
    
    return reserva
}

  public connectToSocketReservation(): void{
    this.websocketService.connect(this.barId,this.username);
    this.subscription = this.websocketService.getMessages().subscribe(
     {
      next: (response) => {
        console.log(response);

        // const fecha1 = new Date(response.timeWaitUserInSeconds);
        // const fecha2 = new Date(response.createDate);
        // this.reservationsListUnconfirm[response.code] = response;
        // this.reservationsListUnconfirm[response.code].timeInSeconds= (fecha1.getTime()-fecha2.getTime())/1000;
        // this.reservationsListUnconfirm[response.code].progressBar=0;
        // console.log(this.reservationsListUnconfirm[response.code])
        // this.assignTimeConfirm();
        this.reservationsListUnconfirm[response.code] = response;
        this.updateConfirm();
        this.updateUnconfirm();
        this.totalReservations++;
      },
      error: (error) => {
        console.error('Error al obtener la lista de reservaciones:', error);
      }
     }
    );

  }



 
  public editReservation():void{

  }

 public deleteReservation(idReserva: string,code:string):void{

    this.updateListConfirm(code);
    this.updateListUnconfirm(code);

    this.updateConfirm();
    this.updateUnconfirm();
    
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
        
      }
    });

    

  }

  public onConfirmBar(idReserva:string,code:string): void{
    
    let newConfirm:Reservation;
    newConfirm=this.reservationsListUnconfirm[code];

    const query = {
      bar: {
        id: this.barId
      },
      reservation: {
        id: idReserva
      }
    };

    this.reservationsService.confirmReservation(query)
    .subscribe({
      next: () => {
        setTimeout(() => {
          this.reservationsListConfirm[code] = newConfirm;
          this.updateListUnconfirm(code);
      
          this.updateConfirm();
          this.updateUnconfirm();
        }, 500);
        
      }
    });
    

  }

  public onConfirmArrive(idReserva:string,code:string):void{
    const query = {
      bar: {
        id: this.barId
      },
      reservation: {
        id: idReserva
      }
    };
    this.totalConfirmArrive++;

    this.reservationsService.confirmArrive(query)
    .subscribe({
      next: () => {

        setTimeout(() => {
          this.updateListConfirm(code);
          this.updateConfirm();
        }, 500);
        
      }
    });
  }

  public onSearch(event:Event):void{

    const inputElement = event.target as HTMLInputElement;
    const textoInput = inputElement.value;
    if(textoInput.trim() === ''){
      
      console.log("reserva no encontrada");
      this.reservationsListUnconfirm = { ...this.reservationsListUnconfirmAux };
    
    }else{
      
      this.reservationsListUnconfirmAux = { ...this.reservationsListUnconfirm };
      this.reservationsListUnconfirm={};
      this.reservationsListUnconfirm[textoInput] =this.reservationsListUnconfirmAux[textoInput];
      
      console.log(this.reservationsListUnconfirm);
      console.log(this.reservationsListUnconfirmAux);
    }
  }

  public getIndicadores(barId:string, zoneUTC:string):void{
    this.reservationsService.getIndicadores(barId,zoneUTC)
    .subscribe({
      next: (response) => {
        this.totalReservations= response.total;
        this.totalConfirmArrive = response.usuarios_recibidos;
        
      }
    });
  }

  public updateConfirm():void{
     this.numberOfConfirm=this.getListSize(this.reservationsListConfirm);    
  }

  public updateUnconfirm():void{
    this.numberOfUnconfirm=this.getListSize(this.reservationsListUnconfirm); 
  }

  public updateListConfirm(code:string): void{
    delete this.reservationsListConfirm[code];
  }

  public updateListUnconfirm(code:string): void{
    delete this.reservationsListUnconfirm[code];
    }

  public getReservationsUnconfirm(): Reservation[] {
      return Object.values(this.reservationsListUnconfirm);
  }
  
  public getReservationsConfirm(): Reservation[] {
      return Object.values(this.reservationsListConfirm);
  }

  public getListSize(list:any): number {
    return Object.keys(list).length;
  }

  public goBack():void{

  }

  public assignTimeUnconfirm():void{

  }
  // assignTimeConfirm(){

  //   Object.values(this.reservationsListUnconfirm).forEach((reservation) => {
  //     this.progressBarIntervals[reservation.code] = interval(1000).subscribe(() => {
  //       if (reservation.progressBar >= 100) {
  //         this.progressBarIntervals[reservation.code].unsubscribe(); // Detén la secuencia cuando llega al 100%
  //       } else {
  //         reservation.progressBar += 100 / reservation.timeInSeconds; // Incrementa el progreso proporcionalmente
  //       }
  //     });
  //   });
  // }
}